export default function Aulas({ usuario }: any) {
  const aulas = [
    { dia: 'Segunda', horario: '', materia: ' ', professor: ''},
    { dia: 'Terça', horario: '', materia: '  ', professor: ''},
    { dia: 'Quarta', horario: '', materia: '', professor: '' },
    { dia: 'Quinta', horario: '', materia: '', professor: ''},
    { dia: 'Sexta', horario: '', materia: '', professor: '' }
  ].filter(a => a.dia); 

  const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Horário de Aulas</h1>
      <p className="text-gray-600 mb-8">Sala: <strong className="text-blue-600">{usuario.sala}</strong></p>

      <div className="space-y-6">
        {diasSemana.map(dia => {
          const aulasDia = aulas.filter(a => a.dia === dia);
          if (aulasDia.length === 0) return null;

          return (
            <div key={dia} className="bg-white border-2 border-green-300 rounded-lg overflow-hidden">
              <div className="bg-green-200 border-b-2 border-green-300 px-6 py-3">
                <h2 className="text-xl font-bold text-green-700">{dia}</h2>
              </div>
              <div className="p-6 space-y-3">
                {aulasDia.map((aula, idx) => (
                  <div key={idx} className="bg-green-50 border-2 border-green-200 rounded p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Horário</p>
                        <p className="text-lg font-bold text-green-600">{aula.horario}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Matéria</p>
                        <p className="font-bold text-gray-800">{aula.materia}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Professor</p>
                        <p className="font-bold text-gray-800">{aula.professor}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
