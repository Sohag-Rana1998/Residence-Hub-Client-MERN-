/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaVimeo,
} from "react-icons/fa6";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper/modules";
import SectionHeading from "./SectionHeading";
import useAgents from "../../hooks/useAgents";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { Rating } from "@smastrom/react-rating";

export default function BrowseOurAgent() {
  const { allAgents, refetch, isLoading } = useAgents();
  // console.log(allAgents);
  const [toggle, setToggle] = useState(true);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const [slidesPerView, setSlidesPerView] = useState(
    getSlidesPerView(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function getSlidesPerView(width) {
    if (width > 920) {
      return 3;
    } else if (width <= 920 && width > 620) {
      return 2;
    } else {
      return 1;
    }
  }

  return (
    <>
      <div className="w-full flex justify-between items-center  pt-5   h-[700px] lg:h-[450px]">
        <div className="max-w-7xl container flex-col lg:flex-row gap-5 mx-auto flex justify-between items-center">
          <div className="w-full lg:w-[30%]">
            <SectionHeading
              heading={"Browse Our Agents"}
              subheading={
                "Explore our Agents section to discover the experienced professionals ready to assist you. From seasoned veterans to specialized agents, find the perfect match to guide you through your real estate journey. "
              }
            />
          </div>
          <div
            onMouseEnter={() => setToggle(false)}
            onMouseLeave={() => setToggle(true)}
            className="w-full lg:w-[65%]"
          >
            <Swiper
              slidesPerView={slidesPerView}
              loop={true}
              spaceBetween={20}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper    h-[450px]] "
              onAutoplayTimeLeft={onAutoplayTimeLeft}
            >
              {allAgents?.map((agent) => (
                <SwiperSlide key={agent._id}>
                  <SwiperSlide className="bg-white w-full ">
                    <div className="p-5">
                      <div className="flex justify-between items-center">
                        <FaHeartCircleCheck className="text-3xl text-orange-500" />
                        <span className="text-blue-700 font-bold  bg-blue-100 px-3 py-2 text-sm rounded-2xl">
                          Verified
                        </span>
                      </div>
                      <div className=" mt-5">
                        <div className="w-24 h-24 mx-auto rounded-full border-4 p-1 border-gray-400">
                          <img
                            className="w-full h-full rounded-full"
                            src={agent.photo}
                            alt=""
                          />
                        </div>
                        <div className="text-center flex justify-center flex-col items-center">
                          <h4 className="text-xl font-bold my-2">
                            {agent.name}
                          </h4>
                          <Rating style={{ maxWidth: 100 }} value={5} />
                        </div>
                      </div>
                      <div>
                        <button className="bg-[#70DAB9] my-2 border-2 border-[#41B06E] w-full bg-opacity-30 hover:bg-[#41B06E] text-[#41B06E] btn btn-outline">
                          Contact Agent
                        </button>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="text-lg flex justify-center items-center gap-3 mb-2">
                        <FaFacebook className="cursor-pointer hover:scale-[120%] duration-500"></FaFacebook>
                        <FaInstagram className="cursor-pointer hover:scale-[120%] duration-500"></FaInstagram>
                        <FaTwitter className="cursor-pointer hover:scale-[120%] duration-500"></FaTwitter>
                        <FaLinkedin className="cursor-pointer hover:scale-[120%] duration-500"></FaLinkedin>
                        <FaPinterest className="cursor-pointer hover:scale-[120%] duration-500"></FaPinterest>
                        <FaVimeo className="cursor-pointer hover:scale-[120%] duration-500"></FaVimeo>
                      </div>
                    </div>
                  </SwiperSlide>
                </SwiperSlide>
              ))}
              {toggle ? (
                <div className="autoplay-progress hidden" slot="container-end">
                  <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                  </svg>
                  <span ref={progressContent}></span>
                </div>
              ) : (
                <></>
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
