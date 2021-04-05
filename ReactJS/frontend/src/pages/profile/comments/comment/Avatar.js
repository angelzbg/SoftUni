import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import no_profile from '../../../../images/no_profile.png';

export default observer(({ author }) => (
  <Link to={`/profile/${author._id}`}>
    <img
      className="comment-avatar"
      src={author.avatar ? `/avatars/${author.avatar}` : no_profile}
      alt={`${author.name} profile avatar`}
    />
  </Link>
));
