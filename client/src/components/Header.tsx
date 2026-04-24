import { useLocation } from 'wouter';

export default function Header({ usuario, onLogout }: any) {
  const [, setLocation] = useLocation();

  return (
    <header className="bg-white border-b-2 border-blue-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div
          onClick={() => setLocation('/')}
          className="text-3xl font-bold text-blue-500 cursor-pointer hover:text-blue-600"
        >
          💙 MindUp
        </div>

        {usuario ? (
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              <button onClick={() => setLocation('/dashboard')} className="text-gray-700 hover:text-blue-500 font-medium">
                Painel
              </button>
              <button onClick={() => setLocation('/agendamentos')} className="text-gray-700 hover:text-blue-500 font-medium">
                Agendamentos
              </button>
              <button onClick={() => setLocation('/chats')} className="text-gray-700 hover:text-green-500 font-medium">
                Chats
              </button>
              <button onClick={() => setLocation('/aulas')} className="text-gray-700 hover:text-blue-500 font-medium">
                Aulas
              </button>
              <button onClick={() => setLocation('/perfil')} className="text-gray-700 hover:text-green-500 font-medium">
                Perfil
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{usuario.nome}</span>
              <button
                onClick={() => {
                  onLogout();
                  setLocation('/');
                }}
                className="px-3 py-1 bg-red-200 text-red-700 rounded hover:bg-red-300 font-medium text-sm"
              >
                Sair
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setLocation('/login')}
              className="px-4 py-2 bg-blue-200 text-blue-700 rounded hover:bg-blue-300 font-medium"
            >
              Login
            </button>
            <button
              onClick={() => setLocation('/cadastro')}
              className="px-4 py-2 bg-green-200 text-green-700 rounded hover:bg-green-300 font-medium"
            >
              Cadastro
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
