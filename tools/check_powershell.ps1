param([string]$JsonPath, [string]$Root)

$items = Get-Content -LiteralPath $JsonPath -Raw | ConvertFrom-Json
$seed = @{
    "notes.txt"    = "todo: write tests`ndone: fix bug`n`ntodo: review pr`n"
    "numbers.txt"  = "3`n1`n2`n"
    "data.csv"     = "id,name,score`n1,ada,90`n2,grace,85`n3,linus,70`n"
    "config.json"  = '{"port": 8080, "debug": true}'
    "app.log"      = "2024-01-01 INFO start`n2024-01-01 ERROR disk full`n2024-01-02 INFO retry`n"
    "README.md"    = "# demo`n"
    "src/a.py"     = "print('a')`n"
    "src/b.py"     = "print('b')`n"
    "src/lib/c.py" = "print('c')`n"
    "tmp/old.tmp"  = "z`n"
}
$bad = 0
foreach ($it in $items) {
    $dir = Join-Path $Root ([guid]::NewGuid().ToString("N"))
    foreach ($rel in $seed.Keys) {
        $p = Join-Path $dir $rel
        New-Item -ItemType Directory -Force -Path (Split-Path $p) | Out-Null
        Set-Content -LiteralPath $p -Value $seed[$rel] -NoNewline
    }
    $tokens = $null
    $errs = $null
    [void][System.Management.Automation.Language.Parser]::ParseInput($it.code, [ref]$tokens, [ref]$errs)
    if ($errs.Count -gt 0) {
        "$($it.id) | parse: $($errs[0].Message)"
        $bad++
        continue
    }
    $ps = [powershell]::Create()
    $null = $ps.AddScript("Set-Location -LiteralPath '$dir'; `$ErrorActionPreference = 'Stop'; " + $it.code)
    $async = $ps.BeginInvoke()
    if (-not $async.AsyncWaitHandle.WaitOne(20000)) {
        $ps.Stop()
        "$($it.id) | timeout"
        $bad++
        $ps.Dispose()
        continue
    }
    try {
        $null = $ps.EndInvoke($async)
    } catch {
        $m = $_.Exception.Message
        if ($_.Exception.InnerException) { $m = $_.Exception.InnerException.Message }
        "$($it.id) | run: $($m -replace '\s+', ' ')"
        $bad++
    }
    $ps.Dispose()
}
"ran $($items.Count) snippets with pwsh, $bad failed"
