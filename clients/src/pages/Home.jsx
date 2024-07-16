import React from "react";
import home from "../assets/home.png";
const Home = () => {
  return (
    <div className="bg-black w-full ">
      <div className="max-w-[1200px] mx-auto px-6 ">
        <div className="grid md:grid-cols-2">
          <div className="py-10 md:py-32">
            <img src={home} className="h-[450px]" alt="@human" />
          </div>
          <div className="py-10 md:py-32">
            <div>
              <h2 className="text-white text-3xl font-bold">
                Welcome to My Profile 
              </h2>
              <p className="py-8 text-slate-300 text-justify">
                Becoming a full-stack developer is a rewarding and challenging
                journey that involves mastering both front-end and back-end
                development skills. As a full-stack developer, I aim to create
                seamless, dynamic, and responsive web applications by
                understanding and implementing the complete spectrum of web
                technologies.
              </p>
              <p className=" text-slate-300 text-justify">
                On the front end, I focus on crafting intuitive and visually
                appealing user interfaces using technologies like HTML, CSS, and
                JavaScript. My recent experience with frameworks like ReactJS
                and styling libraries such as TailwindCSS has enhanced my
                ability to build responsive, component-based applications
                efficiently. Leveraging tools like React Hook Form for form
                validation ensures that the user experience is both smooth and
                error-free.
              </p>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
