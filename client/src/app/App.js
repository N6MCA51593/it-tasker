import React from 'react';
import { Provider } from 'react-redux';
import Geometry from 'features/geometry/Geometry';
import store from 'app/store';
import 'styles/App.scss';

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <Geometry />
      </div>
    </Provider>
  );
};

export default App;
