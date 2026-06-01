import { HeaderComponent } from "../../components/header/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { RedactPage } from "../redact/index.js";
import { ToastComponent } from "../../components/toast/index.js";
import { ajax } from "../../modules/ajax.js";
import { transactionUrls } from "../../modules/transactionUrls.js";

export class MainPage {
    constructor(parent) { this.parent = parent; this.data = []; }
    getHTML() {
        return `<div id="toast-container" class="toast-container"></div><div id="main-page" class="main-page"><div class="main-page__header"><h2 class="main-page__title">📊 Список транзакций</h2><button id="add-button" class="main-page__add-btn">➕ Добавить</button></div><div class="filter-row"><input id="filter-input" class="filter-input" placeholder="🔍 Фильтр по названию..."><button id="filter-btn" class="filter-btn">Найти</button><button id="filter-reset" class="filter-btn">Сброс</button></div><div id="cards-container" class="cards-container"></div></div>`;
    }
    getData(title = '') {
        let url = transactionUrls.getTransactions();
        if (title) url += `?title=${encodeURIComponent(title)}`;
        ajax.get(url, (data) => { this.data = data || []; this.renderCards(this.data); });
    }
    renderCards(items) {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        items.forEach(item => {
            new ProductCardComponent(container).render(item,
                (e) => { new ProductPage(this.parent, e.target.dataset.id).render(); },
                (e) => { new RedactPage(this.parent, e.target.dataset.id).render(); },
                (e) => { this.deleteCard(e.target.dataset.id); }
            );
        });
    }
    deleteCard(id) {
        ajax.delete(transactionUrls.deleteTransactionById(id), (data, status) => {
            new ToastComponent(status === 204 || status === 200 ? 'Удалено' : 'Ошибка', status === 204 || status === 200 ? 'success' : 'danger').show();
            this.getData();
        });
    }
    render() {
        this.parent.innerHTML = '';
        new HeaderComponent(this.parent).render(() => { new MainPage(this.parent).render(); });
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        document.getElementById('add-button').addEventListener('click', () => { new RedactPage(this.parent).render(); });
        document.getElementById('filter-btn').addEventListener('click', () => { this.getData(document.getElementById('filter-input').value); });
        document.getElementById('filter-reset').addEventListener('click', () => { document.getElementById('filter-input').value = ''; this.getData(); });
        this.getData();
    }
}