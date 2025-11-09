import React from 'react'
import Login from './Components/Login'
import Home from './Components/Home'
import Register from './Components/Register'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import Admin from './Components/Admin'

const App = () => {
  const [user, setUser] = React.useState(null);

  useEffect(()=>{
    const fetchUser = async ()=>{
      const token = localStorage.getItem('token');
      if(token){
        try{
          const res = await axios.get('/api/users/me',{
            headers: { Authorization: `Bearer ${token}` }
          })
          setUser(res.data);
        }
        catch(error){ 
          console.error('Error fetching user:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
    }
    fetchUser();
  },[])

  return (
    <Routes>
      <Route path="/" element={
        !user ? <Login setUser={setUser} /> : (
          (user.role || '').toString().toLowerCase() === 'admin'
            ? <Admin setUser={setUser} />
            : <Home user={user} setUser={setUser} />
        )
      } />

      <Route path="/login" element={
        user ? <Navigate to="/" replace /> : <Login setUser={setUser} />
      } />

      <Route path="/register" element={<Register setUser={setUser}/>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App