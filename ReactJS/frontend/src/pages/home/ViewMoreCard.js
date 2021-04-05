import { observer } from 'mobx-react';
import { iconsByType } from '../../utils/constants';
import { Link } from 'react-router-dom';

export default observer(({ type, link }) => (
  <Link to={link} className="user-card goto">
    <div className="view-more-icon">{iconsByType[type]({ size: 'medium' })}</div>
    <div className="view-more-btn">View More</div>
  </Link>
));
