import React from 'react'
import about from "../assets/about.png";
const About = () => {
  return (
    <div className="bg-black w-full ">
    <div className="max-w-[1200px] mx-auto px-6 ">
      <div className="grid md:grid-cols-2">
        <div className="py-10 md:py-32">
          <img src={about} className="h-[450px]" alt="@human" />
        </div>
        <div className="py-10 md:py-32 flex items-center">
          <div>
            <h2 className="text-white text-3xl font-bold">
            Passionate Full-Stack Developer in the Making
            </h2>
            <p className="py-8 text-slate-300 text-justify">
            Welcome to my journey of becoming a full-stack developer with a focus on the MERN stack. My passion for web development drives me to continually learn and improve my skills, aiming to create dynamic and efficient web applications.
            </p>
           
           
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default About
