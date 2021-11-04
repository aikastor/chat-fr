import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/:roomId" component={Chat}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
