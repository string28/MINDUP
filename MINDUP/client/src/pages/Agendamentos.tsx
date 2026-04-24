import { useState, useEffect, useRef } from 'react';
import '../styles.css';

export default function Agendamentos({ usuario }: any) {
  const [mes, setMes] = useState(new Date().getMonth());
  const [ano] = useState(new Date().getFullYear());
  const [dataSelected, setDataSelected] = useState('');
  const [horarioSelected, setHorarioSelected] = useState('');
  const [profissionalSelected, setProfissionalSelected] = useState('Dr. Carlos Psicólogo');
  const [notas, setNotas] = useState('');
  const [aba, setAba] = useState('calendario');
  const [mensagemChat, setMensagemChat] = useState('');
  const [agendamentos, setAgendamentos] = useState(() =>
    JSON.parse(localStorage.getItem('agendamentos') || '[]')
  );
  const [mensagensChat, setMensagensChat] = useState(() =>
    JSON.parse(localStorage.getItem('mensagens_profissional') || '[]')
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const horarios = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  
  // Profissionais com fotos (usando placeholders realistas)
  const profissionais = [
    { 
      id: 1, 
      nome: 'Dr. Carlos Psicólogo', 
      foto: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop',
      especialidade: 'Terapia Cognitivo-Comportamental'
    },
    { 
      id: 2, 
      nome: 'Dra. Ana Psicóloga', 
      foto: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?w=150&h=150&fit=crop',
      especialidade: 'Psicologia Escolar'
    },
    { 
      id: 3, 
      nome: 'Dr. Roberto Terapeuta', 
      foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop',
      especialidade: 'Ansiedade e Estresse'
    }
  ];

  // const profissionalAtual = profissionais.find(p => p.nome === profissionalSelected);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensagensChat]);

  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDay = new Date(ano, mes, 1).getDay();
  const dias = Array.from({ length: diasNoMes }, (_, i) => i + 1);
  const diasVazios = Array.from({ length: primeiroDay }, () => null);

  const horariosOcupados = agendamentos
    .filter((a: any) => a.data === dataSelected)
    .map((a: any) => a.horario);

  const handleAgendar = (e: any) => {
    e.preventDefault();

    if (!dataSelected || !horarioSelected) {
      alert('Selecione data e horário');
      return;
    }

    const novoAgendamento = {
      id: Date.now(),
      aluno: usuario.nome,
      sala: usuario.sala,
      profissional: profissionalSelected,
      data: dataSelected,
      horario: horarioSelected,
      notas,
      status: 'confirmado'
    };

    const novosAgendamentos = [...agendamentos, novoAgendamento];
    setAgendamentos(novosAgendamentos);
    localStorage.setItem('agendamentos', JSON.stringify(novosAgendamentos));

    alert('Sessão agendada com sucesso!');
    setDataSelected('');
    setHorarioSelected('');
    setNotas('');
  };

  const handleCancelar = (id: number) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      const novosAgendamentos = agendamentos.filter((a: any) => a.id !== id);
      setAgendamentos(novosAgendamentos);
      localStorage.setItem('agendamentos', JSON.stringify(novosAgendamentos));
      alert('Agendamento cancelado.');
    }
  };

  const handleEnviarChat = (e: any) => {
    e.preventDefault();
    if (!mensagemChat.trim()) return;

    const novaMensagem = {
      id: Date.now(),
      usuario: usuario.nome,
      profissional: profissionalSelected,
      texto: mensagemChat,
      data: new Date().toISOString()
    };

    const novasMensagens = [...mensagensChat, novaMensagem];
    setMensagensChat(novasMensagens);
    localStorage.setItem('mensagens_profissional', JSON.stringify(novasMensagens));
    setMensagemChat('');
  };

  const mesNome = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][mes];
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  return (
    <div className="content-wrapper">
      <h1 className="text-4xl font-bold mb-8">Agendamentos</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #e5e7eb' }}>
        <button 
          className={`btn ${aba === 'calendario' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setAba('calendario')}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: aba === 'calendario' ? 'none' : '' }}
        >
          Calendário
        </button>
        <button 
          className={`btn ${aba === 'chat' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setAba('chat')}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: aba === 'chat' ? 'none' : '' }}
        >
          Chat Geral
        </button>
        <button 
          className={`btn ${aba === 'profissional' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setAba('profissional')}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: aba === 'profissional' ? 'none' : '' }}
        >
          Profissionais
        </button>
      </div>

      {aba === 'calendario' && (
        <div className="grid-2">
          {/* Calendário */}
          <div className="card card-blue">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <button className="btn btn-outline p-2" onClick={() => setMes(mes === 0 ? 11 : mes - 1)}>&lt;</button>
              <h2 className="text-xl font-bold text-blue-700">{mesNome} {ano}</h2>
              <button className="btn btn-outline p-2" onClick={() => setMes(mes === 11 ? 0 : mes + 1)}>&gt;</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
              {diasSemana.map(d => <div key={d} className="font-bold text-gray-600 text-sm">{d}</div>)}
              {diasVazios.map((_, i) => <div key={`v-${i}`}></div>)}
              {dias.map(dia => {
                const data = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
                const isSelected = dataSelected === data;
                return (
                  <button
                    key={dia}
                    onClick={() => setDataSelected(data)}
                    className="btn"
                    style={{
                      padding: '0.5rem',
                      backgroundColor: isSelected ? 'var(--primary-blue)' : 'var(--white)',
                      color: isSelected ? 'white' : 'var(--text-main)',
                      border: '1px solid var(--pastel-blue-border)'
                    }}
                  >
                    {dia}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Agendar e Lista */}
          <div className="space-y-6">
            {dataSelected && (
              <div className="card card-green">
                <h3 className="font-bold mb-4">Horários para {new Date(dataSelected).toLocaleDateString('pt-BR')}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                  {horarios.map(h => (
                    <button
                      key={h}
                      disabled={horariosOcupados.includes(h)}
                      onClick={() => setHorarioSelected(h)}
                      className={`btn ${horarioSelected === h ? 'btn-success' : 'btn-outline'}`}
                      style={{ padding: '0.5rem', fontSize: '0.875rem', opacity: horariosOcupados.includes(h) ? 0.5 : 1 }}
                    >
                      {h}
                    </button>
                  ))}
                </div>
                <textarea 
                  className="textarea mb-4" 
                  placeholder="Notas para o profissional..." 
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                />
                <button className="btn btn-success w-full" onClick={handleAgendar}>Confirmar Agendamento</button>
              </div>
            )}

            <div className="card">
              <h3 className="font-bold mb-4">Suas Próximas Sessões</h3>
              {agendamentos.length === 0 ? (
                <p className="text-muted">Nenhuma sessão agendada.</p>
              ) : (
                <div className="space-y-3">
                  {agendamentos.map((ag: any) => (
                    <div key={ag.id} className="p-3 bg-blue-50 rounded border-2 border-blue-100 flex justify-between items-center">
                      <div>
                        <p className="font-bold">{ag.profissional}</p>
                        <p className="text-sm text-muted">{new Date(ag.data).toLocaleDateString('pt-BR')} às {ag.horario}</p>
                      </div>
                      <button className="btn btn-danger p-2 text-xs" onClick={() => handleCancelar(ag.id)}>Cancelar</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {aba === 'profissional' && (
        <div className="grid-2">
          {profissionais.map(p => (
            <div key={p.id} className="card flex items-center gap-4">
              <img src={p.foto} alt={p.nome} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h3 className="text-xl font-bold">{p.nome}</h3>
                <p className="text-blue-600 font-medium">{p.especialidade}</p>
                <button 
                  className="btn btn-primary mt-2 text-sm"
                  onClick={() => {
                    setProfissionalSelected(p.nome);
                    setAba('calendario');
                  }}
                >
                  Agendar com este profissional
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {aba === 'chat' && (
        <div className="card card-green">
          <h2 className="text-2xl font-bold mb-4">Chat com a Comunidade</h2>
          <div style={{ height: '400px', overflowY: 'auto', background: '#f9fafb', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            {mensagensChat.map((m: any) => (
              <div key={m.id} style={{ marginBottom: '1rem', textAlign: m.usuario === usuario.nome ? 'right' : 'left' }}>
                <div style={{ 
                  display: 'inline-block', 
                  padding: '0.75rem', 
                  borderRadius: '12px', 
                  backgroundColor: m.usuario === usuario.nome ? 'var(--primary-green)' : 'white',
                  color: m.usuario === usuario.nome ? 'white' : 'var(--text-main)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <p className="text-xs font-bold mb-1">{m.usuario}</p>
                  <p>{m.texto}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              className="input" 
              placeholder="Digite sua mensagem..." 
              value={mensagemChat}
              onChange={(e) => setMensagemChat(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleEnviarChat}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
}
