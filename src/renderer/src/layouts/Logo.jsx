import React from 'react'
import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();
  return (
    <div>
         <div className="logoholder" onClick={() => navigate("/")}>
        <img src="https://res.cloudinary.com/dvmuf6jfj/image/upload/v1726546832/Portfolio/dgct-logo-3_dcstib.png" alt="logo" />
      </div>
    </div>
  )
}

export default Logo