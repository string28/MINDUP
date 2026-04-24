import { useState, useEffect, useRef } from 'react';

export default function Chats({ usuario }: any) {
  const [aba, setAba] = useState('geral');
  const [mensagem, setMensagem] = useState('');
  const [mensagensGeral, setMensagensGeral] = useState(() =>
    JSON.parse(localStorage.getItem('mensagens') || '[]')
  );
  const [mensagensSala, setMensagensSala] = useState(() =>
    JSON.parse(localStorage.getItem(`mensagens_${usuario.sala}`) || '[]')
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensagensGeral, mensagensSala]);

  const handleEnviarGeral = (e: any) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    const novaMensagem = {
      id: Date.now(),
      usuario: usuario.nome,
      sala: usuario.sala,
      texto: mensagem,
      data: new Date().toISOString()
    };

    const novasMensagens = [...mensagensGeral, novaMensagem];
    setMensagensGeral(novasMensagens);
    localStorage.setItem('mensagens', JSON.stringify(novasMensagens));
    setMensagem('');
  };

  const handleEnviarSala = (e: any) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    const novaMensagem = {
      id: Date.now(),
      usuario: usuario.nome,
      texto: mensagem,
      data: new Date().toISOString()
    };

    const novasMensagens = [...mensagensSala, novaMensagem];
    setMensagensSala(novasMensagens);
    localStorage.setItem(`mensagens_${usuario.sala}`, JSON.stringify(novasMensagens));
    setMensagem('');
  };

  const mensagensExibidas = aba === 'geral' ? mensagensGeral : mensagensSala;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Chats</h1>

      <div className="bg-white border-2 border-green-300 rounded-lg p-6">
        {/* Abas */}
        <div className="flex gap-4 mb-6 border-b-2 border-gray-300 pb-4">
          <button
            onClick={() => setAba('geral')}
            className={`px-6 py-2 rounded font-bold ${
              aba === 'geral'
                ? 'bg-blue-300 text-blue-800'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Chat Geral
          </button>
          <button
            onClick={() => setAba('sala')}
            className={`px-6 py-2 rounded font-bold ${
              aba === 'sala'
                ? 'bg-green-300 text-green-800'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Sala ({usuario.sala})
          </button>
        </div>

        {/* Mensagens */}
        <div
          ref={scrollRef}
          className="h-96 overflow-y-auto bg-gray-50 rounded border-2 border-gray-300 p-4 space-y-3 mb-4"
        >
          {mensagensExibidas.length === 0 ? (
            <p className="text-gray-600 text-center py-12">Nenhuma mensagem</p>
          ) : (
            mensagensExibidas.map((msg: any) => (
              <div
                key={msg.id}
                className={`p-3 rounded ${
                  msg.usuario === usuario.nome
                    ? aba === 'geral'
                      ? 'bg-blue-100 ml-auto max-w-xs'
                      : 'bg-green-100 ml-auto max-w-xs'
                    : 'bg-white border-2 border-gray-300 max-w-xs'
                }`}
              >
                <p className="font-bold text-sm text-gray-800">
                  {msg.usuario}
                  {msg.sala && (
                    <span className="text-xs text-gray-600 ml-2 bg-gray-200 px-2 py-1 rounded">
                      {msg.sala}
                    </span>
                  )}
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

        {/* Input */}
        <form
          onSubmit={aba === 'geral' ? handleEnviarGeral : handleEnviarSala}
          className="flex gap-2"
        >
          <input
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-green-400"
          />
          <button
            type="submit"
            className={`px-6 py-2 rounded font-bold text-white ${
              aba === 'geral'
                ? 'bg-blue-400 hover:bg-blue-500'
                : 'bg-green-400 hover:bg-green-500'
            }`}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
