import AdvertisedProperties from './AdvertisedProperties';
import Banner from './Banner';
import TrustedCompany from './TrustedCompany';

const Home = () => {
  return (
    <div>
      <Banner />
      <TrustedCompany />
      <div className="my-16">
        <AdvertisedProperties />
      </div>
    </div>
  );
};

export default Home;
