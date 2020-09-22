import React from 'react';
import { Provider } from 'react-redux';
import GeometryDrawing from './components/geometry/GeometryDrawing';
import store from './store/store';
import './styles/App.scss';

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
