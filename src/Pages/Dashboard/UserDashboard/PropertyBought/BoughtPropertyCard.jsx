/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const BoughtPropertyCard = ({ property, refetch }) => {
  // console.log(refetch);
  const {
    _id,
    title,
    agentName,
    status,
    buyingDate,
    OfferedAmount,
    location,
    image,
    transactionId,
  } = property;
  // console.log(property);
  // console.log(buyingDate);

  return (
    <div className="w-full">
      <Helmet>
        <title>RESIDENCE HUB | Bought Properties</title>
      </Helmet>
      <div className="w-full rounded-2xl  h-full   shadow-xl border ">
        <div className="relative h-48 w-full rounded-t-2xl  overflow-hidden">
          <img
            src={image}
            className="w-full  h-full hover:scale-[110%] duration-700"
            alt="ui/ux review check"
          />

          <p className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-2 rounded-t-lg ">
            <p className=" font-sm text-white text-sm flex items-center gap-2">
              <FaLocationDot />
              {location}
            </p>
          </p>
        </div>

        <div className="px-2 w-full h-full   ">
          <div>
            <p className="text-lg font-semibold">{title}</p>

            <div>
              <div className="">
                <span className="font-semibold text-sm ">
                  Offered Amount: ${OfferedAmount}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <p className="font-semibold text-sm mt-1">
                <span className="font-bold">Agent Name:</span>
                {agentName}
              </p>
            </div>

            {status === 'Pending' && (
              <div className="flex justify-end p-3">
                <span className=" bg-blue-500 rounded-3xl  text-white py-1 px-2 duration-500">
                  {status}
                </span>
              </div>
            )}

            {status === 'Rejected' && (
              <div className="flex justify-end p-3">
                <span className=" bg-red-400 rounded-3xl  text-white py-1 px-2 duration-500">
                  {status}
                </span>
              </div>
            )}
            {status === 'Accepted' && (
              <div className="flex mb-3 justify-between items-start md:items-center mt-3">
                <span className=" bg-blue-500 rounded-3xl  text-white py-1 px-2 duration-500">
                  {status}
                </span>
                <Link to={`${_id}`}>
                  <button className="bg-blue-500 btn  btn-sm   hover:scale-[106%] duration-500  text-white font-bold hover:bg-blue-gray-900">
                    Pay Now
                  </button>
                </Link>
              </div>
            )}
            {status === 'Bought' && (
              <div className=" my-3  ">
                <p className="text-sm">transactionId: {transactionId}</p>
                <div className="flex justify-end">
                  <p className=" bg-blue-500 text-center w-20 rounded-3xl  text-white py-1 px-2 duration-500">
                    {status}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

BoughtPropertyCard.propTypes = {
  property: PropTypes.object,
  refetch: PropTypes.func,
};

export default BoughtPropertyCard;
