const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const dir = 'F:/mern.org/mernify-web/assets/images/logo'
const outDir = 'F:/mern.org/mernify-web/_logo-extract'
fs.mkdirSync(outDir, { recursive: true })

function extractAll(svgName) {
  const s = fs.readFileSync(path.join(dir, svgName), 'utf8')
  const images = [...s.matchAll(/<image([^>]*)xlink:href="data:img\/png;base64,([^"]+)"/g)]
  console.log(svgName, 'image count', images.length)
  images.forEach((m, i) => {
    const attrs = m[1]
    const x = (attrs.match(/\bx="([^"]+)"/) || [])[1]
    const y = (attrs.match(/\by="([^"]+)"/) || [])[1]
    const w = (attrs.match(/\bwidth="([^"]+)"/) || [])[1]
    const h = (attrs.match(/\bheight="([^"]+)"/) || [])[1]
    const out = path.join(outDir, `${svgName.replace('.svg', '')}-${i}.png`)
    fs.writeFileSync(out, Buffer.from(m[2], 'base64'))
    console.log(`  [${i}] x=${x} y=${y} w=${w} h=${h} bytes=${fs.statSync(out).size} -> ${path.basename(out)}`)
  })
}

extractAll('logo-black.svg')
extractAll('logo-white.svg')
extractAll('favicon.svg')

const ps = `
Add-Type -AssemblyName System.Drawing
function Sample($path) {
  $img = [System.Drawing.Bitmap]::FromFile($path)
  $bag = @{}
  $stepX = [Math]::Max(1, [int]($img.Width / 100))
  $stepY = [Math]::Max(1, [int]($img.Height / 100))
  for ($y=0; $y -lt $img.Height; $y += $stepY) {
    for ($x=0; $x -lt $img.Width; $x += $stepX) {
      $c = $img.GetPixel($x,$y)
      if ($c.A -lt 180) { continue }
      $key = '{0:X2}{1:X2}{2:X2}' -f $c.R,$c.G,$c.B
      if (-not $bag.ContainsKey($key)) { $bag[$key] = 0 }
      $bag[$key]++
    }
  }
  Write-Output ("size={0}x{1}" -f $img.Width,$img.Height)
  $img.Dispose()
  $bag.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 15 | ForEach-Object {
    '#{0} n={1}' -f $_.Key, $_.Value
  }
}
Get-ChildItem '${outDir.replace(/\\/g,'/')}' -Filter *.png | ForEach-Object {
  Write-Output ('==== ' + $_.Name + ' ====')
  Sample $_.FullName
}
`
console.log(execFileSync('powershell.exe', ['-NoProfile', '-Command', ps], { encoding: 'utf8' }))
