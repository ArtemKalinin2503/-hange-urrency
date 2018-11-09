import { combineReducers } from 'redux';
import axios from 'axios'; //Axios вместо fetch для сетевого запроса
//Создаем actions с помощью расширения createAction (каждый action будет получать состояние и изменять его)
export const actionTotal = (total) => {return {type: "Action_Total", payload: total}};
//Actions для get запроса
export const fetchStarted = (isFetched)=>{return {type: "Is_Fetched", payload: isFetched}};
export const fetchResult = (result)=>{return {type: "Get_Result", payload: result}};
export const fetchError = (error)=>{return {type: "Get_Error", payload: error}};

//Создадим состояния с помощью метода initState (в каждое состояние передан тип данных которое мы ожидаем записать в каждое состояние)
export const initState = {
    total: 0,
    //Состояние для сетевого запроса
    isFetching: false,
    fetchResult: [],
    fetchError: null    
};

//Создадим редьюсер в котором опишем, что должен делать каждый action
const mainReducer = (state = initState, action) => {
    //С помощью конструкции switch case опишем каждый action
    switch(action.type) {
        case "Action_Total":
            return {
                ...state,
                total: action.payload
        };
        case "Is_Fetched":
            return {
                ...state,
                isFetching: action.payload
            };
        case "Get_Result":
            return {
                ...state,
                fetchResult: action.payload
            };
        case "Get_Error": 
            return {
                ...state,
                fetchError: action.payload
            }            
        default:
            return state;    
    }
};

//Thunk компонент getData для Get запроса 
export const getData = () => {
    return (dispatch) => {
        dispatch(fetchStarted(true));
        var api = axios.create({
            baseURL: 'http://localhost:3000/'
        })
        api.get("https://www.cbr-xml-daily.ru/daily_json.js") //С данного сервера получаем курсы валют
        .then(result => {
            dispatch(fetchResult(result.data));
        },
        err => {
            dispatch(fetchError(err.status));
        });
    }
}

//Передаим созданный редьюсер mainReducer в расширение combineReducers
const todoApp = combineReducers ({
    mainReducer
});
  
export default todoApp;  