import { useState } from 'react';
import { useLocation } from 'wouter';
import '../styles.css';

const SALAS = ['1DS', '2DS', '3DS', '1JOD', '2JOD', '3JOD', '1MAD', '2MAD', '3MAD', '1MDI', '2MDI', '3MDI'];

export default function Cadastro({ onCadastro }: any) {
  const [, setLocation] = useLocation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [etec, setEtec] = useState('');
  const [sala, setSala] = useState('1DS');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setErro('');

    if (!email.endsWith('@cps.sp.gov.br')) {
      setErro('Use o email institucional (@cps.sp.gov.br).');
      return;
    }

    if (etec !== '266') {
      setErro('Código ETEC inválido!');
      return;
    }

    if (senha !== confirmaSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuarios.some((u: any) => u.email === email)) {
      setErro('Este email já está cadastrado.');
      return;
    }

    const novoUsuario = {
      id: Date.now(),
      nome,
      email,
      etec,
      sala,
      senha,
      foto: '', // Inicialmente sem foto
      dataCadastro: new Date().toISOString()
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    onCadastro(novoUsuario);
    setLocation('/dashboard');
  };

  return (
    <div className="content-wrapper" style={{ maxWidth: '500px' }}>
      <div className="card card-green">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-800">Criar Conta</h1>

        {erro && (
          <div style={{ backgroundColor: '#fee2e2', border: '2px solid #fca5a5', color: '#b91c1c', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Nome Completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="input"
              placeholder="Ex: Maria Silva"
              required
            />
          </div>

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

          <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
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
              <label className="label">Sua Sala</label>
              <select
                value={sala}
                onChange={(e) => setSala(e.target.value)}
                className="input"
                style={{ appearance: 'auto' }}
              >
                {SALAS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="label">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="input"
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Confirmar Senha</label>
            <input
              type="password"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
              className="input"
              placeholder="Repita sua senha"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-full mt-4">
            Finalizar Cadastro
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-muted text-sm">Já possui uma conta?</p>
          <button
            onClick={() => setLocation('/login')}
            className="btn btn-outline w-full mt-2"
          >
            Fazer Login
          </button>
        </div>
      </div>
    </div>
  );
}
