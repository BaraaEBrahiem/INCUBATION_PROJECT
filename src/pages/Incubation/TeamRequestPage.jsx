import React from 'react'
import TeamRequestForm from '../../components/Forms/TeamRequestForm'
const TeamRequestPage = () => {
  return (
    <div className='bg-white-color min-h-screen py-8'>
      <div className="container mt-20"> 
        <h1 className="text-3xl font-bold text-second-color m-6">معلومات عن الفريق المطلوب</h1>
        <TeamRequestForm />
      </div>
    </div>
  )
}

export default TeamRequestPage