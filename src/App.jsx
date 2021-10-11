import { useAuth, useResolved } from './hooks';
import { Chat, Login, Singup } from './components';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const App = () => {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);

  useEffect(() => {
    if (authResolved) {
      history.push(!!authUser ? '/' : '/login');
    }
  }, [authResolved, authUser, history]);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Chat} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Singup} />
      </Switch>
    </div>
  );
};

export default App;
