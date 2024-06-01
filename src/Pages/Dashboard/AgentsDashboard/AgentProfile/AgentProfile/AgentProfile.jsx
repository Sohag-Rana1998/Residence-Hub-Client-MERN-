import Profile from '../../../../../components/Shared/Profile';
import useAuth from '../../../../../hooks/useAuth';

const AgentProfile = () => {
  const { user } = useAuth();
  return (
    <div>
      <Profile user={user} />
    </div>
  );
};

export default AgentProfile;
