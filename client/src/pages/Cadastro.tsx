import { useState } from 'react';
import { useLocation } from 'wouter';

const SALAS = [ '1DS', '2DS', '3DS', '1JOD', '2JOD', '3JOD','1MAD', '2MAD', '3MAD','1MDI', '2MDI', '3MDI'];

export default function Cadastro({ onCadastro }: any) {
  const [, setLocation] = useLocation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [etec, setEtec] = useState('266');
  const [sala, setSala] = useState('2DS');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setErro('');

    if (!email.endsWith('@cps.sp.gov.br')) {
      setErro('Email deve ser @cps.sp.gov.br');
      return;
    }

    if (etec !== '266') {
      setErro('Código inválido!');
      return;
    }

    if (senha !== confirmaSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    if (senha.length < 6) {
      setErro('Senha deve ter 6+ caracteres');
      return;
    }

   
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuarios.some((u: any) => u.email === email)) {
      setErro('Email já cadastrado.');
      return;
    }


    const novoUsuario = {
      id: Date.now(),
      nome,
      email,
      etec,
      sala,
      senha,
      dataCadastro: new Date().toISOString()
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    onCadastro(novoUsuario);
    setLocation('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-lg border-2 border-green-300 p-8 shadow-lg">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">Cadastro</h1>

      {erro && (
        <div className="bg-red-100 border-2 border-red-300 text-red-700 p-3 rounded mb-4">
          {erro}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-400"
            placeholder="Seu nome completo"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-400"
            placeholder="seu@cps.sp.gov.br"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Etec</label>
            <input
              type="text"
              value={etec}
              onChange={(e) => setEtec(e.target.value)}
              className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-400"
              placeholder="266"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Sala</label>
            <select
              value={sala}
              onChange={(e) => setSala(e.target.value)}
              className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-400"
            >
              {SALAS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-400"
            placeholder="Mínimo 6 caracteres"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Confirmar Senha</label>
          <input
            type="password"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-400"
            placeholder="Confirme sua senha"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-300 text-green-800 rounded font-bold hover:bg-green-400"
        >
          Cadastrar
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600 mb-2">Já tem conta?</p>
        <button
          onClick={() => setLocation('/login')}
          className="text-green-600 hover:underline font-bold"
        >
          Faça login aqui
        </button>
      </div>
    </div>
  );
}
