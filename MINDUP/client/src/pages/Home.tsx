import { useLocation } from 'wouter';
import { TbMessageChatbotFilled } from "react-icons/tb";
import { FaCalendarPlus } from "react-icons/fa";
import { TiMortarBoard } from "react-icons/ti";
import { BsFillPersonFill } from "react-icons/bs";
import '../styles.css';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="content-wrapper">
      {/* Hero Section */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #dbeafe 0%, #dcfce7 100%)',
        padding: '4rem 2rem',
        textAlign: 'center',
        marginBottom: '3rem',
        border: 'none'
      }}>
        <h1 className="text-5xl font-bold text-blue-700 mb-4" style={{ letterSpacing: '-2px' }}>
          MindUp
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Sua jornada para o bem-estar começa aqui. Uma plataforma acolhedora para conectar estudantes a profissionais de saúde mental.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={() => setLocation('/cadastro')} className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
            Começar Agora
          </button>
          <button onClick={() => setLocation('/login')} className="btn btn-outline" style={{ padding: '1rem 2rem', background: 'white' }}>
            Fazer Login
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div className="card card-blue">
          <FaCalendarPlus size={32} color="var(--primary-blue)" className="mb-4" />
          <h3 className="text-xl font-bold text-blue-700 mb-2">Agendamentos</h3>
          <p className="text-gray-600">Marque suas sessões com psicólogos de forma simples e rápida, escolhendo o melhor horário para você.</p>
        </div>

        <div className="card card-green">
          <TbMessageChatbotFilled size={32} color="var(--primary-green)" className="mb-4" />
          <h3 className="text-xl font-bold text-green-700 mb-2">Comunidade</h3>
          <p className="text-gray-600">Participe de chats com outros alunos e profissionais em um ambiente seguro e acolhedor.</p>
        </div>

        <div className="card card-blue">
          <TiMortarBoard size={32} color="var(--primary-blue)" className="mb-4" />
          <h3 className="text-xl font-bold text-blue-700 mb-2">Horários</h3>
          <p className="text-gray-600">Acesse facilmente o cronograma de aulas da sua turma e organize sua rotina acadêmica.</p>
        </div>

        <div className="card card-green">
          <BsFillPersonFill size={32} color="var(--primary-green)" className="mb-4" />
          <h3 className="text-xl font-bold text-green-700 mb-2">Perfil Pessoal</h3>
          <p className="text-gray-600">Personalize seu perfil com foto, biografia e redes sociais para uma experiência mais humana.</p>
        </div>
      </div>

      {/* Footer-like section */}
      <div className="text-center mt-12 py-8 border-t-2 border-gray-100">
        <p className="text-muted">© 2026 MindUp - Saúde Mental na ETEC</p>
      </div>
    </div>
  );
}
