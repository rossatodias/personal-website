# heloisarossato.com

Site pessoal de **Heloisa Rossato** — aluna de Engenharia de Computação no ITA.

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React + Vite + TypeScript + Tailwind CSS v3 |
| Backend | Node.js + Express + TypeScript |
| Servidor | Caddy (TLS automático via Let's Encrypt) |
| Deploy | GitHub Actions → EC2 via rsync + systemd |

## Desenvolvimento local

```bash
# Instalar dependências
cd frontend && npm install
cd ../backend && npm install

# Iniciar (frontend + backend em paralelo)
npm run dev   # na raiz do monorepo
```

Frontend em `http://localhost:5173` · Backend em `http://localhost:4000/api`

## GitHub Secrets (obrigatórias para o CI/CD funcionar)

Acesse: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Exemplo / Formato | Como obter |
|---|---|---|
| `EC2_HOST` | `54.123.45.67` | IP público da instância EC2 (Console AWS → EC2 → Instances) |
| `EC2_USER` | `ubuntu` | Usuário SSH padrão do Ubuntu na EC2 |
| `EC2_SSH_KEY` | `-----BEGIN RSA PRIVATE KEY-----\n...` | Conteúdo do arquivo `.pem` gerado ao criar a EC2 (Key Pair) |
| `ENV_FILE_PATH` | `/home/ubuntu/.pw.env` | Caminho absoluto do arquivo `.env` centralizado na EC2 |

> **Atenção com `EC2_SSH_KEY`:** cole o conteúdo **completo** do arquivo `.pem`, incluindo as linhas `-----BEGIN` e `-----END`. O GitHub armazena com segurança e o workflow escreve no `~/.ssh/id_rsa` automaticamente.

### Como gerar o Key Pair (se ainda não tiver)

```bash
# Na sua máquina local
ssh-keygen -t rsa -b 4096 -C "deploy@heloisarossato.com" -f ~/.ssh/heloisarossato_deploy

# Adicionar a chave pública à EC2
ssh-copy-id -i ~/.ssh/heloisarossato_deploy.pub ubuntu@<EC2_HOST>

# Conteúdo da chave PRIVADA vai na secret EC2_SSH_KEY:
cat ~/.ssh/heloisarossato_deploy
```

## Deploy (EC2)

Os arquivos `Caddyfile`, `pw.service` e `backend/.env` ficam **apenas na EC2** (não são commitados).  
Consulte os comentários em `.github/workflows/deploy.yml` para o setup inicial.
