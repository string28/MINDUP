import { useState, useEffect, useRef } from 'react';

export default function Agendamentos({ usuario }: any) {
  const [mes, setMes] = useState(new Date().getMonth());
  const [ano, setAno] = useState(new Date().getFullYear());
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
  const profissionais = [
    { id: 1, nome: 'Dr. Carlos Psicólogo',  foto: '👨‍⚕️' },
    { id: 2, nome: 'Dra. Ana Psicóloga',  foto: '👩‍⚕️' },
    { id: 3, nome: 'Dr. Roberto Terapeuta', foto: '👨‍⚕️' }
  ];

  const profissionalAtual = profissionais.find(p => p.nome === profissionalSelected);

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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Agendamento de Sessões</h1>

      {/* Abas */}
      <div className="flex gap-4 mb-8 border-b-2 border-gray-300 pb-4">
        <button
          onClick={() => setAba('calendario')}
          className={`px-6 py-2 rounded font-bold ${
            aba === 'calendario'
              ? 'bg-blue-300 text-blue-800'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
           Calendário
        </button>
        <button
          onClick={() => setAba('chat')}
          className={`px-6 py-2 rounded font-bold ${
            aba === 'chat'
              ? 'bg-green-300 text-green-800'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
           Chat Geral
        </button>
        <button
          onClick={() => setAba('profissional')}
          className={`px-6 py-2 rounded font-bold ${
            aba === 'profissional'
              ? 'bg-purple-300 text-purple-800'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
           Profissional
        </button>
      </div>

      {/* ABA CALENDÁRIO */}
      {aba === 'calendario' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendário */}
          <div className="bg-white border-2 border-blue-300 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => {
                  if (mes === 0) {
                    setMes(11);
                    setAno(ano - 1);
                  } else {
                    setMes(mes - 1);
                  }
                }}
                className="px-3 py-1 bg-blue-200 text-blue-700 rounded hover:bg-blue-300"
              >
                ←
              </button>
              <h2 className="text-xl font-bold text-blue-700">
                {mesNome} {ano}
              </h2>
              <button
                onClick={() => {
                  if (mes === 11) {
                    setMes(0);
                    setAno(ano + 1);
                  } else {
                    setMes(mes + 1);
                  }
                }}
                className="px-3 py-1 bg-blue-200 text-blue-700 rounded hover:bg-blue-300"
              >
                →
              </button>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {diasSemana.map(dia => (
                <div key={dia} className="text-center font-bold text-gray-600 text-sm">
                  {dia}
                </div>
              ))}
            </div>

            {/* Dias */}
            <div className="grid grid-cols-7 gap-2">
              {diasVazios.map((_, i) => (
                <div key={`vazio-${i}`}></div>
              ))}
              {dias.map(dia => {
                const data = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
                const temAgendamento = agendamentos.some((a: any) => a.data === data);
                return (
                  <button
                    key={dia}
                    onClick={() => setDataSelected(data)}
                    className={`p-2 rounded text-sm font-bold ${
                      dataSelected === data
                        ? 'bg-blue-500 text-white'
                        : temAgendamento
                        ? 'bg-red-200 text-red-700'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {dia}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Horários */}
          <div className="lg:col-span-2 space-y-6">
 
            <div className="bg-white border-2 border-purple-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-purple-700 mb-4">Profissional</h3>
              <div className="space-y-2">
                {profissionais.map(prof => (
                  <button
                    key={prof.id}
                    onClick={() => setProfissionalSelected(prof.nome)}
                    className={`w-full p-3 rounded text-left font-bold ${
                      profissionalSelected === prof.nome
                        ? 'bg-purple-300 text-purple-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {prof.foto} {prof.nome}
                  </button>
                ))}
              </div>
            </div>

            {/* Horários */}
            {dataSelected && (
              <div className="bg-white border-2 border-green-300 rounded-lg p-6">
                <h3 className="text-lg font-bold text-green-700 mb-4">
                  Horários para {new Date(dataSelected).toLocaleDateString('pt-BR')}
                </h3>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {horarios.map(h => (
                    <button
                      key={h}
                      onClick={() => setHorarioSelected(h)}
                      className={`px-3 py-2 rounded font-bold text-sm ${
                        horariosOcupados.includes(h)
                          ? 'bg-red-300 text-red-800 cursor-not-allowed'
                          : horarioSelected === h
                          ? 'bg-green-500 text-white'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                      disabled={horariosOcupados.includes(h)}
                    >
                      {h}
                    </button>
                  ))}
                </div>

                {/* Notas */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">Notas (opcional)</label>
                  <textarea
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-400"
                    rows={3}
                    placeholder="Descreva o motivo da sessão..."
                  />
                </div>

                <button
                  onClick={handleAgendar}
                  className="w-full px-4 py-2 bg-green-300 text-green-800 rounded font-bold hover:bg-green-400"
                >
                  Agendar Sessão
                </button>
              </div>
            )}

            {/* Agendamentos */}
            <div className="bg-white border-2 border-blue-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-700 mb-4">Suas Sessões</h3>
              {agendamentos.length === 0 ? (
                <p className="text-gray-600">Nenhuma sessão agendada</p>
              ) : (
                <div className="space-y-3">
                  {agendamentos.slice(-3).reverse().map((agende: any) => (
                    <div key={agende.id} className="bg-blue-50 border-2 border-blue-200 rounded p-3">
                      <p className="font-bold text-gray-800">{agende.profissional}</p>
                      <p className="text-sm text-gray-600">
                         {new Date(agende.data).toLocaleDateString('pt-BR')} às {agende.horario}
                      </p>
                      {agende.notas && <p className="text-sm text-gray-700 mt-1 italic">"{agende.notas}"</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    
      {aba === 'chat' && (
        <div className="bg-white border-2 border-green-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-6">Chat Geral - Comunidade</h2>

          <div
            ref={scrollRef}
            className="h-96 overflow-y-auto bg-gray-50 rounded border-2 border-gray-300 p-4 space-y-3 mb-4"
          >
            {mensagensChat.length === 0 ? (
              <p className="text-gray-600 text-center py-12">Nenhuma mensagem</p>
            ) : (
              mensagensChat.map((msg: any) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded max-w-xs ${
                    msg.usuario === usuario.nome
                      ? 'bg-green-100 ml-auto'
                      : 'bg-white border-2 border-gray-300'
                  }`}
                >
                  <p className="font-bold text-sm text-gray-800">
                    {msg.usuario}
                    <span className="text-xs text-gray-600 ml-2 bg-gray-200 px-2 py-1 rounded">
                      {usuario.sala}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">{msg.texto}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.data).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleEnviarChat} className="flex gap-2">
            <input
              type="text"
              value={mensagemChat}
              onChange={(e) => setMensagemChat(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-green-400"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-400 text-white rounded font-bold hover:bg-green-500"
            >
              Enviar
            </button>
          </form>
        </div>
      )}

    
      {aba === 'profissional' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
          <div className="bg-white border-2 border-purple-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">Profissional</h2>

            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{profissionalAtual?.foto}</div>
              <h3 className="text-xl font-bold text-gray-800">{profissionalAtual?.nome}</h3>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded p-4 space-y-3">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Email</p>
                <p className="text-gray-800">contato@profissional.com</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Telefone</p>
                <p className="text-gray-800">(11) 98765-4321</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Horário de Atendimento</p>
                <p className="text-gray-800">Seg-Sex: 08:00 - 18:00</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Experiência</p>
                <p className="text-gray-800">+10 anos em atendimento</p>
              </div>
            </div>
          </div>

          {/* Chat com Profissional */}
          <div className="lg:col-span-2 bg-white border-2 border-purple-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">
              Chat com {profissionalAtual?.nome}
            </h2>

            <div
              ref={scrollRef}
              className="h-96 overflow-y-auto bg-gray-50 rounded border-2 border-gray-300 p-4 space-y-3 mb-4"
            >
              {mensagensChat.filter((m: any) => m.profissional === profissionalSelected).length === 0 ? (
                <p className="text-gray-600 text-center py-12">Nenhuma mensagem</p>
              ) : (
                mensagensChat
                  .filter((m: any) => m.profissional === profissionalSelected)
                  .map((msg: any) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded max-w-xs ${
                        msg.usuario === usuario.nome
                          ? 'bg-purple-100 ml-auto'
                          : 'bg-white border-2 border-gray-300'
                      }`}
                    >
                      <p className="font-bold text-sm text-gray-800">{msg.usuario}</p>
                      <p className="text-sm text-gray-700 mt-1">{msg.texto}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(msg.data).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  ))
              )}
            </div>

            <form onSubmit={handleEnviarChat} className="flex gap-2">
              <input
                type="text"
                value={mensagemChat}
                onChange={(e) => setMensagemChat(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-purple-400"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-purple-400 text-white rounded font-bold hover:bg-purple-500"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
