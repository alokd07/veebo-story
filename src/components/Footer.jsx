import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-8">
      <div className="max-w-6xl mx-auto flex flex-wrap md:flex-nowrap gap-12 justify-between">
        <div className="md:w-4/12">
          <img
            className="size-12 scale-[3] ml-6 mb-4"
            src="./assets/images/Frame 7.svg"
            alt="veebo Story"
          />
          <h1 className="text-xl uppercase">About the company</h1>
          <p className="mt-4 text-gray-400">
            Sapien luctus lesuada sentus pharetra nisi quisque aenean eros mus
            magnis arcu vehicula nascetur feugiat
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className="text-gray-200 hover:text-white bg-white/15 p-1 w-8 h-8 justify-center items-center flex rounded-full"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-200 hover:text-white bg-white/15 p-1 w-8 h-8 justify-center items-center flex rounded-full"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="#"
              className="text-gray-200 hover:text-white bg-white/15 p-1 w-8 h-8 justify-center items-center flex rounded-full"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-gray-200 hover:text-white bg-white/15 p-1 w-8 h-8 justify-center items-center flex rounded-full"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-8/12 md:mt-16">
          <div>
            <h3 className="font-bold">Our Services</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Write
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Read
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Activity
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Our Services</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Write
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Read
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Activity
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Contact us</h3>
            <button className="mt-4 px-8 py-1.5 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition">
              Know more
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
