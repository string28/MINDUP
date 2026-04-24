import { useLocation } from 'wouter';

export default function Dashboard({ usuario }: any) {
  const [, setLocation] = useLocation();

  const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
  const mensagens = JSON.parse(localStorage.getItem('mensagens') || '[]');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Bem-vindo, {usuario.nome}!</h1>
      <p className="text-gray-600 mb-8">Sala: <strong className="text-blue-600">{usuario.sala}</strong></p>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <button
          onClick={() => setLocation('/agendamentos')}
          className="bg-blue-100 border-2 border-blue-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-2xl font-bold text-blue-600 mb-2"> </h3>
          <p className="text-lg font-bold text-blue-700">{agendamentos.length}</p>
          <p className="text-sm text-gray-700">Agendamentos</p>
        </button>

        <button
          onClick={() => setLocation('/chats')}
          className="bg-green-100 border-2 border-green-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-2xl font-bold text-green-600 mb-2"></h3>
          <p className="text-lg font-bold text-green-700">{mensagens.length}</p>
          <p className="text-sm text-gray-700">Mensagens</p>
        </button>

        <button
          onClick={() => setLocation('/aulas')}
          className="bg-blue-100 border-2 border-blue-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-2xl font-bold text-blue-600 mb-2"> </h3>
          <p className="text-sm text-gray-700">Veja seu horário</p>
        </button>

        <button
          onClick={() => setLocation('/perfil')}
          className="bg-green-100 border-2 border-green-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-2xl font-bold text-green-600 mb-2"> </h3>
          <p className="text-sm text-gray-700">Editar perfil</p>
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Próxima Sessão */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Próxima Sessão</h2>
          {agendamentos.length > 0 ? (
            <div className="space-y-3">
              {agendamentos.slice(0, 1).map((agende: any) => (
                <div key={agende.id} className="bg-white border-2 border-blue-200 rounded p-4">
                  <p className="font-bold text-gray-800">{agende.profissional}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(agende.data).toLocaleDateString('pt-BR')} às {agende.horario}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nenhuma sessão agendada</p>
          )}
        </div>

        {/* Últimas Mensagens */}
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Comunidade</h2>
          {mensagens.length > 0 ? (
            <div className="space-y-3">
              {mensagens.slice(-3).reverse().map((msg: any) => (
                <div key={msg.id} className="bg-white border-2 border-green-200 rounded p-4">
                  <p className="font-bold text-gray-800 text-sm">
                    {msg.usuario}
                    <span className="ml-2 text-xs bg-green-200 px-2 py-1 rounded">{msg.sala}</span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">{msg.texto}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nenhuma mensagem</p>
          )}
        </div>
      </div>
    </div>
  );
}
