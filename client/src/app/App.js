import React from 'react';
import { Provider } from 'react-redux';
import GeometryDrawing from 'features/geometry/GeometryDrawing';
import store from 'app/store';
import 'styles/App.scss';

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <GeometryDrawing />
      </div>
    </Provider>
  );
};

export default App;
