import Main from './components/Main'
import './css/style.css'
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./features/store";

function App() {
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Main} />
            <Main />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
