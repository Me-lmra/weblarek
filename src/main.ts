import './scss/styles.scss';

import { Products } from './components/models/Products';
import {IProduct, IOrderRequest } from './types'
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Api } from './components/base/Api';
import { AppApi } from './components/AppApi';
import { API_URL } from './utils/constants';
import { EventEmitter } from "./components/base/Events";

import { Header } from "./components/Views/Header";
import { Modal } from "./components/Views/Modal";
import { CatalogCard, BasketCard, PreviewCard } from "./components/Views/Card";
import { ModalBasket } from "./components/Views/Basket";
import { OrderForm, ContactsForm } from "./components/Views/Form";
import { SuccessOrder } from "./components/Views/Success";
import { Gallery } from "./components/Views/Gallery";
import { ensureElement, cloneTemplate } from "./utils/utils";


const events = new EventEmitter();
const productsModel = new Products(events);
const basketModel = new Basket(events);



const api = new Api(API_URL);
const appApi = new AppApi(api);

// глобальные компоненты
const headerView = new Header(ensureElement<HTMLElement>('.header'), events);
const galleryView = new Gallery(ensureElement<HTMLElement>('.gallery'), events);

console.log('Шапка сайта готова к обновлению счётчика:', headerView);

//модальное окно
const modalContainer = ensureElement<HTMLElement>('#modal-container');
const modalView = new Modal(modalContainer, events);
const buyerModel = new Buyer(events);

// шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// экземпляр карточки
const previewCardView = new PreviewCard(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
        // При клике на кнопку превью смотрим, какой товар сейчас выбран в модели, и отправляем его в корзину
        const selectedItem = productsModel.getSelectedItem();
        if (selectedItem) {
            events.emit('card:toBasket', selectedItem);
        }
    }
});

// модели для модального окна
const basketView = new ModalBasket(cloneTemplate(basketTemplate), events);
const orderFormView = new OrderForm(cloneTemplate(orderTemplate), events);
const contactsFormView = new ContactsForm(cloneTemplate(contactsTemplate), events);
const successOrderView = new SuccessOrder(cloneTemplate(successTemplate), events);



// изменение каталога
events.on('catalog:changed', () => {
    galleryView.catalog = productsModel.getItems().map((item: IProduct) => {
        const cardElement = cloneTemplate(cardCatalogTemplate);
        const catalogCard = new CatalogCard(cardElement, {
            onClick: () => events.emit('card:select', item)
        });

        catalogCard.title = item.title;
        catalogCard.price = item.price;
        catalogCard.image = item.image;
        catalogCard.category = item.category;

        return catalogCard.render();
    });
});

// выбор карточки для просмотра в каталоге
events.on('card:select', (item: IProduct) => {
    productsModel.setSelectedItem(item);
});

// открытие модального окна и рендер превью
events.on<{ item: IProduct }>('card:selected', (data)=> {
    if (data && data.item) {
        previewCardView.title = data.item.title;
        previewCardView.price = data.item.price;
        previewCardView.image = data.item.image;
        previewCardView.category = data.item.category;
        previewCardView.description = data.item.description;

        previewCardView.buttonText = basketModel.hasItem(data.item.id) ? 'Удалить из корзины' : 'В корзину';

        modalView.content = previewCardView.render();
        modalView.open();
    }
});

// «В корзину» / «Удалить» в превью
events.on('card:toBasket', (item: IProduct) => {
    if (basketModel.hasItem(item.id)) {
        basketModel.delete(item.id);
    } else {
        basketModel.addItem(item);
    }
});

// изменение содержимого корзины
events.on('basket:changed', () => {
    headerView.counter = basketModel.getItemsCount();

    let index = 1;
    basketView.items = basketModel.getItems().map((item: IProduct) => {
        const cardElement = cloneTemplate(cardBasketTemplate);
        const basketCard = new BasketCard(cardElement, {
            onClick: () => events.emit('card:remove', item)
        });
        basketCard.title = item.title;
        basketCard.price = item.price;
        basketCard.index = index++;
        return basketCard.render();
    });

    basketView.total = basketModel.getTotalPrice();
    basketView.valid = basketModel.getItemsCount() > 0;

    const selectedItem = productsModel.getSelectedItem();
    if (selectedItem) {
        previewCardView.buttonText = basketModel.hasItem(selectedItem.id) ? 'Удалить из корзины' : 'В корзину';
    }
});

// удаление товара
events.on('card:remove', (item: IProduct) => {
    basketModel.delete(item.id);
});

// кнопка корзины
events.on('basket:open', () => {
    events.emit('basket:changed');
    modalView.content = basketView.render();
    modalView.open();
});

const headerBasketButton = ensureElement<HTMLButtonElement>('.header__basket');
headerBasketButton.addEventListener('click', () => {
    events.emit('basket:open');
});



// кнопка "Оформить"
events.on('basket:order', () => {
    buyerModel.clearBuyerData();
    modalView.content = orderFormView.render({
        valid: true,
        errors: ''
    });
});

// текст в инпут адреса
events.on('order.address:change', (data: { field: string; value: string }) => {
    buyerModel.setOrderField('address', data.value);
});

// кнопок оплаты
events.on('order.payment:change', (data: { target: 'card' | 'cash' }) => {
    buyerModel.setOrderField('payment', data.target);
    orderFormView.payment = data.target; // подсвечиваем кнопку
});

// текст в инпут email
events.on('contacts.email:change', (data: { field: string; value: string }) => {
    buyerModel.setOrderField('email', data.value);
});

// текст в инпут телефона
events.on('contacts.phone:change', (data: { field: string; value: string }) => {
    buyerModel.setOrderField('phone', data.value);
});

// клик «Далее»
events.on('order:submit', () => {
    const allErrors = buyerModel.validate();
    const orderErrors = [allErrors.payment, allErrors.address].filter(Boolean);

    if (orderErrors.length > 0) {
        orderFormView.errors = orderErrors.join('. ');
        return;
    }

    modalView.content = contactsFormView.render({
        valid: true,
        errors: ''
    });
});

// клик «Оплатить»
events.on('contacts:submit', () => {
    const allErrors = buyerModel.validate();
    const contactsErrors = [allErrors.email, allErrors.phone].filter(Boolean);

    if (contactsErrors.length > 0) {
        contactsFormView.errors = contactsErrors.join('. ');
        return;
    }

    const finalOrder: IOrderRequest = {
        ...buyerModel.getBuyerData(),
        items: basketModel.getItems().map(item => item.id),
        total: basketModel.getTotalPrice()
    };

    appApi.createOrder(finalOrder)
        .then((result) => {
            modalView.content = successOrderView.render({ total: result.total });
        })
        .catch((err) => {
            console.error(err);
            contactsFormView.errors = 'Не удалось отправить заказ.';
        });
});

// закрытие окна подтверждения
events.on('success:close', () => {
    basketModel.clean();
    buyerModel.clearBuyerData();
    modalView.close();
});



appApi.getProducts()
    .then((res) => {
        console.log('1. Данные с сервера успешно пришли:', res);
        productsModel.setItems(res.items);

        console.log('Массив товаров, успешно загруженный с сервера: ', productsModel.getItems());
    })
    .catch((err) => {
        console.error('Ошибка при запросе к серверу: ', err);
    });



