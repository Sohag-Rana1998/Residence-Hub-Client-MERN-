import SectionTitle from "../../../../components/Shared/SectionTitle";
import useOfferedPropertyByEmail from "../../../../hooks/useOfferedPropertyByEmail";
import BoughtPropertyCard from "./BoughtPropertyCard";
import Loader from "../../../../components/Shared/Loader";

const PropertyBought = () => {
  const { offeredProperties, refetch, isLoading } = useOfferedPropertyByEmail();
  return isLoading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className="pb-10 px-10">
      <div>
        <SectionTitle
          heading={"Property Bought"}
          subheading={"Home/Dashboard/PropertyBought"}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        {offeredProperties?.map((property) => (
          <BoughtPropertyCard
            key={property._id}
            property={property}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyBought;
