const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const dir = 'F:/mern.org/mernify-web/assets/images/logo'
const outDir = 'F:/mern.org/mernify-web/_logo-extract'
fs.mkdirSync(outDir, { recursive: true })

function extractPng(svgPath, outPng) {
  const s = fs.readFileSync(svgPath, 'utf8')
  const m = s.match(/xlink:href="data:img\/png;base64,([^"]+)"/)
  if (!m) throw new Error('no embedded png in ' + svgPath)
  fs.writeFileSync(outPng, Buffer.from(m[1], 'base64'))
}

for (const f of ['logo-black.svg', 'logo-white.svg', 'favicon.svg']) {
  const png = path.join(outDir, f.replace('.svg', '.png'))
  extractPng(path.join(dir, f), png)
  console.log('wrote', png, fs.statSync(png).size)
}

// Sample unique opaque colors via PowerShell System.Drawing
const ps = `
Add-Type -AssemblyName System.Drawing
function Sample-Colors($path, $max=40) {
  $img = [System.Drawing.Bitmap]::FromFile($path)
  $bag = @{}
  $stepX = [Math]::Max(1, [int]($img.Width / 80))
  $stepY = [Math]::Max(1, [int]($img.Height / 80))
  for ($y=0; $y -lt $img.Height; $y += $stepY) {
    for ($x=0; $x -lt $img.Width; $x += $stepX) {
      $c = $img.GetPixel($x,$y)
      if ($c.A -lt 200) { continue }
      # skip near-white and near-black for brand accents? keep all for analysis
      $key = '{0:X2}{1:X2}{2:X2}' -f $c.R,$c.G,$c.B
      if (-not $bag.ContainsKey($key)) { $bag[$key] = 0 }
      $bag[$key]++
    }
  }
  $img.Dispose()
  $bag.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First $max | ForEach-Object {
    '#{0} count={1}' -f $_.Key, $_.Value
  }
}
Write-Output '--- logo-black ---'
Sample-Colors '${outDir.replace(/'/g,"''")}/logo-black.png' 30
Write-Output '--- logo-white ---'
Sample-Colors '${outDir.replace(/'/g,"''")}/logo-white.png' 30
Write-Output '--- favicon ---'
Sample-Colors '${outDir.replace(/'/g,"''")}/favicon.png' 30
`
execFileSync('powershell.exe', ['-NoProfile', '-Command', ps], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
  .split(/\r?\n/)
  .forEach((l) => console.log(l))
