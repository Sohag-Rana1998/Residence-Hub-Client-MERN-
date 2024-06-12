import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../../components/Shared/SectionTitle';
import useWishlistDataByEmail from '../../../../hooks/useWishlistDataByEmail';
import WishlistCard from './WishlistCard';
import ScaleLoader from 'react-spinners/ScaleLoader';

const Wishlist = () => {
  const { wishlistProperties, isLoading, refetch } = useWishlistDataByEmail();
  // console.log(wishlistProperties);
  return isLoading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ScaleLoader color="#36d7b7" height={80} width={5} />
    </div>
  ) : (
    <div className="pb-10 px-10">
      <Helmet>
        <title>RESIDENCE HUB | Wishlist</title>
      </Helmet>
      <div>
        <SectionTitle
          heading={'Wish List'}
          subheading={'Home/Dashboard/Wishlist'}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistProperties?.map(property => (
          <WishlistCard
            key={property._id}
            property={property}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
