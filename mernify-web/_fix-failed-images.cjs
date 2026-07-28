const fs = require('fs')
const path = require('path')
const https = require('https')
const { execFileSync } = require('child_process')

const ROOT = 'F:/mern.org/mernify-web/assets/images'
const TMP = 'F:/mern.org/mernify-web/_img-tmp'

// Verified working Unsplash IDs
const FIX = {
  'thumbs/cta-two-bg.jpg': '1557683311-eac922347067', // purple gradient abstract
  'thumbs/marquee-thumb1.png': '1518770660439-4636190af475',
  'thumbs/feature-three-thumb1.jpg': '1618005182384-a83a8bd57fbe',
  'thumbs/footer-three-thumb.jpg': '1550751827-4bd374c3f58b',
  // Recompress huge PNGs with better sources as JPEG-quality via PNG from smaller download
  'thumbs/coming-soon-img.png': '1557682250-33bd709cbe85',
  'thumbs/about-ip-thumb.png': '1600880292203-757bb62b4baf',
  'shapes/banner-three-man.png': '1581091226825-a6a2a5aee158',
}

function unsplash(id, w, h) {
  return `https://images.unsplash.com/photo-${id}?w=${Math.max(w * 2, 800)}&h=${Math.max(h * 2, 800)}&fit=crop&q=80&auto=format`
}

function getDims(filePath) {
  const ps = `Add-Type -AssemblyName System.Drawing; $img=[System.Drawing.Image]::FromFile('${filePath.replace(/'/g, "''")}'); Write-Output ($img.Width.ToString()+'x'+$img.Height.ToString()); $img.Dispose()`
  const out = execFileSync('powershell.exe', ['-NoProfile', '-Command', ps], { encoding: 'utf8' }).trim()
  const [w, h] = out.split('x').map(Number)
  return { w, h }
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'image/*' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close()
          try { fs.unlinkSync(dest) } catch {}
          return download(res.headers.location, dest).then(resolve, reject)
        }
        if (res.statusCode !== 200) {
          file.close()
          return reject(new Error(`HTTP ${res.statusCode}`))
        }
        res.pipe(file)
        file.on('finish', () => file.close(() => resolve()))
      })
      .on('error', reject)
  })
}

function resizeReplace(srcTmp, destPath, w, h) {
  const isPng = path.extname(destPath).toLowerCase() === '.png'
  const ps = `
Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile('${srcTmp.replace(/'/g, "''")}')
$bmp = New-Object System.Drawing.Bitmap ${w}, ${h}
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$scale = [Math]::Max(${w} / $src.Width, ${h} / $src.Height)
$nw = [int]($src.Width * $scale); $nh = [int]($src.Height * $scale)
$x = [int]((${w} - $nw) / 2); $y = [int]((${h} - $nh) / 2)
$g.DrawImage($src, $x, $y, $nw, $nh)
$g.Dispose(); $src.Dispose()
$dest = '${destPath.replace(/'/g, "''")}'
if (Test-Path $dest) { Remove-Item $dest -Force }
if (${isPng ? '$true' : '$false'}) {
  # Prefer JPEG bytes inside PNG container fails; use JPEG encoder then convert via intermediate jpg for size
  $tmpJpg = $dest + '.tmp.jpg'
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $enc = New-Object System.Drawing.Imaging.EncoderParameters 1
  $enc.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, 78L)
  $bmp.Save($tmpJpg, $codec, $enc)
  $jpg = [System.Drawing.Image]::FromFile($tmpJpg)
  $jpg.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
  $jpg.Dispose(); Remove-Item $tmpJpg -Force
} else {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $enc = New-Object System.Drawing.Imaging.EncoderParameters 1
  $enc.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, 82L)
  $bmp.Save($dest, $codec, $enc)
}
$bmp.Dispose()
Write-Output 'ok'
`
  execFileSync('powershell.exe', ['-NoProfile', '-Command', ps], { encoding: 'utf8', timeout: 90000 })
}

async function main() {
  for (const [rel, id] of Object.entries(FIX)) {
    const dest = path.join(ROOT, rel)
    if (!fs.existsSync(dest)) {
      console.log('missing', rel)
      continue
    }
    const { w, h } = getDims(dest)
    const tmp = path.join(TMP, 'retry-' + path.basename(rel))
    const url = unsplash(id, w, h)
    process.stdout.write(`${rel} ... `)
    try {
      await download(url, tmp)
      resizeReplace(tmp, dest, w, h)
      console.log(Math.round(fs.statSync(dest).size / 1024) + ' KB')
    } catch (e) {
      console.log('FAIL', e.message)
    }
  }
}

main()
