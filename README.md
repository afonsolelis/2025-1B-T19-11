# Mergulhando nas Redes
Prof. Afonso Cesar 25/06/2025 - 10:00h

## Descrição

Nessa instrução vamos nos aprofundar sobre o que acontece quando uma requisição-resposta entre cliente e servidor é processada. Faremos atividades práticas para simular esses processos, e compreenderemos ainda mais sobre Redes de Computadores.

|Autoestudo|Link|
|----------|----|
|Dicionário de Redes|[Click](https://www.youtube.com/watch?v=9UJ0vUV8llY&list=PL2Pzw1-t8GxZmzA1Uj860AFqYQRhIQoAo)
|Wireshark|[Click](https://www.youtube.com/watch?v=BgOYSMHHNfE&list=PL2Pzw1-t8GxbGYUQohH-CQfEdy8aKPdc_)
|Packet Tracer|[Click](https://www.youtube.com/watch?v=6onnuoWKegk&list=PL2Pzw1-t8Gxbo3u5_ViCeobmcSHGZQu6k)
|Redes de Computadores em abordagem top-down|[Click](https://integrada.minhabiblioteca.com.br/#/books/9788580551693)

## Aula Completa: Análise de Requisições HTTP e Arquitetura Cliente-Servidor

### 1. Fundamentos das Comunicações de Rede

#### 1.1 O Modelo OSI e TCP/IP na Prática

![Modelo OSI](https://upload.wikimedia.org/wikipedia/commons/8/8d/OSI_Model_v1.svg)

**Comparação dos Modelos OSI e TCP/IP:**

| Camada OSI | Camada TCP/IP | Função | Protocolos/Tecnologias |
|------------|---------------|---------|------------------------|
| 7 - Aplicação | Aplicação | Interface com o usuário | HTTP/HTTPS, FTP, SMTP, DNS |
| 6 - Apresentação | Aplicação | Criptografia, compressão | SSL/TLS, JPEG, GIF |
| 5 - Sessão | Aplicação | Controle de sessão | NetBIOS, RPC |
| 4 - Transporte | Transporte | Controle de fluxo e confiabilidade | TCP, UDP |
| 3 - Rede | Internet | Roteamento e endereçamento | IP, ICMP, ARP |
| 2 - Enlace | Acesso à Rede | Transmissão local | Ethernet, Wi-Fi, PPP |
| 1 - Física | Acesso à Rede | Transmissão de bits | Cabos, fibra óptica, ondas |

**Fluxo de Dados em uma Requisição HTTP:**

```
[Cliente] ──── HTTP Request ────► [Servidor]
    │                                 │
    ▼                                 ▼
Camada 7: HTTP GET /index.html    HTTP 200 OK
Camada 4: TCP SYN                 TCP SYN-ACK  
Camada 3: IP (src → dst)          IP (dst → src)
Camada 2: Ethernet Frame          Ethernet Frame
Camada 1: Sinais elétricos        Sinais elétricos
```

#### 1.2 Anatomia de uma Requisição HTTP
```
GET /api/users HTTP/1.1
Host: exemplo.com
User-Agent: Mozilla/5.0
Accept: application/json
Connection: keep-alive
```

#### 1.3 Processo de Resolução DNS
1. Cliente consulta cache local
2. Consulta ao servidor DNS local
3. Consulta recursiva aos servidores raiz
4. Retorno do endereço IP

### 2. Arquitetura Cliente-Servidor

#### 2.1 Responsabilidades do Cliente
- Interface do usuário
- Validação de entrada
- Formatação de requisições
- Cache local
- Tratamento de erros de conectividade

#### 2.2 Responsabilidades do Servidor
- Processamento de lógica de negócios
- Acesso ao banco de dados
- Autenticação e autorização
- Balanceamento de carga
- Logs e monitoramento

#### 2.3 Padrões de Comunicação
- **Request-Response**: Padrão clássico HTTP
- **WebSockets**: Comunicação bidirecional em tempo real
- **Server-Sent Events**: Push de dados do servidor
- **Long Polling**: Simulação de tempo real

### 3. Análise de Performance e Latência

#### 3.1 Fatores que Afetam a Performance
- **Latência de Rede**: Distância física, qualidade da conexão
- **Throughput**: Largura de banda disponível
- **Processamento**: Capacidade do servidor e cliente
- **Cache**: Estratégias de armazenamento temporário

#### 3.2 Métricas Importantes
- **Time to First Byte (TTFB)**: Tempo até primeira resposta
- **Round Trip Time (RTT)**: Tempo ida e volta
- **DNS Lookup Time**: Tempo de resolução DNS
- **Connection Time**: Tempo de estabelecimento da conexão

### 4. Segurança em Comunicações de Rede

#### 4.1 HTTPS e TLS/SSL
- Criptografia de dados em trânsito
- Certificados digitais e autoridades certificadoras
- Perfect Forward Secrecy
- HSTS (HTTP Strict Transport Security)

#### 4.2 Autenticação e Autorização
- **Basic Auth**: Credenciais em Base64
- **Bearer Tokens**: JWT e OAuth 2.0
- **API Keys**: Chaves de acesso simples
- **Session Cookies**: Autenticação baseada em sessão

### 5. Monitoramento e Debugging

#### 5.1 Ferramentas de Análise
- **Developer Tools**: Network tab, Performance tab
- **Wireshark**: Análise profunda de pacotes
- **curl**: Testes de linha de comando
- **Postman**: Testes de API

#### 5.2 Códigos de Status HTTP
- **2xx**: Sucesso (200 OK, 201 Created, 204 No Content)
- **3xx**: Redirecionamento (301 Moved, 304 Not Modified)
- **4xx**: Erro do cliente (400 Bad Request, 401 Unauthorized, 404 Not Found)
- **5xx**: Erro do servidor (500 Internal Error, 502 Bad Gateway, 503 Service Unavailable)

## Atividade Prática: Simulação de Comunicação Cliente-Servidor

### Objetivo
Criar uma aplicação web simples com Node.js e EJS para simular e monitorar comunicações HTTP, demonstrando conceitos de redes na prática.

### Requisitos
- Node.js (versão 16+)
- Editor de código (VS Code recomendado)
- Wireshark (opcional, para análise de pacotes)

### Passo 1: Configuração Inicial do Projeto

```bash
mkdir redes-pratica
cd redes-pratica
npm init -y
npm install express ejs axios cors helmet
npm install -D nodemon
```

### Passo 2: Estrutura do Projeto

```
redes-pratica/
├── package.json
├── server.js
├── views/
│   ├── index.ejs
│   ├── monitor.ejs
│   └── partials/
│       ├── head.ejs
│       └── footer.ejs
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
└── routes/
    └── api.js
```

### Passo 3: Implementação do Servidor Principal

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de segurança
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração da engine de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para logging de requisições
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);
    next();
});

// Rotas principais
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Monitor de Redes - Prática',
        currentTime: new Date().toISOString()
    });
});

