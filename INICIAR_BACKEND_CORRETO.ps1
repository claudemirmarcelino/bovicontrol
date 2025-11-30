# Script para iniciar o backend corretamente
Write-Host "🚀 Iniciando Backend Spring Boot" -ForegroundColor Cyan
Write-Host ""

# 1. Parar processos Java antigos
Write-Host "1️⃣ Parando processos Java antigos..." -ForegroundColor Yellow
$javaProcesses = Get-Process java -ErrorAction SilentlyContinue
if ($javaProcesses) {
    $javaProcesses | Stop-Process -Force
    Start-Sleep -Seconds 2
    Write-Host "   ✅ Processos parados" -ForegroundColor Green
} else {
    Write-Host "   ℹ️ Nenhum processo Java encontrado" -ForegroundColor Gray
}

# 2. Verificar arquivo .env
Write-Host ""
Write-Host "2️⃣ Verificando arquivo .env..." -ForegroundColor Yellow
if (Test-Path .env) {
    Write-Host "   ✅ Arquivo .env encontrado" -ForegroundColor Green
    $envContent = Get-Content .env
    $dbUrl = $envContent | Where-Object { $_ -match "^DB_URL=" }
    $dbUser = $envContent | Where-Object { $_ -match "^DB_USERNAME=" }
    if ($dbUrl -and $dbUser) {
        Write-Host "   ✅ Variáveis DB_URL e DB_USERNAME encontradas" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️ Variáveis não encontradas no .env" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ❌ Arquivo .env não encontrado!" -ForegroundColor Red
    Write-Host "   💡 Crie o arquivo .env na raiz do projeto demo" -ForegroundColor Yellow
    exit 1
}

# 3. Verificar se a porta 8080 está livre
Write-Host ""
Write-Host "3️⃣ Verificando porta 8080..." -ForegroundColor Yellow
$port8080 = netstat -ano | findstr :8080
if ($port8080) {
    Write-Host "   ⚠️ Porta 8080 está em uso" -ForegroundColor Yellow
    Write-Host "   💡 Tentando liberar..." -ForegroundColor Yellow
    # Tenta encontrar e matar processo usando a porta
    $lines = $port8080 | ForEach-Object { $_ -split '\s+' }
    $pids = $lines | Where-Object { $_ -match '^\d+$' } | Select-Object -Unique
    foreach ($processId in $pids) {
        if ($processId -match '^\d+$') {
            try {
                Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
                Write-Host "   ✅ Processo $processId parado" -ForegroundColor Green
            } catch {
                Write-Host "   ⚠️ Não foi possível parar processo $processId" -ForegroundColor Yellow
            }
        }
    }
    Start-Sleep -Seconds 2
} else {
    Write-Host "   ✅ Porta 8080 está livre" -ForegroundColor Green
}

# 4. Iniciar o backend
Write-Host ""
Write-Host "4️⃣ Iniciando Spring Boot..." -ForegroundColor Yellow
Write-Host "   ⏳ Aguarde... Isso pode levar 30-60 segundos" -ForegroundColor Gray
Write-Host ""

# Inicia o backend
.\mvnw.cmd spring-boot:run -DskipTests

