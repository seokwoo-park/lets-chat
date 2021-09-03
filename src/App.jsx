import { Route, Switch } from 'react-router-dom';
import { Chat, Login, Singup } from './components';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Chat} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Singup} />
    </Switch>
  );
};

export default App;
