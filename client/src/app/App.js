import React from 'react';
import { Provider } from 'react-redux';
import store from 'app/store';
import MainContainer from './MainContainer';
import 'styles/App.scss';
import ErrorBoundary from 'common/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className='App'>
          <MainContainer />
        </div>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
