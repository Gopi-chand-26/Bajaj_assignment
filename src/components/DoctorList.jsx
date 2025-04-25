import { useState } from 'react';
import './DoctorList.css';

const DoctorList = ({ doctors }) => {
  const [bookedDoctors, setBookedDoctors] = useState(new Set());

  if (!doctors || doctors.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-content">
          <span className="no-results-icon">🔍</span>
          <h3>No doctors found</h3>
          <p>Try adjusting your filters or search criteria</p>
        </div>
      </div>
    );
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="doctor-list">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="doctor-card">
          <div className="doctor-header">
            {doctor.photo ? (
              <img 
                src={doctor.photo}
                alt={doctor.name}
                className="doctor-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className="doctor-initials"
              style={{ display: doctor.photo ? 'none' : 'flex' }}
            >
              {getInitials(doctor.name)}
            </div>
            <div className="doctor-basic-info">
              <h2 data-testid="doctor-name">{doctor.name}</h2>
              <p className="specialty">{doctor.specialities.map(s => s.name).join(', ')}</p>
              <p className="qualifications">{doctor.doctor_introduction}</p>
              <p className="experience">{doctor.experience}</p>
              <p className="languages">Speaks: {doctor.languages.join(', ')}</p>
            </div>
          </div>
          <div className="clinic-info">
            <div className="clinic-details">
              <span className="clinic-icon">🏥</span>
              <span className="clinic-name">{doctor.clinic.name}</span>
            </div>
            <div className="location">
              <span className="location-icon">📍</span>
              <span>{`${doctor.clinic.address.locality}, ${doctor.clinic.address.city}`}</span>
            </div>
          </div>
          <div className="appointment-section">
            <div className="consultation-types">
              {doctor.video_consult && <span className="video-consult">Video Consultation</span>}
              {doctor.in_clinic && <span className="in-clinic">In-Clinic</span>}
            </div>
            <span className="fees">{doctor.fees}</span>
            <button 
              className={`book-appointment ${bookedDoctors.has(doctor.id) ? 'booked' : ''}`}
              onClick={() => handleBooking(doctor.id)}
              disabled={bookedDoctors.has(doctor.id)}
            >
              {bookedDoctors.has(doctor.id) ? 'Booked' : 'Book Appointment'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;