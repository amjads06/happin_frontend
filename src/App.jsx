import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'

import LandingPage from './common/pages/LandingPage'
import Pnf from './common/pages/Pnf'

import Event from './user/pages/Event'
import Sports from './user/pages/Sports'
import EventView from './user/pages/EventView'
import Contact from './user/pages/Contact'
import Auth from './common/pages/Auth'
import ListYourShow from './user/pages/ListYourShow/ListYourShow'
import YourShow from './user/pages/ListYourShow/YourShow'
import UserBookings from './user/pages/UserBookings'
import Profile from './user/pages/Profile'
import AdminHome from './admin/pages/AdminHome'
import AdminUsers from './admin/pages/AdminUsers'
import AdminEvents from './admin/pages/AdminEvents'
import AddShow from './user/pages/ListYourShow/AddShow'
import BookingDetails from './user/pages/ListYourShow/BookingDetails'
import { ToastContainer } from 'react-toastify'

function App() {

  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        {/* Common */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='*' element={<Pnf />} />

        {/* Users */}
        <Route path='/events' element={<Event />} />
        <Route path='/sports' element={<Sports />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/list-your-show' element={<ListYourShow />} />
        <Route path='/your-shows' element={<YourShow />} />
        <Route path='/my-bookings' element={< UserBookings />} />
        <Route path='/profile' element={< Profile />} />
        <Route path='/:id/event-view' element={<EventView />} />
        {/* List your Show by users */}
        <Route path='/your-shows/add-shows' element={<AddShow />} />
        <Route path='your-shows/booking-details' element={<BookingDetails />} />



        {/* Admin */}
        <Route path='/admin-home' element={<AdminHome />} />
        <Route path='/admin-users' element={<AdminUsers />} />
        <Route path='/admin-events' element={<AdminEvents />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        theme="colored"

      />
    </>
  )
}

export default App
