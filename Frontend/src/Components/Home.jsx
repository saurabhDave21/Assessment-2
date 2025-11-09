import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({user,setUser}) => {
  const navigate=useNavigate();
  const Logout=()=>{
    setUser(null)
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome!</h1>
        {user && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-gray-600">
                  {user.name ? user.name[0].toUpperCase() : '?'}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Name:</span>{' '}
                <span className="text-gray-800">{user.name || 'Not provided'}</span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Email:</span>{' '}
                <span className="text-gray-800">{user.email || 'Not provided'}</span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Country:</span>{' '}
                <span className="text-gray-800">{user.country || 'Not provided'}</span>
              </p>
            </div>
            <div className='w-full flex items-center justify-center mt-4'>
            <button className='bg-red-500 w-24 py-1 rounded font-2xl hover:bg-red-600' onClick={()=>Logout()}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home