import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuthProvider } from './context/authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/EmployeeDashboard.jsx';
import AdminDashboard from './pages/HodDashboard.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Landing from './pages/Landing.jsx'
import SubmitReport from './pages/SubmitReport.jsx';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';


if(process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}


// import Dashboard from './pages/Dashboard.jsx';
// import AdminDashboard from './pages/AdminDashboard.jsx';


function App() {
  

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/submit-report" element={<SubmitReport />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App