app.get('/monitor', (req, res) => {
    res.render('monitor', { 
        title: 'Monitor de Requisições HTTP'
    });
});

// API para simulação de diferentes tipos de resposta
app.get('/api/test/:type', (req, res) => {
    const { type } = req.params;
    const delay = parseInt(req.query.delay) || 0;
    
    setTimeout(() => {
        switch(type) {
            case 'success':
                res.json({ 
                    status: 'success', 
                    message: 'Requisição processada com sucesso',
                    timestamp: new Date().toISOString(),
                    server: 'Node.js Express'
                });
                break;
            case 'error':
                res.status(500).json({ 
                    status: 'error', 
                    message: 'Erro interno do servidor simulado'
                });
                break;
            case 'notfound':
                res.status(404).json({ 
                    status: 'not_found', 
                    message: 'Recurso não encontrado'
                });
                break;
            case 'large':
                const largeData = Array(1000).fill().map((_, i) => ({
                    id: i,
                    name: `Item ${i}`,
                    description: `Descrição detalhada do item ${i}`,
                    timestamp: new Date().toISOString()
                }));
                res.json({ data: largeData, count: largeData.length });
                break;
            default:
                res.json({ message: 'Tipo de teste não reconhecido' });
        }
    }, delay);
});

// Rota para informações do servidor
app.get('/api/server-info', (req, res) => {
    res.json({
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        platform: process.platform,
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
    });
});

