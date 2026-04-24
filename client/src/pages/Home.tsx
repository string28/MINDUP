import { useLocation } from 'wouter';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-12 text-center mb-12">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">Bem-vindo ao MindUp</h1>
        <p className="text-xl text-gray-700 mb-8">
          Uma plataforma para agendamento de sessões de terapia. Cuide da sua saúde mental!
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setLocation('/login')}
            className="px-6 py-3 bg-blue-300 text-blue-800 rounded-lg font-bold hover:bg-blue-400"
          >
            Fazer Login
          </button>
          <button
            onClick={() => setLocation('/cadastro')}
            className="px-6 py-3 bg-green-300 text-green-800 rounded-lg font-bold hover:bg-green-400"
          >
            Cadastrar-se
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 rounded-lg p-6 border-2 border-blue-300">
          <h3 className="text-xl font-bold text-blue-700 mb-2"> Agendamentos</h3>
          <p className="text-gray-700">Agende suas sessões de terapia com facilidade</p>
        </div>
        <div className="bg-green-100 rounded-lg p-6 border-2 border-green-300">
          <h3 className="text-xl font-bold text-green-700 mb-2"> Chats</h3>
          <p className="text-gray-700">Comunique-se com profissionais e colegas</p>
        </div>
        <div className="bg-blue-100 rounded-lg p-6 border-2 border-blue-300">
          <h3 className="text-xl font-bold text-blue-700 mb-2"> Aulas</h3>
          <p className="text-gray-700">Veja o horário de aulas da sua turma</p>
        </div>
        <div className="bg-green-100 rounded-lg p-6 border-2 border-green-300">
          <h3 className="text-xl font-bold text-green-700 mb-2"> Perfil</h3>
          <p className="text-gray-700">Edite suas informações pessoais</p>
        </div>
      </div>
    </div>
  );
}
