import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { iconsByType } from '../../../../utils/constants';
import { StarFillIcon, StarIcon, LocationIcon, TrashIcon } from '@primer/octicons-react';

export default observer(({ user, author, content, syncing, setDeleteId, commentId }) => (
  <div className="comment-content">
    {!!user && user._id === author._id && (
      <div className="comment-delete-wrap">
        <div className="comment-delete" onClick={() => (!syncing ? setDeleteId(commentId) : null)}>
          <TrashIcon size="small" />
        </div>
      </div>
    )}
    <div className="author-info">
      <Link to={`/profile/${author._id}`} className="comment-author">
        {author.name}
      </Link>
      {iconsByType[author.type]({ size: 'small', className: 'author-type' })}
      <span style={{ color: 'var(--medium2)' }}> | </span>
      <div className={`author-rating ${author.votes > 0 ? 'voted' : ''}`}>
        {[0, 0, 0, 0, 0].map((_, i) => (
          <span key={`star-${commentId}-${author._id}-${i}`}>
            {(i < author.ratingRound ? StarFillIcon : StarIcon)({ size: 'small' })}
          </span>
        ))}
      </div>
      <span style={{ color: 'var(--medium2)' }}> | </span>
      <div className="author-location">
        <LocationIcon size="small" /> {author.city}
      </div>
    </div>
    {content}
  </div>
));
