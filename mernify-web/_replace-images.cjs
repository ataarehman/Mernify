/**
 * Replace Unifex dimension placeholders with real Unsplash imagery.
 * Keeps exact pixel sizes; overwrites files in place.
 */
const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')
const { execFileSync } = require('child_process')

const ROOT = 'F:/mern.org/mernify-web/assets/images'
const TMP = 'F:/mern.org/mernify-web/_img-tmp'
fs.mkdirSync(TMP, { recursive: true })

// Curated Unsplash photo IDs (tech / product / engineering / workspace)
const P = {
  dashboard: '1460925895917-afdab827c52f',
  analytics: '1551288049-bebda4e38f71',
  code: '1555949963-aa79dcee981c',
  laptop: '1498050108023-c5249f4df085',
  laptop2: '1531297484001-80022131f5a1',
  typing: '1486312338219-ce68d2c6f44d',
  circuit: '1518770660439-4636190af475',
  server: '1558494949-ef010cbdcc31',
  ai: '1677442136019-21780ecad995',
  earth: '1451187580459-43490279c0fa',
  team: '1522071820081-009f0129c71c',
  meeting: '1600880292203-757bb62b4baf',
  womanCode: '1573164713714-d95e436ab8d6',
  engineer: '1581091226825-a6a2a5aee158',
  mobile: '1512941937669-90a1b58e7e9c',
  desk: '1497366216548-37526070297c',
  office: '1497366811353-6870744d04b2',
  abstract: '1557683316-973673bdc68f',
  abstract2: '1557682250-33bd709cbe85',
  abstract3: '1618005182384-a83a8bd57fbe',
  darkUi: '1550751827-4bd374c3f58b',
  cloud: '1451187580459-43490279c0fa',
  product: '1519389950473-47ba0277781c',
  whiteboard: '1552664730-d307ca884978',
  hands: '1587620962725-abab7fe55159',
  phone: '1511707171634-5f897ff02aa9',
  ux: '1586717791821-3f44a563fa4c',
  portrait1: '1507003211169-0a1dd7228f2d',
  portrait2: '1494790108377-be9c29b29330',
  portrait3: '1438761681033-6461ffad8d80',
  portrait4: '1472099645785-5658abf4ff4e',
  portrait5: '1500648767791-00dcc994a43e',
  portrait6: '1573496359142-b8d87734a5a2',
}

function unsplash(id, w, h) {
  return `https://images.unsplash.com/photo-${id}?w=${Math.max(w, 400)}&h=${Math.max(h, 400)}&fit=crop&q=85&auto=format`
}

