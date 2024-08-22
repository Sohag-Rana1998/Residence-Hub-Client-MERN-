import { Helmet } from 'react-helmet-async';
import Card from '../../../../components/Shared/Card';
import SectionTitle from '../../../../components/Shared/SectionTitle';
import usePropertyByAgent from '../../../../hooks/usePropertyByAgent';
import Loader from '../../../../components/Shared/Loader';

const MyAddedProperties = () => {
  const { agentProperties, refetch, isLoading } = usePropertyByAgent();
  // console.log(agentProperties);
  return isLoading ? (
    <div>
      <Loader />
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
