import 'react-native-gesture-handler';
import React from 'react'
import {decode, encode} from 'base-64'

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import Menu from './src/navigation/Navigate'
import reducers from "../notetaking-app/src/redux/reducers/index.reducers";
var middlewares = applyMiddleware(thunk);
const store = createStore(reducers, middlewares);

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

/**
 * This function calls on the functions
 * in other classes to let the user view the
 * application on the screen. 
 * 
 * @returns The UI of the application.
 */
export default function App() { 
  return (
    <Provider store={store}>
      <Menu/>
    </Provider>
  );
}



