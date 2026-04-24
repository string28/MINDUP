import { useState } from 'react';
import '../styles.css';

export default function Perfil({ usuario, onUpdate }: any) {
  const [editando, setEditando] = useState(false);
  const [foto, setFoto] = useState(usuario.foto || '');
  const [telefone, setTelefone] = useState(usuario.telefone || '');
  const [instagram, setInstagram] = useState(usuario.instagram || '');
  const [twitter, setTwitter] = useState(usuario.twitter || '');
  const [linkedin] = useState(usuario.linkedin || '');
  const [github] = useState(usuario.github || '');
  const [biografia, setBiografia] = useState(usuario.biografia || '');

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSalvar = (e: any) => {
    e.preventDefault();

    const usuarioAtualizado = {
      ...usuario,
      foto,
      telefone,
      instagram,
      twitter,
      linkedin,
      github,
      biografia
    };

    // Atualizar no localStorage (lista de usuários)
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const index = usuarios.findIndex((u: any) => u.id === usuario.id);
    if (index !== -1) {
      usuarios[index] = usuarioAtualizado;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    onUpdate(usuarioAtualizado);
    setEditando(false);
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <div className="content-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="text-4xl font-bold">Meu Perfil</h1>
        {!editando && (
          <button className="btn btn-primary" onClick={() => setEditando(true)}>
            Editar Perfil
          </button>
        )}
      </div>

      <div className="grid-2">
        {/* Visualização do Perfil */}
        <div className="card card-blue">
          <div className="profile-photo-container">
            {foto ? (
              <img src={foto} alt="Perfil" className="profile-photo" />
            ) : (
              <div className="profile-photo">👤</div>
            )}
            <h2 className="text-2xl font-bold">{usuario.nome}</h2>
            <p className="text-muted">{usuario.email}</p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-white rounded border-blue-200 border-2">
              <p className="text-xs font-bold text-gray-600 uppercase">Instituição</p>
              <p className="font-bold">{usuario.etec} - Sala {usuario.sala}</p>
            </div>
            {telefone && (
              <div className="p-3 bg-white rounded border-blue-200 border-2">
                <p className="text-xs font-bold text-gray-600 uppercase">Telefone</p>
                <p className="font-bold">{telefone}</p>
              </div>
            )}
            {biografia && (
              <div className="p-3 bg-white rounded border-blue-200 border-2">
                <p className="text-xs font-bold text-gray-600 uppercase">Sobre mim</p>
                <p>{biografia}</p>
              </div>
            )}
          </div>

          {(instagram || twitter || linkedin || github) && (
            <div style={{ marginTop: '1.5rem' }}>
              <h3 className="font-bold mb-2">Redes Sociais</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {instagram && <span className="p-2 bg-blue-100 rounded text-sm">Instagram: {instagram}</span>}
                {twitter && <span className="p-2 bg-blue-100 rounded text-sm">Twitter: {twitter}</span>}
                {linkedin && <span className="p-2 bg-blue-100 rounded text-sm">LinkedIn: {linkedin}</span>}
                {github && <span className="p-2 bg-blue-100 rounded text-sm">GitHub: {github}</span>}
              </div>
            </div>
          )}
        </div>

        {/* Formulário de Edição (Condicional) */}
        {editando ? (
          <div className="card card-green">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Editar Informações</h2>
            <form onSubmit={handleSalvar}>
              <div className="form-group">
                <label className="label">Foto de Perfil</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="input" />
              </div>

              <div className="form-group">
                <label className="label">Telefone</label>
                <input
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="input"
                  placeholder="(11) 98765-4321"
                />
              </div>

              <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="label">Instagram</label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="input"
                    placeholder="@usuario"
                  />
                </div>
                <div className="form-group">
                  <label className="label">Twitter</label>
                  <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="input"
                    placeholder="@usuario"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Biografia</label>
                <textarea
                  value={biografia}
                  onChange={(e) => setBiografia(e.target.value)}
                  className="textarea"
                  rows={4}
                  placeholder="Conte um pouco sobre você..."
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-success" style={{ flex: 1 }}>
                  Salvar Alterações
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setEditando(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderStyle: 'dashed', borderColor: '#d1d5db' }}>
            <div>
              <p className="text-muted mb-4">Deseja atualizar suas informações ou adicionar uma foto?</p>
              <button className="btn btn-outline" onClick={() => setEditando(true)}>
                Começar Edição
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
