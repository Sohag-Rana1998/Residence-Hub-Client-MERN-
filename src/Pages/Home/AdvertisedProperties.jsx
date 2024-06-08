import useAdvertiseProperties from '../../hooks/useAdvertiseProperties';
import CardOfHome from './CardOfHome';

const AdvertisedProperties = () => {
  const { advertisedProperties, isLoading, refetch } = useAdvertiseProperties();
  console.log(advertisedProperties);
  return (
    <div className="container mx-auto">
      <div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
        {advertisedProperties.map(property => (
          <CardOfHome key={property._id} estate={property} />
        ))}
      </div>
    </div>
  );
};

export default AdvertisedProperties;
