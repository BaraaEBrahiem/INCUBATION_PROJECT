import React from 'react'
import NavLinkUniversal from './NavLinkUniversal'
const SignupLink = ({label, className}) => {
  return (
    <div className={`flex justify-center w-fit text-white hover:scale-105 transition ${className}`}>
                <NavLinkUniversal
                label={label}
                to="/signup"
                className="bg-main-color text-[22px] font-bold md:px-10 md:py-4 px-2 py-1 rounded-xl"
                />
    </div>
  )
}

export default SignupLink