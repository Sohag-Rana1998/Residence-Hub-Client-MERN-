import { Helmet } from 'react-helmet-async';
import AdvertisedProperties from './AdvertisedProperties';
import Banner from './Banner';
import BrowseOurAgent from './BrowseOurAgent';
import ReviewSection from './ReviewSection';
import TrustedCompany from './TrustedCompany';
import WeProvideBetterService from './WeProvideBetterService';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>RESIDENCE HUB | Home</title>
      </Helmet>
      <Banner />
      <TrustedCompany />
      <AdvertisedProperties />
      <ReviewSection />
      <WeProvideBetterService />
      <BrowseOurAgent />
    </div>
  );
};

export default Home;
