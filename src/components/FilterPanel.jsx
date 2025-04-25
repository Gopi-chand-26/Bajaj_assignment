import './FilterPanel.css';

const specialties = [
  'General Physician', 'Dentist', 'Dermatologist', 'Paediatrician', 'Gynaecologist',
  'ENT', 'Diabetologist', 'Cardiologist', 'Physiotherapist', 'Endocrinologist',
  'Orthopaedic', 'Ophthalmologist', 'Gastroenterologist', 'Pulmonologist', 'Psychiatrist',
  'Urologist', 'Dietitian-Nutritionist', 'Psychologist', 'Sexologist', 'Nephrologist',
  'Neurologist', 'Oncologist', 'Ayurveda', 'Homeopath'
];

const FilterPanel = ({ searchParams, setSearchParams }) => {
  const handleConsultTypeChange = (type) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('consultType', type);
    setSearchParams(newParams);
  };

  const handleSpecialtyChange = (specialty) => {
    const newParams = new URLSearchParams(searchParams);
    const currentSpecialties = newParams.getAll('specialty');
    
    if (currentSpecialties.includes(specialty)) {
      const filtered = currentSpecialties.filter(s => s !== specialty);
      newParams.delete('specialty');
      filtered.forEach(s => newParams.append('specialty', s));
    } else {
      newParams.append('specialty', specialty);
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (sortBy) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sortBy', sortBy);
    setSearchParams(newParams);
  };

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3 data-testid="filter-header-moc">Mode of Consultation</h3>
        <div>
          <label>
            <input
              type="radio"
              data-testid="filter-video-consult"
              name="consultType"
              checked={searchParams.get('consultType') === 'video'}
              onChange={() => handleConsultTypeChange('video')}
            />
            Video Consultation
          </label>
          <label>
            <input
              type="radio"
              data-testid="filter-in-clinic"
              name="consultType"
              checked={searchParams.get('consultType') === 'clinic'}
              onChange={() => handleConsultTypeChange('clinic')}
            />
            In-clinic Consultation
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h3 data-testid="filter-header-speciality">Specialities</h3>
        <div className="specialties-list">
          {specialties.map(specialty => (
            <label key={specialty}>
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty}`}
                checked={searchParams.getAll('specialty').includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
              />
              {specialty}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 data-testid="filter-header-sort">Sort By</h3>
        <div>
          <label>
            <input
              type="radio"
              data-testid="sort-fees"
              name="sortBy"
              checked={searchParams.get('sortBy') === 'fees'}
              onChange={() => handleSortChange('fees')}
            />
            Fees (Low to High)
          </label>
          <label>
            <input
              type="radio"
              data-testid="sort-experience"
              name="sortBy"
              checked={searchParams.get('sortBy') === 'experience'}
              onChange={() => handleSortChange('experience')}
            />
            Experience (High to Low)
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;