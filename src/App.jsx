import React from 'react'
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
export default function App() {

  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token")
    return token ? children : <Navigate to="/Login"></Navigate>
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>}></Route>
        <Route path='/Login' element={<Login />}></Route>
      </Routes>
    </>
  )
}
