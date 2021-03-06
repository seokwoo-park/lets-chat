import { useEffect } from 'react';
import { ChatProvider } from 'context/ChatContext';
import 'semantic-ui-css/semantic.min.css';
import { useAuth, useResolved } from './hooks';
import { Chat, Login, Singup } from './components';
import { Switch, Route, useHistory } from 'react-router-dom';

const App = () => {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);

  useEffect(() => {
    if (authResolved) {
      history.push(!!authUser ? '/' : '/login');
    }
  }, [authResolved, authUser, history]);

  return authResolved ? (
    <ChatProvider authUser={authUser}>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Singup} />
        </Switch>
      </div>
    </ChatProvider>
  ) : (
    <> Loading... </>
  );
};

export default App;
