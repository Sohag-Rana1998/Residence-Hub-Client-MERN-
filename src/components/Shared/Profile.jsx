import PropTypes from 'prop-types';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationPin,
  FaPhone,
  FaPinterest,
  FaTwitter,
  FaVimeo,
} from 'react-icons/fa6';
import { Helmet } from 'react-helmet-async';
import { FaEnvelope } from 'react-icons/fa';

const Profile = ({ user, refetch }) => {
  console.log(refetch);
  return (
    <div className="container  mx-auto    rounded-lg ">
      <Helmet>
        <title>Heaven Residence | Profile</title>
      </Helmet>
      <div className="rounded-t-lg w-full h-32 md:text-right text-center text-white p-5  bg-[#006770] overflow-hidden">
        <h3 className="text-3xl font-bold">Profile</h3>
        <h3 className="text-sm">Home/Dashboard/Profile</h3>
      </div>
      <div className="flex w-full flex-col  md:flex-row justify-between items-start">
        <div className="w-80 min-h-screen border-r-0 md:border-r">
          <div className="mx-auto w-32 h-32 relative -mt-10 border-4 border-white rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-32"
              src={user?.photo}
            />
          </div>
          <div className="divider"></div>
          <div className="text-lg flex justify-center items-center gap-3 mt-5">
            <FaFacebook className="cursor-pointer hover:scale-[120%] duration-500"></FaFacebook>
            <FaInstagram className="cursor-pointer hover:scale-[120%] duration-500"></FaInstagram>
            <FaTwitter className="cursor-pointer hover:scale-[120%] duration-500"></FaTwitter>
            <FaLinkedin className="cursor-pointer hover:scale-[120%] duration-500"></FaLinkedin>
            <FaPinterest className="cursor-pointer hover:scale-[120%] duration-500"></FaPinterest>
            <FaVimeo className="cursor-pointer hover:scale-[120%] duration-500"></FaVimeo>
          </div>
          <div className="p-4  mt-2">
            <button className=" block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
              Update Your Profile
            </button>
          </div>
        </div>
        <div className=" flex-1">
          <div className="px-5 mt-5">
            <div>
              <h2 className="font-bold text-4xl">{user?.name || 'Unknown'}</h2>
              <h4 className="text-xl font-bold">
                {(user?.role === 'Admin' && 'Admin') ||
                  (user?.role === 'Agent' && 'Agent') ||
                  ''}
              </h4>
            </div>
            <div className="mt-5">
              <p className=" font-semibold flex items-center gap-2">
                <FaEnvelope /> {user?.email || 'Not Found'}
              </p>
              <p className=" font-semibold flex items-center gap-2">
                <FaPhone /> +8801234569879
              </p>
              <p className=" font-semibold flex items-center gap-2">
                <FaLocationPin /> Dhaka, Bangladesh
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mt-10">About:</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};
export default Profile;
