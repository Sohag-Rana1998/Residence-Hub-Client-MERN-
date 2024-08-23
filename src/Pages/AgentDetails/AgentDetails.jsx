import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import useAgentData from "../../hooks/useAgentData";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaPinterest,
  FaTwitter,
  FaUserGraduate,
  FaUserTie,
  FaVimeo,
} from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import { FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";

const AgentDetails = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useAgentData(id);
  console.log(data);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_2mpe8uk", "template_sd4va7c", form.current, {
        publicKey: "-YELe9jYCFqrAV82n",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("Your Email Sent Successfully");
          form.current.user_name.value = "";
          form.current.user_email.value = "";
          form.current.message.value = "";
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <div className="w-full mx-auto pt-[68px]   rounded-lg ">
      <Helmet>
        <title>RESIDENCE HUB | Agent Details</title>
      </Helmet>
      <div className=" w-full h-32  md:text-right text-center text-white py-5 px-10 bg-[#006770] overflow-hidden">
        <h3 className="text-3xl font-bold">Agent Profile</h3>
        <h3 className="text-sm">Home/Agent-Details</h3>
      </div>
      <div className="flex w-full flex-col  md:flex-row justify-between items-start">
        <div className="w-80  relative border-r-0 md:border-r">
          <div className="mx-auto w-32 h-32 relative -mt-10 border-4 border-white rounded-full overflow-hidden">
            <img className=" w-32 h-32 rounded-full" src={data?.photo} />
          </div>

          <div className="divider"></div>
          <div className="md:hidden block text-center">
            <h2 className="font-bold text-2xl">{data?.name || "Unknown"}</h2>
            <h4 className="text-xl font-bold">{data?.role}</h4>
          </div>
          <div className="text-lg flex justify-center items-center gap-3 mt-5">
            <FaFacebook className="cursor-pointer hover:scale-[120%] duration-500"></FaFacebook>
            <FaInstagram className="cursor-pointer hover:scale-[120%] duration-500"></FaInstagram>
            <FaTwitter className="cursor-pointer hover:scale-[120%] duration-500"></FaTwitter>
            <FaLinkedin className="cursor-pointer hover:scale-[120%] duration-500"></FaLinkedin>
            <FaPinterest className="cursor-pointer hover:scale-[120%] duration-500"></FaPinterest>
            <FaVimeo className="cursor-pointer hover:scale-[120%] duration-500"></FaVimeo>
          </div>
          <div className="my-5 space-y-2 pl-4 md:pl-10 pr-2">
            <p className=" font-semibold flex items-center gap-2">
              <FaEnvelope /> {data?.email || "Not Found"}
            </p>
            <p className=" font-semibold flex items-center gap-2">
              <FaPhone /> +{data?.phone || "Not Found"}
            </p>
            <p className=" font-semibold flex items-center gap-2">
              <IoLocationSharp /> {data?.address || "Not Found"}
            </p>
            <p className=" font-semibold flex items-center gap-2">
              <FaUserTie /> {data?.profession || "Not Found"}
            </p>
            <p className=" font-semibold flex items-center gap-2">
              <FaUserGraduate /> {data?.education || "Not Found"}
            </p>
            <p className=" font-semibold flex items-center gap-2">
              Gender: {data?.gender || "Not Found"}
            </p>
          </div>
        </div>
        <div className=" flex-1">
          <div className="px-5 mt-5">
            <div className="hidden md:block">
              <h2 className="font-bold text-4xl">{data?.name || "Unknown"}</h2>
              <h4 className="text-xl font-bold">{data?.role}</h4>
            </div>

            <div>
              <h3 className="text-2xl font-bold mt-5">About:</h3>
              <div className="w-full border bg-gray-50 min-h-40 rounded-md p-2">
                {data?.about}
              </div>
            </div>
            <div className="my-5">
              <h2 className=" text-2xl font-bold">Contact:</h2>
              <form ref={form} onSubmit={sendEmail}>
                <div className="flex justify-between items-center flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <label htmlFor="Name" className="font-bold">
                      Your Name:
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Your Name"
                      className="input w-full bg-none border border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="email" className="font-bold">
                      Your Email:
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      placeholder="Your Email Address"
                      className="input w-full bg-none border border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="message" className="font-bold">
                    Your Message
                  </label>{" "}
                  <br />
                  <textarea
                    name="message"
                    id=""
                    placeholder="Your Message"
                    rows="5"
                    className="textarea w-full bg-none border border-blue-500 focus:outline-none"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button className="btn bg-blue-500 w-full md:w-40   text-white focus:outline-none hover:bg-gray-900">
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
