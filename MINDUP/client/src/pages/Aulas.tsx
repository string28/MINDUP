export default function Aulas({ usuario }: any) {
   const aulas = [
 
  { dia: 'Segunda', horario: '08:00 - 08:50', materia: 'EAMT', professor: 'Elza' },
  { dia: 'Segunda', horario: '08:50 - 09:40', materia: 'EAMT', professor: 'Elza' },
  { dia: 'Segunda', horario: '10:00 - 10:50', materia: 'SE', professor: 'Iury / Vanessa' },
  { dia: 'Segunda', horario: '10:50 - 11:40', materia: 'SE', professor: 'Iury / Vanessa' },
  { dia: 'Segunda', horario: '11:40 - 12:30', materia: 'SOC', professor: 'Elza' },
  { dia: 'Segunda', horario: '13:30 - 14:20', materia: 'SOC', professor: 'Elza' },
  { dia: 'Segunda', horario: '14:20 - 15:10', materia: 'FILO', professor: 'Elza' },

 
  { dia: 'Terça', horario: '08:00 - 08:50', materia: 'EACNT', professor: 'Elza' },
  { dia: 'Terça', horario: '08:50 - 09:40', materia: 'PW II', professor: 'Paulo' },
  { dia: 'Terça', horario: '10:00 - 10:50', materia: 'EACNT', professor: 'Elza' },
  { dia: 'Terça', horario: '10:50 - 11:40', materia: 'EACNT', professor: 'Elza' },
  { dia: 'Terça', horario: '13:30 - 14:20', materia: 'PDTCC', professor: 'Elisangela / Veridiane' },
  { dia: 'Terça', horario: '14:20 - 15:10', materia: 'EAMT', professor: 'Elza' },
  { dia: 'Terça', horario: '15:10 - 16:00', materia: 'MAT', professor: 'William B' },


  { dia: 'Quarta', horario: '08:00 - 08:50', materia: 'PAM II', professor: 'Paulo' },
  { dia: 'Quarta', horario: '08:50 - 09:40', materia: 'PAM II', professor: 'Paulo' },
  { dia: 'Quarta', horario: '10:00 - 10:50', materia: 'IPSSI', professor: 'Iury / Vanessa' },
  { dia: 'Quarta', horario: '10:50 - 11:40', materia: 'IPSSI', professor: 'Iury / Vanessa' },
  { dia: 'Quarta', horario: '11:40 - 12:30', materia: 'ING', professor: 'Patricia' },
  { dia: 'Quarta', horario: '13:30 - 14:20', materia: 'MAT', professor: 'William B' },
  { dia: 'Quarta', horario: '14:20 - 15:10', materia: 'MAT', professor: 'William B' },

  
  { dia: 'Quinta', horario: '08:00 - 08:50', materia: 'PORT', professor: 'Fidelis' },
  { dia: 'Quinta', horario: '08:50 - 09:40', materia: 'PORT', professor: 'Fidelis' },
  { dia: 'Quinta', horario: '10:00 - 10:50', materia: 'POTCC', professor: 'Elisangela / Veridiane' },
  { dia: 'Quinta', horario: '10:50 - 11:40', materia: 'POTCC', professor: 'Elisangela / Veridiane' },
  { dia: 'Quinta', horario: '13:30 - 14:20', materia: 'MAT', professor: 'William B' },
  { dia: 'Quinta', horario: '14:20 - 15:10', materia: 'BIO', professor: 'Andreia' },
  { dia: 'Quinta', horario: '15:10 - 16:00', materia: 'BIO', professor: 'Andreia' },

 
  { dia: 'Sexta', horario: '08:00 - 08:50', materia: 'GEO', professor: 'Valdeci' },
  { dia: 'Sexta', horario: '08:00 - 08:50', materia: 'GEO', professor: 'Valdeci' },
  { dia: 'Sexta', horario: '08:00 - 08:50', materia: 'QTS', professor: 'Iury / Vanessa' },
  { dia: 'Sexta', horario: '08:50 - 09:40', materia: 'QTS', professor: 'Iury / Vanessa' },
  { dia: 'Sexta', horario: '10:00 - 10:50', materia: 'PORT', professor: 'Fidelis' },
  ].filter(a => a.dia);

  const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
//CSS
   const containerStyle = {
    maxWidth: '72rem',
    margin: '0 auto',
    padding: '3rem 1rem'
  };

  const titleStyle = {
    fontSize: '2.25rem',
    fontWeight: 'bold' as const,
    color: '#4c1d95',
    marginBottom: '0.5rem'
  };

  const salaStyle = {
    color: '#6b7280',
    marginBottom: '2rem'
  };

  const salaBoldStyle = {
    fontWeight: 'bold' as const,
    color: '#7c3aed'
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem'
  };

  const dayCardStyle = {
    backgroundColor: '#ffffff',
    border: '2px solid #c4b5fd',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.08)'
  };

  const dayHeaderStyle = {
    backgroundColor: '#ddd6fe',
    borderBottom: '2px solid #c4b5fd',
    padding: '0.75rem 1.5rem'
  };

  const dayTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold' as const,
    color: '#6d28d9'
  };

  const dayContentStyle = {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem'
  };

  const classItemStyle = {
    backgroundColor: '#f5f3ff',
    border: '2px solid #ddd6fe',
    borderRadius: '0.5rem',
    padding: '1rem'
  };

  const classGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem'
  };

  const classFieldLabelStyle = {
    fontSize: '0.75rem',
    color: '#6b7280',
    fontWeight: 'bold' as const,
    textTransform: 'uppercase' as const
  };

  const classFieldValueStyle = {
    fontSize: '1.125rem',
    fontWeight: 'bold' as const,
    color: '#6d28d9'
  };

  const classFieldValueGrayStyle = {
    fontSize: '1.125rem',
    fontWeight: 'bold' as const,
    color: '#1f2937'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Horário de Aulas</h1>
      <p style={salaStyle}>
        Sala: <span style={salaBoldStyle}>{usuario.sala}</span>
      </p>

      <div style={contentStyle}>
        {diasSemana.map(dia => {
          const aulasDia = aulas.filter(a => a.dia === dia);
          if (aulasDia.length === 0) return null;

          return (
            <div key={dia} style={dayCardStyle}>
              <div style={dayHeaderStyle}>
                <h2 style={dayTitleStyle}>{dia}</h2>
              </div>
              <div style={dayContentStyle}>
                {aulasDia.map((aula, idx) => (
                  <div key={idx} style={classItemStyle}>
                    <div style={classGridStyle}>
                      <div>
                        <p style={classFieldLabelStyle}>Horário</p>
                        <p style={classFieldValueStyle}>{aula.horario}</p>
                      </div>
                      <div>
                        <p style={classFieldLabelStyle}>Matéria</p>
                        <p style={classFieldValueGrayStyle}>{aula.materia}</p>
                      </div>
                      <div>
                        <p style={classFieldLabelStyle}>Professor</p>
                        <p style={classFieldValueGrayStyle}>{aula.professor}</p>
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
