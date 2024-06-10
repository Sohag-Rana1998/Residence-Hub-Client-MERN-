import { Helmet } from 'react-helmet-async';
import Card from '../../../../components/Shared/Card';
import SectionTitle from '../../../../components/Shared/SectionTitle';
import usePropertyByAgent from '../../../../hooks/usePropertyByAgent';
import ScaleLoader from 'react-spinners/ScaleLoader';

const MyAddedProperties = () => {
  const { agentProperties, refetch, isLoading } = usePropertyByAgent();
  console.log(agentProperties);
  return isLoading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ScaleLoader color="#36d7b7" height={80} width={5} />
    </div>
  ) : (
    <div className="px-10 pb-10">
      <Helmet>
        <title>RESIDENCE HUB | My Added Properties</title>
      </Helmet>
      <div>
        <SectionTitle
          heading={'My Added Properties'}
          subheading={'Home/Dashboard/MyAdded-Property'}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {agentProperties?.map(property => (
          <Card key={property._id} estate={property} refetch={refetch}></Card>
        ))}
      </div>
    </div>
  );
};

export default MyAddedProperties;
