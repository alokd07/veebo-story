import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import DOMPurify from "dompurify";

export default function Home() {
  const [stories, setStories] = useState([]);

  const fetchStories = () => {
    fetch(`${BASE_URL}story/all?category=all`)
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch((err) => console.log(err));
  };

  const sanitizedData = (data) => {
    const trimmedData =
      data.length > 100 ? data.substring(0, 120) + "..." : data;
    return {
      __html: DOMPurify.sanitize(trimmedData),
    };
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <>
      <section className="relative main">
        <img
          className="absolute -top-2 md:-top-4 left-0 2xl:-top-7 w-full"
          src="./assets/images/Group 1.svg"
          alt="veebo Story"
        />
        <div className="container mx-auto md:pt-20 md:px-12 2xl:mx-auto 2xl:pt-32 flex justify-between">
          <div className="md:w-4/12 text-center md:text-left mt-20">
            <h2 className="text-4xl !font-extrabold text-purple-800 text-outline">
              Get better at writing!
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Helping young writers make cool stories with awesome pictures.
              Storybird's art-inspired writing makes learning fun!
            </p>
            <button className="mt-6 bg-btn cursor-pointer border-2 border-fuchsia-950 text-white font-extrabold px-8 py-1.5 rounded">
              Join now
            </button>
          </div>
          <div className="grid-cols-2 gap-4 w-5/12 h-fit hidden md:grid">
            <img
              className="w-full h-42"
              src="./assets/images/image 5.svg"
              alt="veebo Story"
            />
            <img
              className="w-full h-42"
              src="./assets/images/image 6.svg"
              alt="veebo Story"
            />
            <img
              className="w-full h-22"
              src="./assets/images/image 7.svg"
              alt="veebo Story"
            />
            <img
              className="w-full h-42"
              src="./assets/images/image 3.svg"
              alt="veebo Story"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-20 relative z-10">
        <h1 className="text-3xl font-bold text-center">Get Started</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 mx-4 md:mx-48">
          <div className="bg-[#f3e9f5] border-2 border-primary rounded-md p-4">
            <img
              className="w-12 h-12 mx-auto"
              src="./assets/images/image 9-1.svg"
              alt="veebo Story"
            />
            <h2 className="text-xl font-bold text-center mt-4 text-primary-bold">
              Choose an illustration
            </h2>
            <p className="text-center mt-2 text-primary-bold">
              ubiquitous models rather than parallel initiatives. Seamlessly
              reinvent success.{" "}
            </p>
          </div>
          <div className="bg-[#550964] p-4 border-2 border-[#550964] rounded-md">
            <img
              className="w-12 h-12 mx-auto"
              src="./assets/images/image 9.svg"
              alt="veebo Story"
            />
            <h2 className="text-xl font-bold text-center mt-4 text-white">
              Write your story
            </h2>
            <p className="text-center mt-2 text-white">
              ubiquitous models rather than parallel initiatives. Seamlessly
              reinvent success.{" "}
            </p>
          </div>
          <div className="bg-[#f3e9f5] border-2 border-primary rounded-md p-4">
            <img
              className="w-12 h-12 mx-auto"
              src="./assets/images/image 9-2.svg"
              alt="veebo Story"
            />
            <h2 className="text-xl font-bold text-center mt-4 text-primary-bold">
              Publish your Story
            </h2>
            <p className="text-center mt-2 text-primary-bold">
              ubiquitous models rather than parallel initiatives. Seamlessly
              reinvent success.{" "}
            </p>
          </div>
        </div>
        <button className="mt-12 bg-btn cursor-pointer border-2 border-fuchsia-950 text-white font-extrabold px-8 py-1.5 block mx-auto w-40 rounded">
          Try it now
        </button>
      </section>

      <section className="bg-background relative mt-20">
        <img
          className="absolute -top-13 2xl:-top-30 z-0 left-0 w-full"
          src="./assets/images/Group 33.svg"
          alt="veebo Story"
        />
        <img
          className="absolute -bottom-16 2xl:-bottom-32 left-0 z-0 w-full"
          src="./assets/images/Group 34.svg"
          alt="veebo Story"
        />
        <div className="container mx-auto text-white flex items-center px-10 lg:px-24 h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-between">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold text-purple-300 uppercase">
                More About Us
              </h3>
              <h2 className="text-4xl font-extrabold mt-2">What we do !</h2>
              <p className="mt-4 text-gray-200 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Blandit leo elementum
                velit risus cras id consectetur. Volutpat et pretium sapien
                tristique lacus. Non posuere massa at semper maecenas ante sed
                id. Sit nulla dignissim dolor sed in vitae. Eu metus feugiat
                justo.
              </p>
              <button className="mt-6 px-8 py-1.5 border-2 bg-purple-100 border-purple-300 text-primary-bold font-semibold rounded-md hover:bg-purple-600 transition">
                Learn more
              </button>
            </div>

            <div className="relative hidden lg:flex">
              <img
                src="./assets/images/image 11.svg"
                alt="kids"
                className="w-60 h-34 object-cover rounded shadow-lg absolute top-10 right-40 z-30"
              />
              <img
                src="./assets/images/image 12.svg"
                alt="kids"
                className="w-60 h-34 object-cover rounded shadow-lg absolute -top-12 right-20 z-20"
              />
              <img
                src="./assets/images/image 13.svg"
                alt="kids"
                className="w-60 h-34 object-cover rounded shadow-lg absolute -top-32 right-10 z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 item-background relative z-10">
        <div className="mb-8">
          <img
            src="./assets/images/image 10.svg"
            className="block mx-auto h-6"
            alt="image"
          />
          <h3 className="text-primary text-center font-semibold text-lg uppercase">
            Read Stories
          </h3>
          <h2 className="text-3xl text-center font-extrabold text-gray-900 mt-2">
            Take a look & Start Learning <br /> From Today
          </h2>
        </div>

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="border-2 border-yellow-400 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={story.thumbnail}
                alt={story.title}
                className="w-full h-36 object-cover"
              />
              <div className="bg-background p-4 text-white h-50">
                <h3 className="text-lg font-bold">
                  {story.title?.length > 20
                    ? story.title?.substring(0, 20) + "..."
                    : story.title}
                </h3>
                <div
                  className="text-sm mt-4 h-12"
                  dangerouslySetInnerHTML={sanitizedData(story.body)}
                />
                <button className="mt-4 bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-md w-full hover:bg-yellow-500 transition">
                  Read more
                </button>
                <div className="flex items-center justify-between mt-2 px-3">
                  <div className="flex items-center gap-1">
                  <i className="fas fa-eye text-white"></i>
                  <span className="text-sm">12</span>
                  </div>
                  <div className="flex items-center gap-1">
                  <i className="fas fa-heart text-red-500"></i>
                  <span className="text-sm">12</span>
                  </div>
                  <div className="flex items-center gap-1">
                  <i className="fas fa-star text-amber-500"></i>
                  <span className="text-sm">12</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 mx-auto text-center">
          <button className="bg-btn cursor-pointer text-white text-lg font-semibold px-8 py-1.5 rounded-md hover:bg-purple-800 transition">
            Explore more
          </button>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-purple-100 to-purple-200 py-16 pricing-background">
        <div className="mb-12">
          <h3 className="text-center text-purple-600 font-semibold text-lg uppercase">
            Pricing
          </h3>
          <h2 className="text-center text-4xl font-extrabold text-gray-900 mt-2">
            Our subscription plans for <br /> you that we provide!
          </h2>
        </div>

        <img
          className="absolute top-0 left-0 w-full h-fit"
          src="./assets/images/Group 36.svg"
          alt="veebo Story"
        />

        <div className="container relative flex flex-wrap gap-6 items-center justify-center w-11/12 mx-auto space-y-6 lg:space-y-0 lg:flex-row lg:justify-center">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-wrap md:flex-nowrap gap-6 items-center justify-between bg-white shadow-lg rounded-2xl p-6 w-[30rem] relative"
            >
              <img
                src={plan.img}
                alt={plan.title}
                className="w-28 h-full object-cover mx-auto md:mx-0"
              />
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-purple-800 mt-6">
                  {plan.title}
                </h3>
                <p className="text-gray-600 mt-2">{plan.description}</p>
                <a
                  href="#"
                  className="text-purple-700 text-center font-semibold mt-4 inline-block hover:underline"
                >
                  Know more →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button className="bg-btn cursor-pointer block mx-auto text-white text-lg font-semibold px-8 py-1.5 rounded-md hover:bg-purple-800 transition">
            Explore more
          </button>
        </div>
      </section>

      <section className="container mx-auto relative py-16 md:px-8 text-center rounded-t-[80px]">
        <div className="touch-background relative">
          <img
            src="./assets/images/Frame.svg"
            alt="veebo Story"
            className="absolute top-16 left-20 size-22 z-1"
          />
          <img
            src="./assets/images/Frame.svg"
            alt="veebo Story"
            className="absolute bottom-16 right-20 z-1 size-13"
          />
          <h3 className="text-yellow-600 font-semibold uppercase">
            Get in Touch
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mt-2 relative !z-2">
            Needs Help? Let’s Get in Touch
          </h2>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Blandit leo elementum velit
            risus cras id consectetur. Volutpat et pretium sapien tristique
            lacus. Non posuere massa at semper maecenas ante sed id. Sit nulla
            dignissim dolor sed in vitae. Eu metus feugiat justo.
          </p>
          <button className="mt-6 px-8 py-1.5 bg-btn cursor-pointer text-white font-semibold rounded-md hover:bg-purple-800 transition">
            Know more
          </button>
        </div>
      </section>
    </>
  );
}

const plans = [
  {
    id: 1,
    title: "Basic Individual Plan",
    img: "./assets/images/Group 39.svg",
    description: "Eu turpis egestas pretium aenean pharetra magna ac.",
  },
  {
    id: 2,
    title: "Premium Individual Plan",
    img: "./assets/images/Group 39 (1).svg",
    description: "Eu turpis egestas pretium aenean pharetra magna ac.",
  },
  {
    id: 3,
    title: "School Plan",
    img: "./assets/images/Group 39 (2).svg",
    description: "Eu turpis egestas pretium aenean pharetra magna ac.",
  },
];
