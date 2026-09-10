import './scss/styles.scss';

import { apiProducts } from './utils/data'
import { Products } from './components/models/Products';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Api, AppApi } from './components/base/Api';
import { API_URL } from './utils/constants';

const productsModel = new Products();
productsModel.setItems(apiProducts.items);
console.log(`Массив товаров из каталога: `, productsModel.getItems())

const basketModel = new Basket();

const testProduct = productsModel.getItems()[0];

if (testProduct) {
    basketModel.setItems(testProduct);
    console.log(`Товаров в корзине после добавления: `, basketModel.getnumberItems());
    console.log(`Общая стоимость корзины: `, basketModel.allPrices());
    console.log(`Есть ли товар в корзине? `, basketModel.hasnumberItems(testProduct.id));

    basketModel.delete(testProduct.id);
    console.log(`Товаров в корзине после удаления: `, basketModel.getnumberItems());
    basketModel.clean();
    console.log(`Товаров в корзине после метода clean: `, basketModel.getnumberItems());
}

const buyerModel = new Buyer();
buyerModel.setBuyerData({ address: 'Улица Пушкина' });
console.log(`Данные покупателя: `, buyerModel.getBuyerData());
console.log(`Валидация (должна быть false): `, buyerModel.validateBuyer());
console.log(`Текст ошибки: `, buyerModel.getErrors());
const appApi = new AppApi(new Api(API_URL));

appApi.getProducts()
    .then((res) => {
        // в обработчике берем из полученного объекта массив товаров (res.items) и перезаписываем его
        productsModel.setItems(res.items);

        // проверка сохраненного каталога
        console.log(`Массив товаров, успешно загруженный с сервера: `, productsModel.getItems());
    })
    .catch((err) => {
        console.error(`Ошибка при запросе к серверу: `, err);
    });