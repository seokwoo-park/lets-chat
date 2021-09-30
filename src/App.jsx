import { Route, Switch } from 'react-router-dom';
import { Chat, Login, Singup } from './components';

const App = () => {
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
