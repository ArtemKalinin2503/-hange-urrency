import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'; //Подключаем React-Redux
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'; //Для роутинга
import createStore from './store'; //Подключаем хранилище
import MainComponent from './components/MainComponent';

//Создадим store (хранилище)
const store = createStore;

//Обварачиваем основной компонет в расширение Provider для подключение хранилища 
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <Switch>
         <Route path="/" exact component={MainComponent}></Route> {/*exact - значит при загрузке страницы сразу отрисуем данный компонент  */}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

