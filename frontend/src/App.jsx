import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Certificates from './pages/Certificates'
import Clubs from './pages/Clubs'
import Profile from './pages/Profile'
import Notification from './pages/Notification'
import MyEvents from './pages/MyEvents'
import SignUp from './pages/SignUp'
import Calander from './pages/Calander'


function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/calendar" element={<Calander/>} />
                <Route path="/certificates" element={<Certificates/>} />
                <Route path="/clubs" element={<Clubs/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/notification" element={<Notification/>} />
                <Route path="/myevents" element={<MyEvents/>} />
                <Route path="/signup" element={<SignUp/>} />
            </Routes>

        </div>
    )
}

export default App
