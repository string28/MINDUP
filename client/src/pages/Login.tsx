import { useState } from 'react';
import { useLocation } from 'wouter';

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
      setErro('Email deve ser @cps.sp.gov.br');
      return;
    }

    if (etec !== '266') {
      setErro('ETEC deve ser 266');
      return;
    }

    // Buscar usuário no localStorage
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
    <div className="max-w-md mx-auto mt-12 bg-white rounded-lg border-2 border-blue-300 p-8 shadow-lg">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Login</h1>

      {erro && (
        <div className="bg-red-100 border-2 border-red-300 text-red-700 p-3 rounded mb-4">
          {erro}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-blue-200 rounded focus:outline-none focus:border-blue-400"
            placeholder="seu@cps.sp.gov.br"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Etec</label>
          <input
            type="text"
            value={etec}
            onChange={(e) => setEtec(e.target.value)}
            className="w-full px-4 py-2 border-2 border-blue-200 rounded focus:outline-none focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-2 border-2 border-blue-200 rounded focus:outline-none focus:border-blue-400"
            placeholder="Sua senha"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-300 text-blue-800 rounded font-bold hover:bg-blue-400"
        >
          Entrar
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600 mb-2">Não tem conta?</p>
        <button
          onClick={() => setLocation('/cadastro')}
          className="text-blue-600 hover:underline font-bold"
        >
          Cadastre-se aqui
        </button>
      </div>

      {/* <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded p-4 text-sm text-gray-700">
        <strong>Teste:</strong>
        <br />
        Email: maria.silva@cps.sp.gov.br
        <br />
        Senha: 123456
      </div> */}
    </div>
  );
}
