import './scss/styles.scss';

import { apiProducts } from './utils/data'
import { Products } from './components/models/Products';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Api } from './components/base/Api';
import { AppApi } from './components/AppApi';
import { API_URL } from './utils/constants';


const productsModel = new Products();

productsModel.setItems(apiProducts.items);
console.log('Массив товаров из каталога: ', productsModel.getItems())
console.log('Найденный товар по ID: ', productsModel.getItemById(productsModel.getItems()[0].id));
productsModel.setSelectedItem(productsModel.getItems()[0]);
console.log('Товар на экране: ', productsModel.getSelectedItem());


const basketModel = new Basket();
const testProduct = productsModel.getItems()[0];

if (testProduct) {
    basketModel.addItem(testProduct);

    console.log('Товаров в корзине после добавления: ', basketModel.getItemsCount());
    console.log('Общая стоимость корзины: ', basketModel.getTotalPrice());
    console.log('Есть ли товар в корзине? ', basketModel.hasItem(testProduct.id));

    basketModel.delete(testProduct.id);
    console.log('Товаров в корзине после удаления: ', basketModel.getItemsCount());

    basketModel.addItem(testProduct);
    basketModel.clean();
    console.log('Товаров в корзине после метода clean: ', basketModel.getItems());
}


const buyerModel = new Buyer();

buyerModel.setBuyerData({ address: 'Улица Пушкина' });
console.log('Данные покупателя до очистки: ', buyerModel.getBuyerData());
console.log('Валидация: ', buyerModel.validate());
buyerModel.clearBuyerData();
console.log('Данные покупателя после очистки: ', buyerModel.getBuyerData());


const api = new Api(API_URL);
const appApi = new AppApi(api);

appApi.getProducts()
    .then((res) => {
        // в обработчике берем из полученного объекта массив товаров (res.items) и перезаписываем его
        productsModel.setItems(res.items);

        // проверка сохраненного каталога
        console.log('Массив товаров, успешно загруженный с сервера: ', productsModel.getItems());
    })
    .catch((err) => {
        console.error('Ошибка при запросе к серверу: ', err);
    });