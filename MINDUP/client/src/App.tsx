import { useState, useEffect } from 'react';
import { Route, Switch } from 'wouter';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import Agendamentos from './pages/Agendamentos';
import Chats from './pages/Chats';
import Aulas from './pages/Aulas';
import Perfil from './pages/Perfil';
import Header from './components/Header';
import './styles.css';

export default function App() {
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  const handleLogin = (usuarioData: any) => {
    setUsuario(usuarioData);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioData));
  };

  const handleLogout = () => {
    setUsuario(null);
    localStorage.removeItem('usuarioLogado');
  };

  return (
    <div className="app-container">
      <Header usuario={usuario} onLogout={handleLogout} />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={() => <Login onLogin={handleLogin} />} />
        <Route path="/cadastro" component={() => <Cadastro onCadastro={handleLogin} />} />
        <Route path="/dashboard" component={() => usuario ? <Dashboard usuario={usuario} /> : <Home />} />
        <Route path="/agendamentos" component={() => usuario ? <Agendamentos usuario={usuario} /> : <Home />} />
        <Route path="/chats" component={() => usuario ? <Chats usuario={usuario} /> : <Home />} />
        <Route path="/aulas" component={() => usuario ? <Aulas usuario={usuario} /> : <Home />} />
        <Route path="/perfil" component={() => usuario ? <Perfil usuario={usuario} onUpdate={handleLogin} /> : <Home />} />
      </Switch>
    </div>
  );
}
