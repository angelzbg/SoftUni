import './styles/app.css';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import AppLoader from './components/loaders/AppLoader';
import Notifications from './components/notifications';
import Header from './components/header';
import Connections from './components/connections';
import Chat from './components/chat';
import Login from './pages/authorization/login';
import Register from './pages/authorization/register';
import Profile from './pages/profile';
import Home from './pages/home/index';
import Developers from './pages/developers';
import Organizations from './pages/organizations';
import Search from './pages/search';
import Activity from './pages/activity';
import { onAppScroll } from './utils/utils';

const App = () => (
  <HashRouter>
    <div className="app-wrapper">
      <Header />
      <Connections />
      <Chat />
      <div className="content-wrapper scroll-h" onScroll={onAppScroll}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/developers/:section?" component={Developers} />
          <Route path="/organizations/:section?" component={Organizations} />
          <Route path="/search" component={Search} />
          <Route path="/activity/:section?" component={Activity} />
          <Redirect to="/" />
        </Switch>
      </div>
      <Notifications />
      <AppLoader />
    </div>
  </HashRouter>
);

export default App;
