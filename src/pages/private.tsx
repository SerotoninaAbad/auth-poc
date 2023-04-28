import withAuth from '../auth/withAuth.tsx';
import { useUser } from '../auth/useUser';
import { useQuery } from '@apollo/client';
import { QUERY_DATA_STRIPE } from 'src/queries';

const Private = () => {
  const { user, logout } = useUser();
  const { loading, data, error } = useQuery(QUERY_DATA_STRIPE, {
    variables: { userId: user?.id },
  });
  console.log(loading, data, error);
  return (
    <div>
      <div>Private {user?.displayName}</div>
      {user?.email && (
        <div>
          <div>Email: {user.email}</div>
          <button onClick={() => logout()}>Logout</button>
        </div>
      )}
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default withAuth(Private);