/** Map relative path → Unsplash photo id (section-aware) */
const MAP = {
  // Homepage hero / about
  'thumbs/banner-thumb.jpg': P.dashboard,
  'thumbs/about-thumb-one.jpg': P.team,
  'thumbs/about-thumb-two.jpg': P.laptop,
  'thumbs/thumbnail-bg.jpg': P.office,
  'thumbs/thumbnail-ab-bg.jpg': P.desk,
  'thumbs/thumbnail-two-bg.jpg': P.product,
  'thumbs/cta-two-bg.jpg': P.abstract,
  'thumbs/home1.jpg': P.dashboard,
  'thumbs/home2.jpg': P.code,
  'thumbs/home3.jpg': P.mobile,
  'thumbs/coming-soon-img.png': P.abstract3,

  // About page
  'thumbs/about-ip-thumb.jpg': P.meeting,
  'thumbs/about-ip-thumb.png': P.meeting,
  'thumbs/about-three-thumb.jpg': P.whiteboard,

  // Portfolio / case studies
  'thumbs/portfolio-thumb1.jpg': P.analytics,
  'thumbs/portfolio-thumb2.jpg': P.mobile,
  'thumbs/portfolio-thumb3.jpg': P.ai,
  'thumbs/portfolio-thumb4.jpg': P.darkUi,
  'thumbs/portfolio-thumb5.jpg': P.ux,
  'thumbs/portfolio-thumb6.jpg': P.server,
  'thumbs/portfolio-thumb7.jpg': P.product,
  'thumbs/portfolio-thumb8.jpg': P.laptop2,
  'thumbs/portfolio-thumb9.jpg': P.hands,
  'thumbs/portfolio-two-thumb1.jpg': P.dashboard,
  'thumbs/portfolio-two-thumb2.jpg': P.code,
  'thumbs/portfolio-two-thumb3.jpg': P.mobile,
  'thumbs/portfolio-two-thumb4.jpg': P.ai,
  'thumbs/portfolio-three-thumb1.jpg': P.analytics,
  'thumbs/portfolio-three-thumb2.jpg': P.ux,
  'thumbs/portfolio-three-thumb3.jpg': P.server,
  'thumbs/portfolio-three-thumb4.jpg': P.earth,
  'thumbs/portfolio-ip-two-thumb1.jpg': P.laptop,
  'thumbs/portfolio-ip-two-thumb2.jpg': P.mobile,
  'thumbs/portfolio-ip-two-thumb3.jpg': P.ai,
  'thumbs/portfolio-ip-two-thumb4.jpg': P.cloud,
  'thumbs/portfolio-details-thumb1.jpg': P.office,
  'thumbs/portfolio-details-thumb2.jpg': P.dashboard,
  'thumbs/portfolio-details-thumb3.jpg': P.code,
  'thumbs/portfolio-details-thumb4.jpg': P.mobile,
  'thumbs/portfolio-details-thumb5.jpg': P.ux,

  // Services
  'thumbs/service-three-thumb1.png': P.product,
  'thumbs/service-three-thumb2.png': P.analytics,
  'thumbs/service-three-thumb3.png': P.laptop,
  'thumbs/service-three-thumb4.png': P.ai,
  'thumbs/service-thumb1.jpg': P.code,
  'thumbs/service-two-thumb1.jpg': P.server,
  'thumbs/service-two-thumb2.jpg': P.cloud,
  'thumbs/service-details-bg1.jpg': P.desk,
  'thumbs/service-details-bg2.jpg': P.circuit,
  'thumbs/banner-two-thumb.jpg': P.engineer,

  // Team / people
  'thumbs/team-thumb1.jpg': P.portrait1,
  'thumbs/team-thumb2.jpg': P.portrait2,
  'thumbs/team-thumb3.jpg': P.portrait6,
  'thumbs/team-ip-thumb1.png': P.portrait1,
  'thumbs/team-ip-thumb2.png': P.portrait2,
  'thumbs/team-ip-thumb3.png': P.portrait3,
  'thumbs/team-ip-thumb4.png': P.portrait4,
  'thumbs/team-ip-thumb5.png': P.portrait5,
  'thumbs/team-ip-thumb6.png': P.portrait6,
  'thumbs/team-img1.png': P.portrait1,
  'thumbs/team-img2.png': P.portrait2,
  'thumbs/team-img3.png': P.portrait3,
  'thumbs/team-img4.png': P.portrait4,

  // Testimonials avatars
  'thumbs/testimonial-img1.png': P.portrait1,
  'thumbs/testimonial-img2.png': P.portrait2,
  'thumbs/testimonial-img3.png': P.portrait3,
  'thumbs/testimonial-two-img1.png': P.portrait4,
  'thumbs/testimonial-two-img2.png': P.portrait5,
  'thumbs/testimonial-two-img3.png': P.portrait6,
  'thumbs/testimonial-three-thumb1.jpg': P.womanCode,
  'thumbs/testimonial-three-thumb2.jpg': P.engineer,

  // Blog
  'thumbs/blog-ip-thumb1.jpg': P.code,
  'thumbs/blog-ip-thumb2.jpg': P.ai,
  'thumbs/blog-ip-thumb3.jpg': P.cloud,
  'thumbs/blog-ip-thumb4.jpg': P.mobile,
  'thumbs/blog-ip-thumb5.jpg': P.ux,
  'thumbs/blog-ip-thumb6.jpg': P.server,
  'thumbs/blog-list-thumb1.jpg': P.dashboard,
  'thumbs/blog-list-thumb2.jpg': P.laptop,
  'thumbs/blog-list-thumb3.jpg': P.ai,
  'thumbs/blog-list-thumb4.jpg': P.team,
  'thumbs/blog-details-thumb.jpg': P.product,
  'thumbs/blog-details-bg.jpg': P.office,
  'thumbs/blog-ip-img1.jpg': P.portrait1,
  'thumbs/blog-details-img.png': P.portrait2,
  'thumbs/blog-list-img1.png': P.portrait3,
  'thumbs/recend-post-img1.jpg': P.code,
  'thumbs/recend-post-img2.jpg': P.ai,
  'thumbs/recend-post-img3.jpg': P.mobile,

  // Misc
  'thumbs/feature-three-thumb1.jpg': P.abstract2,
  'thumbs/faq-two-thumb.jpg': P.hands,
  'thumbs/footer-three-thumb.jpg': P.abstract3,

  // Brand marquee — abstract tech textures (not fake logos)
  'thumbs/marquee-thumb1.png': P.abstract,
  'thumbs/marquee-thumb11.png': P.abstract2,
  'thumbs/marquee-thumb2.png': P.circuit,
  'thumbs/marquee-thumb22.png': P.darkUi,
  'thumbs/marquee-thumb3.png': P.server,
  'thumbs/marquee-thumb33.png': P.cloud,
  'thumbs/marquee-thumb4.png': P.ai,
  'thumbs/marquee-thumb44.png': P.earth,
  'thumbs/marquee-thumb5.png': P.product,
  'thumbs/marquee-thumb55.png': P.ux,
  'thumbs/marquee-thumb6.png': P.laptop,
  'thumbs/marquee-thumb66.png': P.mobile,
  'thumbs/marquee-two-thumb1.png': P.dashboard,
  'thumbs/marquee-two-thumb11.png': P.analytics,
  'thumbs/marquee-two-thumb2.png': P.code,
  'thumbs/marquee-two-thumb22.png': P.hands,
  'thumbs/marquee-two-thumb4.png': P.meeting,
  'thumbs/marquee-two-thumb44.png': P.team,
  'thumbs/marquee-two-thumb6.png': P.desk,
  'thumbs/marquee-two-thumb66.png': P.office,
  'thumbs/marquee-two-thumb7.png': P.engineer,
  'thumbs/marquee-two-thumb77.png': P.womanCode,

  // Decorative shape photos that are placeholders
  'shapes/banner-three-man.png': P.engineer,
}

