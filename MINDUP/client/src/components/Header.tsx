import { useLocation } from 'wouter';
import '../styles.css';

export default function Header({ usuario, onLogout }: any) {
  const [location, setLocation] = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <div
          onClick={() => setLocation('/')}
          className="text-3xl font-bold text-blue-600 cursor-pointer"
          style={{ letterSpacing: '-1px' }}
        >
          MindUp
        </div>

        {usuario ? (
          <div className="user-menu">
            <nav className="nav-links">
              <button
                onClick={() => setLocation('/dashboard')}
                className={`nav-link ${location === '/dashboard' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
              >
                Painel
              </button>
              <button
                onClick={() => setLocation('/agendamentos')}
                className={`nav-link ${location === '/agendamentos' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
              >
                Agendamentos
              </button>
              <button
                onClick={() => setLocation('/chats')}
                className={`nav-link ${location === '/chats' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
              >
                Comunidade
              </button>
              <button
                onClick={() => setLocation('/perfil')}
                className={`nav-link ${location === '/perfil' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
              >
                Perfil
              </button>
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '2px solid #f3f4f6' }}>
              {usuario.foto ? (
                <img src={usuario.foto} alt="Avatar" className="avatar-sm" />
              ) : (
                <div className="avatar-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e0f2fe', fontSize: '1.2rem' }}>👤</div>
              )}
              <span className="text-sm font-medium text-gray-700">{usuario.nome.split(' ')[0]}</span>
              <button
                onClick={() => {
                  onLogout();
                  setLocation('/');
                }}
                className="btn btn-danger"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              >
                Sair
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setLocation('/login')} className="btn btn-outline">Login</button>
            <button onClick={() => setLocation('/cadastro')} className="btn btn-primary">Começar Agora</button>
          </div>
        )}
      </div>
    </header>
  );
}
