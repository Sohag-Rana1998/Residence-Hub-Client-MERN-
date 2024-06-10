import {
  FaDollarSign,
  FaFire,
  FaHouseCircleCheck,
  FaHouseFloodWater,
  FaHouseUser,
  FaRocketchat,
} from 'react-icons/fa6';
import SectionHeading from './SectionHeading';

const WeProvideBetterService = () => {
  return (
    <div className="bg-blue-700 w-full text-white py-16 px-5">
      <div className="max-w-7xl container mx-auto">
        <div className="mb-5">
          <SectionHeading
            heading={'We Provide Better Service For You'}
            subheading={
              'Experience top-notch real estate services tailored to your needs. From personalized property searches to expert advice and seamless transactions, our dedicated team goes above and beyond to ensure you receive the best service possible. Let us make your real estate journey smooth and successful'
            }
          />
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="flex justify-center flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white flex justify-center items-center">
                <FaHouseCircleCheck className="text-blue-500 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold my-3">Buy Properties</h3>
              <p>
                Our knowledgeable agents are here to assist you throughout your
                home-buying journey. From initial search to closing the deal,
                {"we'll"} provide expert advice and support to help you make
                informed decisions
              </p>
            </div>
            <div className="flex justify-center flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white flex justify-center items-center">
                <FaHouseUser className="text-blue-500 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold my-3">Sell Your House</h3>
              <p>
                Ready to sell? Our expert agents will help you get the best
                price for your home. With professional marketing strategies and
                a comprehensive market analysis, {"we'll"} ensure your property
                stands out and attracts the right buyers.
              </p>
            </div>
            <div className="flex justify-center flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white flex justify-center items-center">
                <FaHouseFloodWater className="text-blue-500 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold my-3">Find Mortgage</h3>
              <p>
                Our team will guide you through every step of the mortgage
                application, from pre-approval to closing. With our support, you
                can secure financing with confidence and ease.
              </p>
            </div>
            <div className="flex justify-center flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white flex justify-center items-center">
                <FaFire className="text-blue-500 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold my-3">High Quality</h3>
              <p>
                We pride ourselves on delivering high-quality real estate
                services. From premium property listings to exceptional customer
                support, we ensure that every aspect of your experience meets
                the highest standards.
              </p>
            </div>
            <div className="flex justify-center flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white flex justify-center items-center">
                <FaDollarSign className="text-blue-500 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold my-3">Friendly Price</h3>
              <p>
                Take advantage of our special deals and offers to get the best
                price on your next property. We strive to make homeownership and
                renting more accessible and affordable for everyone.
              </p>
            </div>
            <div className="flex justify-center flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white flex justify-center items-center">
                <FaRocketchat className="text-blue-500 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold my-3">Easy Communication</h3>
              <p>
                We prioritize clear and easy communication throughout your real
                estate journey. Our team is always available to answer your
                questions and provide updates, ensuring you stay informed every
                step of the way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeProvideBetterService;
