import React from 'react';
import { Provider } from 'react-redux';
import MainContainer from './MainContainer';
import store from 'app/store';
import 'styles/App.scss';

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <MainContainer />
      </div>
    </Provider>
  );
};

export default App;
