const fs = require('fs')
const path = require('path')
const https = require('https')
const { execFileSync } = require('child_process')

const dest = 'F:/mern.org/mernify-web/assets/images/thumbs/cta-two-bg.jpg'
const id = '1497366216548-37526070297c' // office - verified 200
const w = 1920, h = 720
const tmp = 'F:/mern.org/mernify-web/_img-tmp/cta-fix.jpg'
const url = `https://images.unsplash.com/photo-${id}?w=3840&h=1440&fit=crop&q=82&auto=format`

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'image/*' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close(); try { fs.unlinkSync(dest) } catch {}
        return download(res.headers.location, dest).then(resolve, reject)
      }
      if (res.statusCode !== 200) { file.close(); return reject(new Error('HTTP ' + res.statusCode)) }
      res.pipe(file)
      file.on('finish', () => file.close(resolve))
    }).on('error', reject)
  })
}

;(async () => {
  await download(url, tmp)
  const ps = `
Add-Type -AssemblyName System.Drawing
$src=[System.Drawing.Image]::FromFile('${tmp.replace(/'/g,"''")}')
$bmp=New-Object System.Drawing.Bitmap ${w},${h}
$g=[System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$scale=[Math]::Max(${w}/$src.Width, ${h}/$src.Height)
$nw=[int]($src.Width*$scale); $nh=[int]($src.Height*$scale)
$x=[int]((${w}-$nw)/2); $y=[int]((${h}-$nh)/2)
$g.DrawImage($src,$x,$y,$nw,$nh); $g.Dispose(); $src.Dispose()
if(Test-Path '${dest.replace(/'/g,"''")}'){Remove-Item '${dest.replace(/'/g,"''")}' -Force}
$codec=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()|?{$_.MimeType -eq 'image/jpeg'}
$enc=New-Object System.Drawing.Imaging.EncoderParameters 1
$enc.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, 82L)
$bmp.Save('${dest.replace(/'/g,"''")}',$codec,$enc); $bmp.Dispose()
Write-Output 'ok'
`
  execFileSync('powershell.exe', ['-NoProfile', '-Command', ps], { encoding: 'utf8' })
  console.log('cta-two-bg.jpg', Math.round(fs.statSync(dest).size / 1024), 'KB')
})()
