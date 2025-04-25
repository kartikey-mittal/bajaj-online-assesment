import { MapPin, Building } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm border p-4 mb-4"
      data-testid="doctor-card"
    >
      <div className="flex items-start gap-4">
        
        <div className="w-[5.1rem] h-[5.1rem] rounded-full overflow-hidden flex-shrink-0">
          {doctor.photo ? (
            <img 
              src={doctor.photo} 
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium">
              {doctor.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>

        
        <div className="flex-grow">
          <div className="flex justify-between items-start flex-wrap">
            <div className="space-y-0.5">
              <h3 className="font-semibold text-gray-900 text-base" data-testid="doctor-name">
                {doctor.name}
              </h3>
              <p className="text-sm text-gray-700" data-testid="doctor-specialty">
                {doctor.specialties[0]}
              </p>
              <p className="text-sm text-gray-500">
                {doctor.qualifications}
              </p>
              <p className="text-sm text-gray-900 font-medium mt-1" data-testid="doctor-experience">
                {doctor.experienceText}
              </p>
            </div>

            <div className="text-right mt-2 md:mt-0 min-w-[70px]">
              <p style={{marginTop:'35px',fontSize:"1.25rem"}}className="text-sm font-semibold text-gray-900" data-testid="doctor-fee">
                {doctor.feesText}
              </p>
            </div>
          </div>

         
          <div className="mt-3 space-y-1">
            <div className="flex items-center text-sm text-gray-700">
              <Building size={16} className="mr-2 text-gray-500" />
              <span>{doctor.clinic}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <MapPin size={16} className="mr-2 text-gray-500" />
              <span>{doctor.location}</span>
            </div>
          </div>

         
          <div className="mt-4 flex justify-end">
            <button style={{color:"#045da5",paddingLeft:'25px',paddingRight:"25px"}} className="border border-[#045da5] text-blue-600 text-sm font-medium px-4 py-1.5 rounded-md hover:bg-blue-50 transition-colors">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
