import React, { Component } from 'react';
import { connect } from 'react-redux'; //connect нужен для связи компонента со store
import store from '../store';
import {getData, actionTotal} from '../reducers'; //импортируем actions

class ChangeСurrency extends Component {
    //Компонент componentDidMount сработает сразу после загрузки
    componentDidMount() {
        this.props.fetchData(); //Вызываем thunk getData для получения ответа от сервера 
    }
    //Компонент с полем Рубли
    handleChangeRub = event => {
        let inpRub = parseInt(event.target.value); //Получим значение поля с Рублями
        let cursEuro = this.props.apiData.Valute.EUR.Value; //Получим ответ от сервера
        let courseTotal = inpRub / cursEuro;
        let total = parseFloat(courseTotal.toFixed(1)); //Приводим к типу
        store.dispatch(actionTotal(total));
    };

    render() {
        return (
            <div className="convector">
                <h1 className="convector__title">Конвектор валют</h1>
                <form className="convector__form">
                    <label>
                        <p>Введите сумму в рублях</p>
                        <input type="number" className="convector__input convector__input_rub" onChange={this.handleChangeRub} />
                    </label>
                    <label>
                        <p>Cумма в евро</p>
                        <input type="number" className="convector__input convector__input_euro" value={this.props.total} /> 
                    </label>
                </form>
            </div>
        )
    }
};

//Для связи со store
const mapStateToProps = (state,ownProps={}) => ({
    total: state.mainReducer.total,
    apiData: state.mainReducer.fetchResult,
    apiFetching: state.mainReducer.isFetching   
});

//Передаем thunk компонент
const mapDispatchToProps = {
    fetchData: getData
}

//Обвернем данный компонент в connect для свзяи с хранилищем
const ComponentChange = connect (
    mapStateToProps,
    mapDispatchToProps
)(ChangeСurrency);

export default ComponentChange;