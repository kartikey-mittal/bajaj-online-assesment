import DoctorCard from './DoctorCard';
import { Loader } from 'lucide-react';

const DoctorList = ({ doctors, loading, error }) => {
  if (loading) {
    return (
      <div className="w-full md:w-3/4 flex justify-center items-center min-h-[300px]">
        <div className="flex flex-col items-center">
          <Loader className="h-8 w-8 text-blue-600 animate-spin" />
          <p className="mt-2 text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full md:w-3/4 flex justify-center items-center min-h-[300px]">
        <div className="bg-red-50 p-4 rounded-md text-red-700">
          <p>{error}</p>
          <p className="mt-2 text-sm">Please try again later.</p>
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="w-full md:w-3/4 flex justify-center items-center min-h-[300px]">
        <div className="text-center">
          <p className="text-gray-700 text-lg">No doctors found</p>
          <p className="text-gray-500 mt-1">Try adjusting your filters or search criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-3/4">
      <div className="mb-4">
        {/* <h2 className="text-lg font-medium text-gray-900">
          {doctors.length} {doctors.length === 1 ? 'Doctor' : 'Doctors'} available
        </h2> */}
      </div>
      <div className="space-y-4">
        {doctors.map(doctor => (
          <DoctorCard 
            key={doctor.id} 
            doctor={doctor} 
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;