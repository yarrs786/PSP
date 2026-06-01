import { HeaderComponent } from "../../components/header/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ToastComponent } from "../../components/toast/index.js";
import { ajax } from "../../modules/ajax.js";
import { transactionUrls } from "../../modules/transactionUrls.js";

export class RedactPage {
    constructor(parent, id = null) { this.parent = parent; this.id = id; }
    getHTML(data = {}) {
        return `<div id="redact-page" class="product-page"><div class="product-card"><h3>${this.id?'Редактировать':'Добавить'} транзакцию</h3><div class="form-group"><label>Название</label><input id="form-title" value="${data.title||''}"></div><div class="form-group"><label>Тип</label><select id="form-type"><option value="доход" ${data.type==='доход'?'selected':''}>Доход</option><option value="расход" ${data.type==='расход'?'selected':''}>Расход</option></select></div><div class="form-group"><label>Сумма</label><input id="form-amount" type="number" value="${data.amount||''}"></div><div class="form-group"><label>Дата</label><input id="form-date" value="${data.date||''}"></div><div class="form-group"><label>Описание</label><textarea id="form-description">${data.description||''}</textarea></div><div class="form-actions"><button id="save-btn" class="card__btn card__btn--primary">💾 Сохранить</button><button id="cancel-btn" class="back-btn">Отмена</button></div></div></div>`;
    }
    getData() {
        if (!this.id) { this.renderForm({}); return; }
        ajax.get(transactionUrls.getTransactionById(this.id), (data) => { this.renderForm(data || {}); });
    }
    renderForm(data) {
        document.getElementById('redact-page').innerHTML = this.getHTML(data);
        document.getElementById('save-btn').addEventListener('click', () => {
            const body = { title: document.getElementById('form-title').value, type: document.getElementById('form-type').value, amount: Number(document.getElementById('form-amount').value), date: document.getElementById('form-date').value, description: document.getElementById('form-description').value };
            if (this.id) {
                ajax.patch(transactionUrls.updateTransactionById(this.id), body, () => { new ToastComponent('Обновлено', 'success').show(); new MainPage(this.parent).render(); });
            } else {
                ajax.post(transactionUrls.createTransaction(), body, () => { new ToastComponent('Добавлено', 'success').show(); new MainPage(this.parent).render(); });
            }
        });
        document.getElementById('cancel-btn').addEventListener('click', () => { new MainPage(this.parent).render(); });
    }
    render() {
        this.parent.innerHTML = '';
        new HeaderComponent(this.parent).render(() => { new MainPage(this.parent).render(); });
        this.parent.insertAdjacentHTML('beforeend', '<div id="redact-page" class="product-page"></div>');
        this.getData();
    }
}