// all url route definitions for react-router
import { App, Home } from './components';

const routes = {
  path: '/',
  component: App,
  indexRoute: { onEnter: (nextState, replace) => replace('/home') },
  childRoutes: [
    { path: 'home', component: Home },
  ],
};

export default routes;
