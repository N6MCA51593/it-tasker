import React from 'react';
import { Provider } from 'react-redux';
import store from 'app/store';
import MainContainer from './MainContainer';
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
