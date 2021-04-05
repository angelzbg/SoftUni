import { useParams } from 'react-router';
import ProfileCard from './card';
import Comments from './comments';
import Ratings from './ratings';

const Profile = () => {
  const { id } = useParams();
  return (
    <>
      <ProfileCard {...{ id }} />
      <Comments {...{ id }} />
      <Ratings {...{ id }} />
    </>
  );
};
export default Profile;
