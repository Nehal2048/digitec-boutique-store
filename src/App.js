import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Countdown from './Countdown';
import { useState } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

function App() {
  const [selectedDate, setDate] = useState(new Date())

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <h1 className="title" >BALENCIAGA<br/>WINTER 24 COLLECTION</h1>
            <h3>Choose a target date and time to start countdown</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                  className="dateTimePicker"
                  value={dayjs(selectedDate)}
                  onChange={handleDateChange}
                  renderInput={(props) => <input {...props} />}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                />
            </LocalizationProvider>
            <div className="spacerLarge"></div>
            <Link to="/countdown">
              <button className='button'>Start Countdown</button>
            </Link>
          </div>
        } />
        <Route path="/countdown" element={<Countdown targetDate= {selectedDate} />} />
      </Routes>
    </Router>
  );
}

export default App;