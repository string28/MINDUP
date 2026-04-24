import { useState } from 'react';

export default function Perfil({ usuario, onUpdate }: any) {
  const [telefone, setTelefone] = useState(usuario.telefone || '');
  const [instagram, setInstagram] = useState(usuario.instagram || '');
  const [twitter, setTwitter] = useState(usuario.twitter || '');
  const [linkedin, setLinkedin] = useState(usuario.linkedin || '');
  const [github, setGithub] = useState(usuario.github || '');
  const [biografia, setBiografia] = useState(usuario.biografia || '');

  const handleSalvar = (e: any) => {
    e.preventDefault();

    const usuarioAtualizado = {
      ...usuario,
      telefone,
      instagram,
      twitter,
      linkedin,
      github,
      biografia
    };

    // Atualizar no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const index = usuarios.findIndex((u: any) => u.id === usuario.id);
    if (index !== -1) {
      usuarios[index] = usuarioAtualizado;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    onUpdate(usuarioAtualizado);
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Meu Perfil</h1>

      <div className="space-y-8">
       
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Informações Pessoais</h2>

          <div className="space-y-4">
            <div className="bg-white border-2 border-blue-200 rounded p-4">
              <p className="text-xs text-gray-500 font-bold uppercase">Nome</p>
              <p className="text-lg font-bold text-gray-800">{usuario.nome}</p>
            </div>

            <div className="bg-white border-2 border-blue-200 rounded p-4">
              <p className="text-xs text-gray-500 font-bold uppercase">Email</p>
              <p className="text-lg font-bold text-gray-800">{usuario.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border-2 border-blue-200 rounded p-4">
                <p className="text-xs text-gray-500 font-bold uppercase">ETEC</p>
                <p className="text-lg font-bold text-gray-800">{usuario.etec}</p>
              </div>
              <div className="bg-white border-2 border-blue-200 rounded p-4">
                <p className="text-xs text-gray-500 font-bold uppercase">Sala</p>
                <p className="text-lg font-bold text-gray-800">{usuario.sala}</p>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-6">Editar Perfil</h2>

          <form onSubmit={handleSalvar} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Telefone</label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-400"
                placeholder="(11) 98765-4321"
              />
            </div>

            <div className="border-t-2 border-green-300 pt-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Redes Sociais</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Instagram</label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-400"
                    placeholder="@seu_usuario"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">Twitter</label>
                  <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-400"
                    placeholder="@seu_usuario"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">LinkedIn</label>
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-400"
                    placeholder="seu_usuario"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">GitHub</label>
                  <input
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-400"
                    placeholder="seu_usuario"
                  />
                </div>
              </div>
            </div>

            <div className="border-t-2 border-green-300 pt-4">
              <label className="block text-gray-700 font-bold mb-2">Biografia</label>
              <textarea
                value={biografia}
                onChange={(e) => setBiografia(e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-200 rounded focus:outline-none focus:border-green-400"
                placeholder="Conte um pouco sobre você..."
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-300 text-green-800 rounded font-bold hover:bg-green-400"
            >
              Salvar Alterações
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
