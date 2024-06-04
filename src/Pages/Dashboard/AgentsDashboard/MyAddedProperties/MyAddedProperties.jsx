import Card from '../../../../components/Shared/Card';
import SectionTitle from '../../../../components/Shared/SectionTitle';
import useAuth from '../../../../hooks/useAuth';

import usePropertyByAgent from '../../../../hooks/usePropertyByAgent';

const MyAddedProperties = () => {
  const { user } = useAuth();
  const email = user?.email;
  const { agentProperties, refetch } = usePropertyByAgent(email);
  console.log(agentProperties);
  return (
    <div>
      <div>
        <SectionTitle
          heading={'My Added Properties'}
          subheading={'Home/Dashboard/Add-Property'}
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
