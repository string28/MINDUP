import { useLocation } from 'wouter';
import { TbMessageChatbotFilled } from "react-icons/tb";
import { FaCalendarPlus } from "react-icons/fa";
import { TiMortarBoard } from "react-icons/ti";
import { BsFillPersonFill } from "react-icons/bs";
import '../styles.css';

export default function Dashboard({ usuario }: any) {
  const [, setLocation] = useLocation();

  const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
  const mensagens = JSON.parse(localStorage.getItem('mensagens_profissional') || '[]');

  return (
    <div className="content-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
        {usuario.foto ? (
          <img src={usuario.foto} alt="Perfil" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
        ) : (
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--pastel-blue-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', border: '3px solid white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>👤</div>
        )}
        <div>
          <h1 className="text-4xl font-bold">Olá, {usuario.nome.split(' ')[0]}!</h1>
          <p className="text-muted">
            Sala: <span className="font-bold text-blue-600">{usuario.sala}</span> | ETEC: <span className="font-bold">{usuario.etec}</span>
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        <button onClick={() => setLocation('/agendamentos')} className="card card-blue" style={{ textAlign: 'center', cursor: 'pointer' }}>
          <FaCalendarPlus size={32} color="var(--primary-blue)" style={{ marginBottom: '0.5rem' }} />
          <p className="text-2xl font-bold text-blue-700">{agendamentos.length}</p>
          <p className="text-sm font-medium">Agendamentos</p>
        </button>

        <button onClick={() => setLocation('/chats')} className="card card-green" style={{ textAlign: 'center', cursor: 'pointer' }}>
          <TbMessageChatbotFilled size={32} color="var(--primary-green)" style={{ marginBottom: '0.5rem' }} />
          <p className="text-2xl font-bold text-green-700">{mensagens.length}</p>
          <p className="text-sm font-medium">Mensagens</p>
        </button>

        <button onClick={() => setLocation('/aulas')} className="card card-blue" style={{ textAlign: 'center', cursor: 'pointer' }}>
          <TiMortarBoard size={32} color="var(--primary-blue)" style={{ marginBottom: '0.5rem' }} />
          <p className="text-sm font-medium">Horário de Aulas</p>
        </button>

        <button onClick={() => setLocation('/perfil')} className="card card-green" style={{ textAlign: 'center', cursor: 'pointer' }}>
          <BsFillPersonFill size={32} color="var(--primary-green)" style={{ marginBottom: '0.5rem' }} />
          <p className="text-sm font-medium">Meu Perfil</p>
        </button>
      </div>

      {/* Main Content */}
      <div className="grid-2">
        {/* Próxima Sessão */}
        <div className="card card-blue">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Próxima Sessão</h2>
          {agendamentos.length > 0 ? (
            <div className="p-4 bg-white rounded-lg border-2 border-blue-100">
              <p className="text-xl font-bold">{agendamentos[0].profissional}</p>
              <p className="text-muted">
                {new Date(agendamentos[0].data).toLocaleDateString('pt-BR')} às {agendamentos[0].horario}
              </p>
              <button onClick={() => setLocation('/agendamentos')} className="btn btn-outline w-full mt-4">Ver Detalhes</button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted mb-4">Você não tem sessões agendadas.</p>
              <button onClick={() => setLocation('/agendamentos')} className="btn btn-primary">Agendar Agora</button>
            </div>
          )}
        </div>

        {/* Comunidade */}
        <div className="card card-green">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Comunidade</h2>
          {mensagens.length > 0 ? (
            <div className="space-y-3">
              {mensagens.slice(-3).reverse().map((msg: any) => (
                <div key={msg.id} className="p-3 bg-white rounded border-2 border-green-100">
                  <p className="font-bold text-sm">
                    {msg.usuario} <span className="text-xs font-normal bg-green-100 px-2 py-1 rounded ml-2">{msg.sala}</span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">{msg.texto}</p>
                </div>
              ))}
              <button onClick={() => setLocation('/chats')} className="btn btn-outline w-full mt-2">Ir para o Chat</button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted">Nenhuma mensagem recente.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
