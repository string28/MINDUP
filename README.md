# MindUp - App de Agendamento de Terapia

Um aplicativo simples e funcional para agendamento de sessões de terapia com chats integrados.

## 🚀 Instalação Rápida

### 1. Descompacte o arquivo
```bash
unzip mindup-react-clean.zip
cd mindup-react
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Inicie o servidor
```bash
npm run dev
```

O app estará disponível em `http://localhost:3000`

## 🧪 Dados de Teste

- **Email:** maria.silva@cps.sp.gov.br
- **Senha:** 123456
- **ETEC:** 266
- **Sala:** 2DS

## ✨ Funcionalidades

✅ **Home** - Página inicial pública com apresentação
✅ **Login** - Autenticação com email @cps.sp.gov.br
✅ **Cadastro** - Registro com validações (ETEC 266, sala)
✅ **Dashboard** - Painel com resumo de agendamentos
✅ **Agendamentos** - Calendário com horários (verde = livre, vermelho = ocupado)
✅ **Chats** - Chat geral com tags de sala e chat com profissional
✅ **Aulas** - Horário de aulas filtrado por sala
✅ **Perfil** - Edição de informações pessoais

## 📦 Dependências

- React 19
- React DOM 19
- Wouter (roteamento)
- Vite (bundler)
- TypeScript

**Sem Tailwind, sem dependências complexas!**

## 🛠️ Scripts

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Compila para produção
npm run preview  # Visualiza a build
npm run check    # Verifica erros de TypeScript
```

## 📁 Estrutura

```
mindup-react/
├── client/
│   ├── src/
│   │   ├── pages/        # Páginas do app
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── App.tsx       # Rotas principais
│   │   ├── main.tsx      # Entry point
│   │   └── index.css     # Estilos CSS puro
│   └── index.html        # HTML base
├── vite.config.ts        # Configuração Vite
├── tsconfig.json         # Configuração TypeScript
└── package.json          # Dependências
```

## 🎨 Design

- **Cores Pastéis:** Azul, verde e branco
- **CSS Puro:** Sem frameworks de CSS
- **Responsivo:** Funciona em mobile, tablet e desktop

## ⚠️ Importante

- Todos os dados são armazenados no `localStorage` do navegador
- Para usar em produção, implemente um backend com banco de dados
- As cores e estilos estão em `client/src/index.css`

## 🐛 Troubleshooting

Se tiver problemas:

1. **Limpe cache e reinstale:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Verifique a porta:**
   - Se a porta 3000 estiver em uso, o Vite usará outra automaticamente

3. **Erros de TypeScript:**
   ```bash
   npm run check
   ```

## 📝 Notas

- Este é um projeto frontend-only com dados em localStorage
- Para produção, adicione autenticação real e backend
- O design é simples e direto, sem efeitos visuais excessivos

---

**Desenvolvido com ❤️ para MindUp**
