import { BrowserRouter as Router } from 'react-router-dom';
import DoctorListingPage from './components/DoctorListingPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <DoctorListingPage />
      </div>
    </Router>
  );
}

export default App;
