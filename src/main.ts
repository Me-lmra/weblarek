import './scss/styles.scss';

import { apiProducts } from './utils/data'
import { Products } from './components/models/Products';
import { Api, AppApi } from './components/base/Api';
import { API_URL } from './utils/constants';

const productsModel = new Products();
productsModel.setItems(apiProducts.items);
console.log(`Массив товаров из каталога: `, productsModel.getItems())

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