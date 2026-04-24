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

  const containerStyle = {
    maxWidth: '56rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '3rem',
    paddingBottom: '3rem'
  };

  const titleStyle = {
    fontSize: '2.25rem',
    fontWeight: 'bold' as const,
    color: '#1f2937',
    marginBottom: '2rem'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '2px solid #86efac',
    borderRadius: '0.5rem',
    padding: '1.5rem'
  };

  const tabsContainerStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    borderBottom: '2px solid #d1d5db',
    paddingBottom: '1rem'
  };

  const tabButtonStyle = {
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    borderRadius: '0.25rem',
    fontWeight: 'bold' as const,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s'
  };

  const tabButtonActiveBlueStyle = {
    ...tabButtonStyle,
    backgroundColor: '#93c5fd',
    color: '#1e40af'
  };

  const tabButtonActiveGreenStyle = {
    ...tabButtonStyle,
    backgroundColor: '#86efac',
    color: '#166534'
  };

  const tabButtonInactiveStyle = {
    ...tabButtonStyle,
    backgroundColor: '#e5e7eb',
    color: '#374151'
  };

  const messagesContainerStyle = {
    height: '24rem',
    overflowY: 'auto' as const,
    backgroundColor: '#f3f4f6',
    borderRadius: '0.25rem',
    border: '2px solid #d1d5db',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
    marginBottom: '1rem'
  };

  const emptyMessageStyle = {
    color: '#4b5563',
    textAlign: 'center' as const,
    paddingTop: '3rem',
    paddingBottom: '3rem'
  };

  const messageOwnBlueStyle = {
    padding: '0.75rem',
    borderRadius: '0.25rem',
    backgroundColor: '#dbeafe',
    border: 'none',
    marginLeft: 'auto',
    maxWidth: '20rem'
  };

  const messageOwnGreenStyle = {
    padding: '0.75rem',
    borderRadius: '0.25rem',
    backgroundColor: '#dcfce7',
    border: 'none',
    marginLeft: 'auto',
    maxWidth: '20rem'
  };

  const messageOtherStyle = {
    padding: '0.75rem',
    borderRadius: '0.25rem',
    backgroundColor: '#ffffff',
    border: '2px solid #d1d5db',
    maxWidth: '20rem'
  };

  const messageNameStyle = {
    fontWeight: 'bold' as const,
    fontSize: '0.875rem',
    color: '#1f2937'
  };

  const messageSalaBadgeStyle = {
    fontSize: '0.75rem',
    color: '#4b5563',
    marginLeft: '0.5rem',
    backgroundColor: '#e5e7eb',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
    borderRadius: '0.25rem'
  };

  const messageTextStyle = {
    fontSize: '0.875rem',
    color: '#374151',
    marginTop: '0.25rem'
  };

  const messageTimeStyle = {
    fontSize: '0.75rem',
    color: '#4b5563',
    marginTop: '0.25rem'
  };

  const formStyle = {
    display: 'flex',
    gap: '0.5rem'
  };

  const inputStyle = {
    flex: 1,
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    border: '2px solid #d1d5db',
    borderRadius: '0.25rem',
    fontFamily: 'inherit',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  const sendButtonBlueStyle = {
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    borderRadius: '0.25rem',
    fontWeight: 'bold' as const,
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    backgroundColor: '#60a5fa'
  };

  const sendButtonGreenStyle = {
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    borderRadius: '0.25rem',
    fontWeight: 'bold' as const,
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    backgroundColor: '#4ade80'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Chats</h1>

      <div style={cardStyle}>
        {/* Abas */}
        <div style={tabsContainerStyle}>
          <button
            onClick={() => setAba('geral')}
            style={aba === 'geral' ? tabButtonActiveBlueStyle : tabButtonInactiveStyle}
            onMouseEnter={(e) => {
              if (aba !== 'geral') {
                e.currentTarget.style.backgroundColor = '#d1d5db';
              }
            }}
            onMouseLeave={(e) => {
              if (aba !== 'geral') {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
              }
            }}
          >
            Chat Geral
          </button>
          <button
            onClick={() => setAba('sala')}
            style={aba === 'sala' ? tabButtonActiveGreenStyle : tabButtonInactiveStyle}
            onMouseEnter={(e) => {
              if (aba !== 'sala') {
                e.currentTarget.style.backgroundColor = '#d1d5db';
              }
            }}
            onMouseLeave={(e) => {
              if (aba !== 'sala') {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
              }
            }}
          >
            Sala ({usuario.sala})
          </button>
        </div>

        {/* Mensagens */}
        <div ref={scrollRef} style={messagesContainerStyle}>
          {mensagensExibidas.length === 0 ? (
            <p style={emptyMessageStyle}>Nenhuma mensagem</p>
          ) : (
            mensagensExibidas.map((msg: any) => {
              const isOwn = msg.usuario === usuario.nome;
              let messageStyle = messageOtherStyle;

              if (isOwn) {
                 messageStyle = aba === 'geral' ? messageOwnBlueStyle : messageOwnGreenStyle;
              }

              return (
                <div key={msg.id} style={messageStyle}>
                  <p style={messageNameStyle}>
                    {msg.usuario}
                    {msg.sala && (
                      <span style={messageSalaBadgeStyle}>
                        {msg.sala}
                      </span>
                    )}
                  </p>
                  <p style={messageTextStyle}>{msg.texto}</p>
                  <p style={messageTimeStyle}>
                    {new Date(msg.data).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={aba === 'geral' ? handleEnviarGeral : handleEnviarSala}
          style={formStyle}
        >
          <input
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Digite sua mensagem..."
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#86efac')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
          />
          <button
            type="submit"
            style={aba === 'geral' ? sendButtonBlueStyle : sendButtonGreenStyle}
            onMouseEnter={(e) => {
              if (aba === 'geral') {
                e.currentTarget.style.backgroundColor = '#3b82f6';
              } else {
                e.currentTarget.style.backgroundColor = '#22c55e';
              }
            }}
            onMouseLeave={(e) => {
              if (aba === 'geral') {
                e.currentTarget.style.backgroundColor = '#60a5fa';
              } else {
                e.currentTarget.style.backgroundColor = '#4ade80';
              }
            }}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
