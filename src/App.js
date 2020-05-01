import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import Todo from './containers/Todo'
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  )
}

export default App;
