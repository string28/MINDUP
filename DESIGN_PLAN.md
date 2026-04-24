# MindUp - Plano de Design e Arquitetura

## Visão Geral
MindUp é um aplicativo de agendamento de sessões de terapia para alunos de instituições educacionais, com foco em bem-estar mental e saúde emocional.

## Filosofia de Design
- **Paleta de Cores**: Tons pastéis (branco, azul suave, verde suave)
- **Sensação**: Acolhedor, seguro, tranquilo
- **Tipografia**: Fontes limpas e legíveis
- **Espaçamento**: Generoso, respirado
- **Interações**: Suaves, não invasivas

## Estrutura de Dados

### Usuário
```
{
  id: number
  nome: string
  email: string (deve ser @cps.sp.gov.br)
  codigoEtec: string (266)
  sala: string (1DS, 2DS, 3MAD, etc)
  senha: string
  tipo: 'aluno' | 'profissional'
  foto?: string
  telefone?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  github?: string
  biografia?: string
  dataCadastro: string
}
```

### Agendamento (Sessão de Terapia)
```
{
  id: number
  alunoId: number
  profissionalId: number
  data: string
  horario: string
  status: 'confirmado' | 'cancelado' | 'pendente' | 'concluído'
  notas?: string
  criadoEm: string
}
```

### Aula
```
{
  id: number
  sala: string (2DS, 3MAD, etc)
  materia: string
  professor: string
  diaSemana: string
  horario: string
  sala_fisica: string
}
```

### Mensagem
```
{
  id: number
  usuarioId: number
  usuarioNome: string
  usuarioSala: string
  tipo: 'geral' | 'sala' | 'profissional'
  salaDestino?: string
  profissionalDestinoId?: number
  texto: string
  data: string
}
```

### Evento (Prova, Trabalho, etc)
```
{
  id: number
  sala: string
  titulo: string
  descricao: string
  tipo: 'prova' | 'trabalho' | 'evento'
  data: string
  materia?: string
  criadoEm: string
}
```

## Páginas e Rotas

### Públicas
- `/` - Home (apresentação do projeto)
- `/login` - Login
- `/cadastro` - Cadastro

### Protegidas (requer login)
- `/painel` - Dashboard principal
- `/agendamentos` - Agendamento de sessões com calendário
- `/chats` - Chats (geral, sala, profissional)
- `/aulas` - Horário de aulas da sala
- `/perfil` - Perfil do usuário
- `/calendario` - Calendário de eventos

## Componentes Principais

### Calendário Interativo
- Exibe mês/semana
- Horários ocupados em vermelho
- Horários livres em verde
- Clique para agendar

### Chat
- Abas: Geral, Sala, Profissional
- Tags de sala ao lado do nome
- Scroll automático para novas mensagens
- Timestamp das mensagens

### Tabela de Aulas
- Filtrada por sala do usuário logado
- Colunas: Horário, Matéria, Professor, Sala

### Perfil
- Foto do usuário
- Informações pessoais
- Redes sociais
- Edição de dados

## Validações

### Cadastro
- Email deve terminar com @cps.sp.gov.br
- Código ETEC deve ser 266
- Sala deve ser válida (1DS, 2DS, 3MAD, etc)
- Senha mínimo 6 caracteres

### Login
- Email @cps.sp.gov.br
- Código ETEC 266
- Senha correta

## Dados de Teste

### Aluno
- Email: aluno@cps.sp.gov.br
- Senha: 123456
- Código ETEC: 266
- Sala: 2DS

### Profissional
- Email: prof@cps.sp.gov.br
- Senha: 123456
- Código ETEC: 266
- Tipo: profissional

## Paleta de Cores (Tons Pastéis)

- **Branco**: #FFFFFF, #F8FAFB
- **Azul Pastel**: #E3F2FD, #BBDEFB, #90CAF9, #64B5F6
- **Verde Pastel**: #E8F5E9, #C8E6C9, #A5D6A7, #81C784
- **Rosa Suave**: #FCE4EC, #F8BBD0, #F48FB1
- **Cinza Neutro**: #F5F5F5, #EEEEEE, #E0E0E0

## Fluxo de Usuário

1. **Visitante** → Home → Login/Cadastro
2. **Novo Usuário** → Cadastro (validações) → Login
3. **Usuário Logado** → Painel → Agendamentos/Chats/Aulas/Perfil
4. **Agendamento** → Selecionar data → Selecionar horário → Confirmar
5. **Chat** → Escolher tipo (Geral/Sala/Profissional) → Enviar mensagem
6. **Perfil** → Visualizar/Editar informações

## Próximos Passos
1. Criar componentes base com design pastel
2. Implementar autenticação com validações
3. Desenvolver calendário interativo
4. Implementar sistema de chats
5. Criar páginas de aulas e eventos
6. Testar fluxos completos
