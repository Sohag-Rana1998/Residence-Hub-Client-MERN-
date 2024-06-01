import Card from '../../../../components/Shared/Card';
import useAllProperties from '../../../../hooks/useAllProperties';

const MyAddedProperties = () => {
  const { properties, isLoading, refetch } = useAllProperties();
  console.log(properties);
  return (
    <div>
      <div className="flex justify-center ">
        <div className="w-[250px]  p-3 text-center rounded-t-3xl">
          <h3 className="text-3xl font-bold border-b-2 pb-1">Add Property</h3>
          <h3 className="text-sm mt-2">Home/Dashboard/Add-Property</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {properties?.map(property => (
          <Card key={property._id} estate={property} refetch={refetch}></Card>
        ))}
      </div>
    </div>
  );
};

export default MyAddedProperties;
