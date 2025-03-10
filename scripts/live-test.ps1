param(
    [Parameter(Mandatory=$true)]
    [string]$cli_path,
    
    [Parameter(Mandatory=$true)]
    [string]$token
)

$ErrorActionPreference = "Stop"

function New-TemporaryDirectory {
    $parent = [System.IO.Path]::GetTempPath()
    $name = [System.Guid]::NewGuid().ToString()
    $path = Join-Path $parent $name
    New-Item -ItemType Directory -Path $path
}

$original_dir = Get-Location
$test_dir = New-TemporaryDirectory
Set-Location $test_dir

try {
    $env:RAPIDDOCS_TOKEN = $token

    Write-Host "Running Rapiddocs Commands!"
    $DebugPreference = "Continue"
    
    & node $cli_path init --organization rapiddocs
    
    & node $cli_path add rapiddocs-java-sdk
    & node $cli_path add rapiddocs-python-sdk
    & node $cli_path add rapiddocs-postman
    
    & node $cli_path generate --log-level debug
    
    $DebugPreference = "SilentlyContinue"
    & node $cli_path register --log-level debug
}
finally {
    Set-Location $original_dir
    Remove-Item -Recurse -Force $test_dir -ErrorAction SilentlyContinue
}