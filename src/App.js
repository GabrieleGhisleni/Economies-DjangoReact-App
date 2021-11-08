import './css/style.css'

import Main from './components/Main'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./features/store";

function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <Main />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
