const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export const fetchDoctors = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map(doctor => {
      // Extract numeric fee value by removing "₹" and converting to number
      const feeNumeric = parseInt(doctor.fees.replace(/[^\d]/g, ''), 10);
      
      // Extract numeric experience value
      const experienceNumeric = parseInt(doctor.experience.split(' ')[0], 10);

      // Extract qualifications from doctor_introduction
      const qualifications = doctor.doctor_introduction
        ? doctor.doctor_introduction.split(',')[1]?.trim() || ''
        : '';
      
      return {
        id: doctor.id,
        name: doctor.name,
        photo: doctor.photo,
        qualifications,
        specialties: doctor.specialities.map(s => s.name),
        experience: experienceNumeric,
        experienceText: doctor.experience,
        clinic: doctor.clinic.name,
        location: doctor.clinic.address.locality,
        fees: feeNumeric,
        feesText: doctor.fees,
        consultationModes: [
          ...(doctor.video_consult ? ['Video Consult'] : []),
          ...(doctor.in_clinic ? ['In Clinic'] : [])
        ]
      };
    });
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    throw error;
  }
};