#!/bin/bash
# Script de Deploy Automático via Polling (Marketing OS)
# Local: /home/telematica/poll_marketing_os.sh

PROJECT_DIR="/home/telematica/marketing-os"
APP_DIR="$PROJECT_DIR/marketing-os-dashboard"
LOG_FILE="/home/telematica/poll_marketing_os.log"

cd $PROJECT_DIR

# Verifica mudanças no GitHub
git fetch origin main --quiet 2>/dev/null
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" != "$REMOTE" ]; then
    echo "[$(date)] 🚀 Nova versão detectada! Iniciando Deploy..." >> $LOG_FILE
    
    # Atualiza código
    git pull origin main --quiet
    
    cd $APP_DIR
    
    # Verifica se precisa de rebuild (mudanças no Docker ou dependências)
    if git diff $LOCAL..$REMOTE --name-only | grep -q "package\|Dockerfile\|docker-compose"; then
        echo "[$(date)] 🏗️ Mudança estrutural detectada. Fazendo build do Docker..." >> $LOG_FILE
        docker compose up --build -d >> $LOG_FILE 2>&1
    else
        echo "[$(date)] 🔄 Mudança de código simples. Reiniciando containers..." >> $LOG_FILE
        docker compose up -d >> $LOG_FILE 2>&1
    fi
    
    # Aguarda inicialização
    sleep 20
    
    # Health Check
    if curl -s -f http://localhost:3005 > /dev/null; then
        echo "[$(date)] ✅ Marketing OS online na porta 3005!" >> $LOG_FILE
    else
        echo "[$(date)] ❌ Erro: Aplicação não respondeu na porta 3005." >> $LOG_FILE
        docker compose logs --tail=20 >> $LOG_FILE
    fi
    
    # Limpeza
    docker image prune -f
else
    # Opcional: descomente para logar cada verificação
    # echo "[$(date)] Sem mudanças." >> $LOG_FILE
    exit 0
fi
