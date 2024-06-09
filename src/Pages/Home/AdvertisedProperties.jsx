import useAdvertiseProperties from '../../hooks/useAdvertiseProperties';
import CardOfHome from './CardOfHome';
import SectionHeading from './SectionHeading';

const AdvertisedProperties = () => {
  const { advertisedProperties, isLoading, refetch } = useAdvertiseProperties();
  console.log(advertisedProperties);
  return (
    <div className="container mx-auto">
      <div className="mt-10 mb-5">
        <SectionHeading
          heading={`Best Properties For You`}
          subheading={
            "Discover our handpicked selection of top  properties that meet you preferences. Whether you are looking for a cozy apartment, a spacious family home, or a prime commercial space,we've chosen the best options to suit your needs."
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
        {advertisedProperties.map(property => (
          <CardOfHome key={property._id} estate={property} />
        ))}
      </div>
    </div>
  );
};

export default AdvertisedProperties;
<br />;