// Tratamento de erros 404
app.use((req, res) => {
    res.status(404).render('index', { 
        title: 'Página não encontrada',
        error: 'A página solicitada não foi encontrada.'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});
```

### Passo 4: Templates EJS

```html
<!-- views/partials/head.ejs -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
```

```html
<!-- views/index.ejs -->
<%- include('partials/head') %>

<div class="container mt-5">
    <h1 class="text-center mb-4">Monitor de Comunicações de Rede</h1>
    
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h5>Testes de Requisições HTTP</h5>
                </div>
                <div class="card-body">
                    <button class="btn btn-success mb-2" onclick="testRequest('success')">
                        Teste Sucesso (200)
                    </button>
                    <button class="btn btn-danger mb-2" onclick="testRequest('error')">
                        Teste Erro (500)
                    </button>
                    <button class="btn btn-warning mb-2" onclick="testRequest('notfound')">
                        Teste Not Found (404)
                    </button>
                    <button class="btn btn-info mb-2" onclick="testRequest('large')">
                        Teste Dados Grandes
                    </button>
                </div>
            </div>
        </div>
        
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h5>Informações da Requisição</h5>
                </div>
                <div class="card-body">
                    <div id="request-info">
                        <p><strong>Timestamp:</strong> <%= currentTime %></p>
                        <p><strong>Status:</strong> <span id="status">Aguardando...</span></p>
                        <p><strong>Tempo de Resposta:</strong> <span id="response-time">-</span>ms</p>
                        <p><strong>Tamanho da Resposta:</strong> <span id="response-size">-</span> bytes</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="row mt-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5>Log de Requisições</h5>
                </div>
                <div class="card-body">
                    <div id="request-log" style="height: 300px; overflow-y: auto; background: #f8f9fa;">
                        <p class="text-muted">Logs aparecerão aqui...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="/js/app.js"></script>
</body>
</html>
```

### Passo 5: JavaScript Frontend

```javascript
// public/js/app.js
let requestCount = 0;

function testRequest(type) {
    const startTime = performance.now();
    const timestamp = new Date().toISOString();
    requestCount++;
    
    // Atualizar status
    document.getElementById('status').textContent = 'Enviando...';
    document.getElementById('response-time').textContent = '-';
    document.getElementById('response-size').textContent = '-';
    
    // Log da requisição
    addLog(`[${requestCount}] Enviando requisição: ${type.toUpperCase()}`);
    
    fetch(`/api/test/${type}`)
        .then(response => {
            const endTime = performance.now();
            const responseTime = Math.round(endTime - startTime);
            
            // Atualizar informações
            document.getElementById('status').textContent = `${response.status} ${response.statusText}`;
            document.getElementById('response-time').textContent = responseTime;
            
            // Log do status
            addLog(`[${requestCount}] Status: ${response.status} - Tempo: ${responseTime}ms`);
            
            return response.text().then(text => {
                document.getElementById('response-size').textContent = text.length;
                addLog(`[${requestCount}] Tamanho: ${text.length} bytes`);
                
                return response.ok ? JSON.parse(text) : Promise.reject(text);
            });
        })
        .then(data => {
            addLog(`[${requestCount}] Sucesso: ${JSON.stringify(data).substring(0, 100)}...`);
        })
        .catch(error => {
            addLog(`[${requestCount}] Erro: ${error.toString().substring(0, 100)}...`);
        });
}

function addLog(message) {
    const logDiv = document.getElementById('request-log');
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.innerHTML = `<small class="text-muted">${timestamp}</small> ${message}`;
    logDiv.appendChild(logEntry);
    logDiv.scrollTop = logDiv.scrollHeight;
}

// Monitoramento automático do servidor
setInterval(() => {
    fetch('/api/server-info')
        .then(response => response.json())
        .then(data => {
            console.log('Server Info:', data);
        })
        .catch(error => console.error('Erro ao obter info do servidor:', error));
}, 30000);
```

### Passo 6: Estilos CSS

```css
/* public/css/style.css */
body {
    background-color: #f8f9fa;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border: none;
    margin-bottom: 20px;
}

.card-header {
    background-color: #007bff;
    color: white;
    font-weight: bold;
}

.btn {
    margin-right: 10px;
    margin-bottom: 10px;
    min-width: 150px;
}

#request-log {
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 12px;
    line-height: 1.4;
    padding: 10px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
}

#request-info p {
    margin-bottom: 8px;
}

