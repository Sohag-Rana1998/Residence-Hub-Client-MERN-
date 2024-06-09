import SectionTitle from '../../../../components/Shared/SectionTitle';
import useWishlistDataByEmail from '../../../../hooks/useWishlistDataByEmail';
import WishlistCard from './WishlistCard';

const Wishlist = () => {
  const { wishlistProperties, isLoading, refetch } = useWishlistDataByEmail();
  console.log(wishlistProperties);
  return (
    <div className="pb-10 px-10">
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
