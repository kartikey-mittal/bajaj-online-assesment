import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const FilterSection = ({ title, testId, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        data-testid={testId}
      >
        <h3 className="font-medium text-gray-900">{title}</h3>
        <span>{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
      </div>
      {isOpen && (
        <div className="mt-4 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

const FilterPanel = ({ 
  specialties,
  selectedSpecialties,
  consultationMode, 
  sortBy,
  updateFilters 
}) => {
  const [specialtySearch, setSpecialtySearch] = useState('');
  
  const handleSpecialtyChange = (specialty) => {
    updateFilters('specialty', specialty);
  };
  
  const handleModeChange = (mode) => {
    updateFilters('mode', mode);
  };
  
  const handleSortChange = (sort) => {
    updateFilters('sort', sort);
  };

  const handleClearAll = () => {
    updateFilters('clearAll');
    setSpecialtySearch('');
  };

  const getSpecialtyTestId = (specialty) => {
    return `filter-specialty-${specialty.replace(/[/\s]/g, '-')}`;
  };

  const filteredSpecialties = specialties.filter(specialty =>
    specialty.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  return (
    <div className="w-full md:w-1/4 space-y-4 md:sticky md:top-[88px]">
      {/* Sort by card */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Sort by</h2>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="sort"
              checked={sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="h-4 w-4 text-blue-600"
              data-testid="sort-fees"
            />
            <span className="text-sm text-gray-700">Price: Low-High</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="sort"
              checked={sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="h-4 w-4 text-blue-600"
              data-testid="sort-experience"
            />
            <span className="text-sm text-gray-700">Experience: Most Experience first</span>
          </label>
        </div>
      </div>

      {/* Filters card */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          <button 
            onClick={handleClearAll}
            className="text-blue-600 text-sm hover:text-blue-800"
          >
            Clear All
          </button>
        </div>

        <FilterSection 
  title="Specialities" 
  testId="filter-header-speciality"
>
  <div className="space-y-2 max-h-60 overflow-y-auto">
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('General Physician')} onChange={() => handleSpecialtyChange('General Physician')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-General-Physician" />
      <span className="text-sm text-gray-700">General Physician</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Dentist')} onChange={() => handleSpecialtyChange('Dentist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Dentist" />
      <span className="text-sm text-gray-700">Dentist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Dermatologist')} onChange={() => handleSpecialtyChange('Dermatologist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Dermatologist" />
      <span className="text-sm text-gray-700">Dermatologist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Paediatrician')} onChange={() => handleSpecialtyChange('Paediatrician')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Paediatrician" />
      <span className="text-sm text-gray-700">Paediatrician</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Gynaecologist')} onChange={() => handleSpecialtyChange('Gynaecologist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Gynaecologist" />
      <span className="text-sm text-gray-700">Gynaecologist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('ENT')} onChange={() => handleSpecialtyChange('ENT')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-ENT" />
      <span className="text-sm text-gray-700">ENT</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Diabetologist')} onChange={() => handleSpecialtyChange('Diabetologist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Diabetologist" />
      <span className="text-sm text-gray-700">Diabetologist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Cardiologist')} onChange={() => handleSpecialtyChange('Cardiologist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Cardiologist" />
      <span className="text-sm text-gray-700">Cardiologist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Physiotherapist')} onChange={() => handleSpecialtyChange('Physiotherapist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Physiotherapist" />
      <span className="text-sm text-gray-700">Physiotherapist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Endocrinologist')} onChange={() => handleSpecialtyChange('Endocrinologist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Endocrinologist" />
      <span className="text-sm text-gray-700">Endocrinologist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Orthopaedic')} onChange={() => handleSpecialtyChange('Orthopaedic')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Orthopaedic" />
      <span className="text-sm text-gray-700">Orthopaedic</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Ophthalmologist')} onChange={() => handleSpecialtyChange('Ophthalmologist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Ophthalmologist" />
      <span className="text-sm text-gray-700">Ophthalmologist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Gastroenterologist')} onChange={() => handleSpecialtyChange('Gastroenterologist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Gastroenterologist" />
      <span className="text-sm text-gray-700">Gastroenterologist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Pulmonologist')} onChange={() => handleSpecialtyChange('Pulmonologist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Pulmonologist" />
      <span className="text-sm text-gray-700">Pulmonologist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Psychiatrist')} onChange={() => handleSpecialtyChange('Psychiatrist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Psychiatrist" />
      <span className="text-sm text-gray-700">Psychiatrist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Urologist')} onChange={() => handleSpecialtyChange('Urologist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Urologist" />
      <span className="text-sm text-gray-700">Urologist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Dietitian/Nutritionist')} onChange={() => handleSpecialtyChange('Dietitian/Nutritionist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Dietitian-Nutritionist" />
      <span className="text-sm text-gray-700">Dietitian/Nutritionist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Psychologist')} onChange={() => handleSpecialtyChange('Psychologist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Psychologist" />
      <span className="text-sm text-gray-700">Psychologist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Sexologist')} onChange={() => handleSpecialtyChange('Sexologist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Sexologist" />
      <span className="text-sm text-gray-700">Sexologist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Nephrologist')} onChange={() => handleSpecialtyChange('Nephrologist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Nephrologist" />
      <span className="text-sm text-gray-700">Nephrologist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Neurologist')} onChange={() => handleSpecialtyChange('Neurologist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Neurologist" />
      <span className="text-sm text-gray-700">Neurologist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Oncologist')} onChange={() => handleSpecialtyChange('Oncologist')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Oncologist" />
      <span className="text-sm text-gray-700">Oncologist</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Ayurveda')} onChange={() => handleSpecialtyChange('Ayurveda')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Ayurveda" />
      <span className="text-sm text-gray-700">Ayurveda</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" checked={selectedSpecialties.includes('Homeopath')} onChange={() => handleSpecialtyChange('Homeopath')} className="h-4 w-4 text-blue-600 rounded" data-testid="filter-specialty-Homeopath" />
      <span className="text-sm text-gray-700">Homeopath</span>
    </label>
  </div>
</FilterSection>


        <FilterSection 
          title="Mode of consultation" 
          testId="filter-header-moc"
        >
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="consultationMode"
                checked={consultationMode === 'video'}
                onChange={() => handleModeChange('video')}
                className="h-4 w-4 text-blue-600"
                data-testid="filter-video-consult"
              />
              <span className="text-sm text-gray-700">Video Consultation</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="consultationMode"
                checked={consultationMode === 'clinic'}
                onChange={() => handleModeChange('clinic')}
                className="h-4 w-4 text-blue-600"
                data-testid="filter-in-clinic"
              />
              <span className="text-sm text-gray-700">In Clinic</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="consultationMode"
                checked={consultationMode === ''}
                onChange={() => handleModeChange('')}
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">All</span>
            </label>
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default FilterPanel;