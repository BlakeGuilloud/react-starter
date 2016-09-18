import { Provider }               from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore }   from 'react-router-redux';
import ReactDOM                   from 'react-dom';
import React                      from 'react';

import routes from './routes';
import store  from './store';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}><Router history={history} routes={routes} /></Provider>, document.getElementById('app')
);
