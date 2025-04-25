import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import DoctorList from './DoctorList';
import './DoctorListingPage.css';

const DoctorListingPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (doctors.length > 0) {
      let filtered = [...doctors];

      // Apply specialties filter
      const specialties = searchParams.getAll('specialty');
      if (specialties.length > 0) {
        filtered = filtered.filter(doctor => 
          doctor.specialities.some(spec => 
            specialties.includes(spec.name)
          )
        );
      }

      // Apply consultation type filter
      const consultType = searchParams.get('consultType');
      if (consultType === 'video') {
        filtered = filtered.filter(doctor => doctor.video_consult);
      } else if (consultType === 'clinic') {
        filtered = filtered.filter(doctor => doctor.in_clinic);
      }

      // Apply search filter
      const searchQuery = searchParams.get('search');
      if (searchQuery) {
        filtered = filtered.filter(doctor =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply sorting
      const sortBy = searchParams.get('sortBy');
      if (sortBy === 'fees') {
        filtered.sort((a, b) => {
          const aFees = parseInt(a.fees.replace(/[^\d]/g, ''));
          const bFees = parseInt(b.fees.replace(/[^\d]/g, ''));
          return aFees - bFees;
        });
      } else if (sortBy === 'experience') {
        filtered.sort((a, b) => {
          const aExp = parseInt(a.experience.replace(/[^\d]/g, ''));
          const bExp = parseInt(b.experience.replace(/[^\d]/g, ''));
          return bExp - aExp;
        });
      }

      setFilteredDoctors(filtered);
    }
  }, [searchParams, doctors]);

  return (
    <div className="doctor-listing-page">
      <SearchBar 
        doctors={doctors}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="content">
        <div className="filter-panel">
          <FilterPanel
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <div className="doctor-list-container">
          <DoctorList doctors={filteredDoctors} />
        </div>
      </div>
    </div>
  );
};

export default DoctorListingPage;