.text-success { color: #28a745 !important; }
.text-danger { color: #dc3545 !important; }
.text-warning { color: #ffc107 !important; }
.text-info { color: #17a2b8 !important; }
```

### Passo 7: Executando o Projeto

```bash
# Adicionar script no package.json
npm pkg set scripts.start="node server.js"
npm pkg set scripts.dev="nodemon server.js"

# Executar em modo desenvolvimento
npm run dev
```

### Exercícios Práticos

1. **Análise de Performance**: Use as ferramentas do navegador para analisar o tempo de carregamento
2. **Wireshark**: Capture e analise os pacotes HTTP gerados pela aplicação
3. **Teste de Carga**: Envie múltiplas requisições simultâneas e observe o comportamento
4. **Modificação de Headers**: Adicione headers customizados e analise no Network tab

## Deploy no Render - Node.js com EJS SSR

### Pré-requisitos
- Conta no GitHub
- Conta no Render (render.com)
- Projeto Node.js com EJS funcionando localmente

### Passo 1: Preparação do Projeto para Deploy

#### 1.1 Configuração do package.json
```json
{
  "name": "redes-pratica",
  "version": "1.0.0",
  "description": "Aplicação de demonstração de redes",
  "main": "server.js",
  "engines": {
    "node": ">=16.0.0"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "ejs": "^3.1.8",
    "axios": "^1.4.0",
    "cors": "^2.8.5",
    "helmet": "^7.0.0"
  }
}
```

#### 1.2 Configuração de Variáveis de Ambiente
```javascript
// server.js - Modificar a configuração da porta
const PORT = process.env.PORT || 3000;

// Adicionar configuração para produção
if (process.env.NODE_ENV === 'production') {
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
                scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
                imgSrc: ["'self'", "data:", "https:"],
            },
        },
    }));
}
```

#### 1.3 Criar arquivo .gitignore
```
node_modules/
.env
.DS_Store
*.log
.vscode/
coverage/
.nyc_output/
```

### Passo 2: Versionamento no Git

```bash
# Inicializar repositório (se ainda não feito)
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "Initial commit - Aplicação de redes com Node.js e EJS"

# Criar repositório no GitHub e adicionar remote
git remote add origin https://github.com/SEU_USUARIO/redes-pratica.git

# Push para o GitHub
git branch -M main
git push -u origin main
```

### Passo 3: Deploy no Render

#### 3.1 Criar Nova Web Service
1. Acesse [render.com](https://render.com) e faça login
2. Clique em "New +" e selecione "Web Service"
3. Conecte sua conta do GitHub se necessário
4. Selecione o repositório do projeto

#### 3.2 Configurações de Deploy
```
Name: redes-pratica-app
Environment: Node
Region: Ohio (US East)
Branch: main
Build Command: npm install
Start Command: npm start
```

#### 3.3 Configurações Avançadas
- **Auto-Deploy**: Yes (para deploy automático quando fizer push)
- **Instance Type**: Free (para projetos de estudo)

### Passo 4: Variáveis de Ambiente no Render

```
NODE_ENV=production
```

### Passo 5: Verificação e Teste

#### 5.1 Monitoramento do Deploy
- Acompanhe os logs de build no dashboard do Render
- Verifique se não há erros durante a instalação das dependências
- Confirme se o servidor inicia corretamente

#### 5.2 Teste da Aplicação
1. Acesse a URL fornecida pelo Render
2. Teste todas as funcionalidades principais
3. Verifique se os assets estáticos carregam corretamente
4. Teste as rotas da API

### Passo 6: Configurações Adicionais (Opcional)

#### 6.1 Domínio Customizado
```
Custom Domain: seu-dominio.com
```

#### 6.2 HTTPS
O Render fornece certificado SSL automático para todos os deploys.

#### 6.3 Monitoramento
```javascript
// Adicionar ao server.js para health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
```

### Passo 7: Troubleshooting Comum

#### 7.1 Problemas de Porta
```javascript
// Garantir que a aplicação use a porta do ambiente
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
```

#### 7.2 Problemas com Assets
```javascript
// Configurar Express para servir arquivos estáticos corretamente
app.use(express.static(path.join(__dirname, 'public')));
```

#### 7.3 Problemas de Build
- Verificar se todas as dependências estão no `dependencies` (não em `devDependencies`)
- Confirmar se o Node.js version está especificado no `engines`

### Passo 8: Atualizações e Manutenção

#### 8.1 Deploy de Atualizações
```bash
# Fazer alterações no código
git add .
git commit -m "Atualização: nova funcionalidade"
git push origin main
# O Render fará deploy automático
```

#### 8.2 Rollback
No dashboard do Render, é possível fazer rollback para deploys anteriores através da aba "Events".

#### 8.3 Logs e Monitoramento
- Use a aba "Logs" no dashboard para debug
- Configure alertas para monitorar uptime
- Monitore métricas de performance

### Conclusão

Este tutorial completo abrange desde os conceitos fundamentais de redes até a implementação prática e deploy de uma aplicação Node.js com EJS SSR no Render. A aplicação serve como ferramenta educacional para compreender comunicações HTTP, análise de performance e processos de deploy em ambiente de produção.


