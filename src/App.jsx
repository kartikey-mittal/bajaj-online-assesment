import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchDoctors } from './services/api';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [specialties, setSpecialties] = useState([]);

  
  const searchQuery = searchParams.get('search') || '';
  const consultationMode = searchParams.get('mode') || '';
  const sortBy = searchParams.get('sort') || '';
  const selectedSpecialties = searchParams.getAll('specialty') || [];

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();
        setDoctors(data);
        
       
        const allSpecialties = new Set();
        data.forEach(doctor => {
          doctor.specialties.forEach(specialty => {
            allSpecialties.add(specialty);
          });
        });
        setSpecialties(Array.from(allSpecialties).sort());
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch doctors data');
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  
  useEffect(() => {
    if (doctors.length > 0) {
      let result = [...doctors];

      // Filter by search query
      if (searchQuery) {
        result = result.filter(doctor => 
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

     
      if (consultationMode) {
        if (consultationMode === 'video') {
          result = result.filter(doctor => doctor.consultationModes.includes('Video Consult'));
        } else if (consultationMode === 'clinic') {
          result = result.filter(doctor => doctor.consultationModes.includes('In Clinic'));
        }
      }

      if (selectedSpecialties.length > 0) {
        result = result.filter(doctor => 
          selectedSpecialties.some(specialty => doctor.specialties.includes(specialty))
        );
      }

      
      if (sortBy === 'fees') {
        result.sort((a, b) => a.fees - b.fees);
      } else if (sortBy === 'experience') {
        result.sort((a, b) => b.experience - a.experience);
      }

      setFilteredDoctors(result);
    }
  }, [doctors, searchQuery, consultationMode, selectedSpecialties, sortBy]);

  const updateFilters = (type, value) => {
    
    const newParams = new URLSearchParams(searchParams);
    
    if (type === 'search') {
      if (value) {
        newParams.set('search', value);
      } else {
        newParams.delete('search');
      }
    } else if (type === 'mode') {
      if (value) {
        newParams.set('mode', value);
      } else {
        newParams.delete('mode');
      }
    } else if (type === 'sort') {
      if (value) {
        newParams.set('sort', value);
      } else {
        newParams.delete('sort');
      }
    } else if (type === 'specialty') {
      
      const specialtiesInParams = newParams.getAll('specialty');
      
      if (specialtiesInParams.includes(value)) {
        
        newParams.delete('specialty');
        specialtiesInParams.filter(s => s !== value).forEach(s => newParams.append('specialty', s));
      } else {
        
        newParams.append('specialty', value);
      }
    } else if (type === 'clearAll') {
      newParams.delete('search');
      newParams.delete('mode');
      newParams.delete('sort');
      newParams.delete('specialty');
    }
    
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        doctors={doctors} 
        searchQuery={searchQuery} 
        updateFilters={updateFilters} 
      />
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6">
          
            <FilterPanel 
              specialties={specialties}
              selectedSpecialties={selectedSpecialties}
              consultationMode={consultationMode}
              sortBy={sortBy}
              updateFilters={updateFilters}
            />
         
          
          <div className="md:w-3/4 overflow-auto">
            <DoctorList 
              doctors={filteredDoctors}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;