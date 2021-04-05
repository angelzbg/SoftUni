import './styles/header.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import UserMenu from './usermenu/index';
import Navigation from './navigation/index';

const Header = () => (
  <div className="header-wrapper">
    <Link to="/">
      <img src={logo} alt="" className="header-logo" />
    </Link>
    <Navigation />
    <UserMenu />
  </div>
);

export default Header;
