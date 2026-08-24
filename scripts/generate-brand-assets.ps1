Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'
$publicDir = Join-Path $PSScriptRoot '..\public'
$void = [System.Drawing.Color]::FromArgb(255, 5, 5, 5)
$gold = [System.Drawing.Color]::FromArgb(255, 195, 161, 115)
$champagne = [System.Drawing.Color]::FromArgb(255, 235, 218, 190)
$bronze = [System.Drawing.Color]::FromArgb(255, 115, 88, 58)
$text = [System.Drawing.Color]::FromArgb(255, 245, 241, 234)
$muted = [System.Drawing.Color]::FromArgb(255, 155, 150, 142)

function New-MarkPath {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $path.StartFigure()
  $path.AddLine(137, 4, 54, 4)
  $path.AddBezier(54, 4, 20, 4, 4, 22, 4, 50)
  $path.AddBezier(4, 50, 4, 78, 24, 94, 54, 94)
  $path.AddLine(54, 94, 92, 94)
  $path.AddBezier(92, 94, 116, 94, 130, 108, 130, 126)
  $path.AddBezier(130, 126, 130, 144, 115, 158, 92, 158)
  $path.AddLine(92, 158, 18, 158)
  $path.AddLine(18, 158, 28, 142)

  $path.StartFigure()
  $path.AddLine(96, 98, 143, 4)
  $path.AddLine(143, 4, 186, 158)
  return $path
}

function Draw-Mark([System.Drawing.Graphics]$graphics, [float]$x, [float]$y, [float]$width, [float]$height) {
  $path = New-MarkPath
  $viewWidth = 206.0
  $viewHeight = 178.0
  $scale = [Math]::Min($width / $viewWidth, $height / $viewHeight)
  $dx = $x + (($width - ($viewWidth * $scale)) / 2.0) + (12.0 * $scale)
  $dy = $y + (($height - ($viewHeight * $scale)) / 2.0) + (8.0 * $scale)
  $matrix = [System.Drawing.Drawing2D.Matrix]::new($scale, 0, 0, $scale, $dx, $dy)
  $path.Transform($matrix)
  $brush = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    [System.Drawing.PointF]::new($x, $y),
    [System.Drawing.PointF]::new($x + $width, $y + $height),
    $champagne,
    $bronze
  )
  $blend = [System.Drawing.Drawing2D.ColorBlend]::new(3)
  $blend.Colors = [System.Drawing.Color[]]@($champagne, $gold, $bronze)
  $blend.Positions = [single[]]@(0.0, 0.52, 1.0)
  $brush.InterpolationColors = $blend
  $pen = [System.Drawing.Pen]::new($brush, 8.0 * $scale)
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Flat
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Flat
  $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Miter
  $graphics.DrawPath($pen, $path)
  $pen.Dispose()
  $brush.Dispose()
  $path.Dispose()
  $matrix.Dispose()
}

function New-MarkPng([int]$size, [string]$name, [double]$paddingRatio) {
  $bitmap = [System.Drawing.Bitmap]::new($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppPArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.Clear($void)
  $padding = [float]($size * $paddingRatio)
  Draw-Mark $graphics $padding $padding ($size - (2 * $padding)) ($size - (2 * $padding))
  $bitmap.Save((Join-Path $publicDir $name), [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $bitmap.Dispose()
}

function Draw-SpacedText([System.Drawing.Graphics]$graphics, [string]$value, [System.Drawing.Font]$font, [System.Drawing.Brush]$brush, [float]$x, [float]$y, [float]$spacing) {
  $cursor = $x
  foreach ($character in $value.ToCharArray()) {
    $glyph = [string]$character
    $graphics.DrawString($glyph, $font, $brush, $cursor, $y)
    $cursor += $graphics.MeasureString($glyph, $font).Width + $spacing
  }
}

New-MarkPng 16 'favicon-16x16.png' 0.12
New-MarkPng 32 'favicon-32x32.png' 0.12
New-MarkPng 180 'apple-touch-icon.png' 0.16
New-MarkPng 192 'icon-192.png' 0.18
New-MarkPng 512 'icon-512.png' 0.18
New-MarkPng 1000 'strata-sa-mark.png' 0.16

$og = [System.Drawing.Bitmap]::new(1200, 630, [System.Drawing.Imaging.PixelFormat]::Format32bppPArgb)
$ogGraphics = [System.Drawing.Graphics]::FromImage($og)
$ogGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$ogGraphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$ogGraphics.Clear($void)
Draw-Mark $ogGraphics 76 126 300 300
$ogGraphics.ResetTransform()
$ogGraphics.ResetClip()
$goldPen = [System.Drawing.Pen]::new($gold, 2)
$ogGraphics.DrawLine($goldPen, 420, 132, 1080, 132)
$goldPen.Dispose()
$goldBrush = [System.Drawing.SolidBrush]::new($gold)
$textBrush = [System.Drawing.SolidBrush]::new($text)
$mutedBrush = [System.Drawing.SolidBrush]::new($muted)
$wordmarkFont = [System.Drawing.Font]::new('Inter', 54, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$titleFont = [System.Drawing.Font]::new('Inter', 48, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$subtitleFont = [System.Drawing.Font]::new('Inter', 24, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
Draw-SpacedText $ogGraphics 'STRATA' $wordmarkFont $goldBrush 420 172 14
$ogGraphics.DrawString('THE AI OPERATING LAYER', $titleFont, $textBrush, 420, 276)
$ogGraphics.DrawString('FOR BUSINESS', $titleFont, $textBrush, 420, 334)
$ogGraphics.DrawString('Shared context. Governed action. Visible operations.', $subtitleFont, $mutedBrush, 424, 430)
$og.Save((Join-Path $publicDir 'og.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$subtitleFont.Dispose()
$titleFont.Dispose()
$wordmarkFont.Dispose()
$mutedBrush.Dispose()
$textBrush.Dispose()
$goldBrush.Dispose()
$ogGraphics.Dispose()
$og.Dispose()

foreach ($assetName in @(
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'strata-sa-mark.png',
  'og.png'
)) {
  $assetPath = Join-Path $publicDir $assetName
  $image = [System.Drawing.Image]::FromFile($assetPath)
  Write-Output ("{0} {1}x{2}" -f $assetName, $image.Width, $image.Height)
  $image.Dispose()
}
