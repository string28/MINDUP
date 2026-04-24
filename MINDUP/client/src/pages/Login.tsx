import { useState } from 'react';
import { useLocation } from 'wouter';
import '../styles.css';

export default function Login({ onLogin }: any) {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('maria.silva@cps.sp.gov.br');
  const [senha, setSenha] = useState('123456');
  const [etec, setEtec] = useState('266');
  const [erro, setErro] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setErro('');

    if (!email.endsWith('@cps.sp.gov.br')) {
      setErro('Email deve ser institucional (@cps.sp.gov.br)');
      return;
    }

    if (etec !== '266') {
      setErro('Código ETEC inválido!');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: any) => u.email === email && u.senha === senha);

    if (usuario) {
      onLogin(usuario);
      setLocation('/dashboard');
    } else {
      setErro('Email ou senha incorretos');
    }
  };

  return (
    <div className="content-wrapper" style={{ maxWidth: '450px' }}>
      <div className="card card-blue">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Login</h1>

        {erro && (
          <div style={{ backgroundColor: '#fee2e2', border: '2px solid #fca5a5', color: '#b91c1c', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Email Institucional</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="seu.nome@cps.sp.gov.br"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Código ETEC</label>
            <input
              type="text"
              value={etec}
              onChange={(e) => setEtec(e.target.value)}
              className="input"
              placeholder="266"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="input"
              placeholder="Sua senha"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Entrar no MindUp
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-muted text-sm">Ainda não tem uma conta?</p>
          <button
            onClick={() => setLocation('/cadastro')}
            className="btn btn-outline w-full mt-2"
          >
            Criar Conta Grátis
          </button>
        </div>
      </div>
    </div>
  );
}
