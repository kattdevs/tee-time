
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Toast  from './components/Toast';
import Home       from './pages/Home';
import Book       from './components/BookingModal';
import MyBookings from './pages/MyBookings';
 
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/'            element={<Home />} />
        <Route path='/book'        element={<Book />} />
        <Route path='/my-bookings' element={<MyBookings />} />
      </Routes>
      <Toast />
    </>
  );
}


