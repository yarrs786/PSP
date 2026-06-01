import { HeaderComponent } from "../../components/header/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ToastComponent } from "../../components/toast/index.js";
import { ajax } from "../../modules/ajax.js";
import { transactionUrls } from "../../modules/transactionUrls.js";

export class ProductPage {
    constructor(parent, id) { this.parent = parent; this.id = id; }
    getHTML() { return `<div id="product-page" class="product-page"></div>`; }
    getData() {
        ajax.get(transactionUrls.getTransactionById(this.id), (data) => { this.renderData(data); });
    }
    renderData(item) {
        if (!item) return;
        new ProductComponent(document.getElementById('product-page')).render(item, () => {
            ajax.delete(transactionUrls.deleteTransactionById(this.id), (data, status) => {
                new ToastComponent('Удалено', 'success').show();
                new MainPage(this.parent).render();
            });
        });
    }
    render() {
        this.parent.innerHTML = '';
        new HeaderComponent(this.parent).render(() => { new MainPage(this.parent).render(); });
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        new BackButtonComponent(document.getElementById('product-page')).render(() => { window.history.length > 1 ? window.history.back() : new MainPage(this.parent).render(); });
        this.getData();
    }
}