function getDims(filePath) {
  // Use PowerShell System.Drawing for reliable dims
  const ps = `
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('${filePath.replace(/'/g, "''")}')
Write-Output ($img.Width.ToString() + 'x' + $img.Height.ToString())
$img.Dispose()
`
  const out = execFileSync(
    'powershell.exe',
    ['-NoProfile', '-Command', ps],
    { encoding: 'utf8' },
  ).trim()
  const [w, h] = out.split('x').map(Number)
  return { w, h }
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(
      url,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 MernifyImageReplace/1.0',
          Accept: 'image/*',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close()
          fs.unlinkSync(dest)
          return download(res.headers.location, dest).then(resolve, reject)
        }
        if (res.statusCode !== 200) {
          file.close()
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`))
        }
        res.pipe(file)
        file.on('finish', () => file.close(() => resolve(dest)))
      },
    )
    req.on('error', reject)
  })
}

function resizeReplace(srcTmp, destPath, w, h) {
  const ext = path.extname(destPath).toLowerCase()
  const isPng = ext === '.png'
  const ps = `
Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile('${srcTmp.replace(/'/g, "''")}')
$bmp = New-Object System.Drawing.Bitmap ${w}, ${h}
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
# cover-crop
$scale = [Math]::Max(${w} / $src.Width, ${h} / $src.Height)
$nw = [int]($src.Width * $scale)
$nh = [int]($src.Height * $scale)
$x = [int]((${w} - $nw) / 2)
$y = [int]((${h} - $nh) / 2)
$g.DrawImage($src, $x, $y, $nw, $nh)
$g.Dispose(); $src.Dispose()
$dest = '${destPath.replace(/'/g, "''")}'
if (Test-Path $dest) { Remove-Item $dest -Force }
if ('${isPng}' -eq 'True') {
  $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
} else {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $enc = New-Object System.Drawing.Imaging.EncoderParameters 1
  $enc.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, 82L)
  $bmp.Save($dest, $codec, $enc)
}
$bmp.Dispose()
Write-Output 'ok'
`
  execFileSync('powershell.exe', ['-NoProfile', '-Command', ps], {
    encoding: 'utf8',
    timeout: 60000,
  })
}

async function main() {
  const report = []
  const entries = Object.entries(MAP)
  console.log(`Replacing ${entries.length} images...`)

  for (let i = 0; i < entries.length; i++) {
    const [rel, photoId] = entries[i]
    const dest = path.join(ROOT, rel)
    if (!fs.existsSync(dest)) {
      console.log(`SKIP missing ${rel}`)
      continue
    }
    try {
      const { w, h } = getDims(dest)
      const url = unsplash(photoId, w * 2, h * 2) // 2x for quality then downscale
      const tmp = path.join(TMP, `dl-${i}${path.extname(dest) || '.jpg'}`)
      process.stdout.write(`[${i + 1}/${entries.length}] ${rel} (${w}x${h}) ... `)
      await download(url, tmp)
      const size = fs.statSync(tmp).size
      if (size < 5000) throw new Error(`download too small (${size})`)
      resizeReplace(tmp, dest, w, h)
      const outKb = Math.round(fs.statSync(dest).size / 1024)
      console.log(`${outKb} KB`)
      report.push({ rel, w, h, photoId, outKb })
    } catch (e) {
      console.log(`FAIL: ${e.message}`)
      report.push({ rel, error: e.message })
    }
  }

  fs.writeFileSync(
    path.join(ROOT, '../../_image-replace-report.json'),
    JSON.stringify(report, null, 2),
  )
  console.log('Done. Report: _image-replace-report.json')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
