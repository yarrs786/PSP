export class ProductComponent {
    constructor(parent) { this.parent = parent; }
    getHTML(data) {
        const isIncome = data.type === 'доход';
        return `<div class="product-card"><div class="product-card__header"><h3 class="product-card__title">${data.title}</h3><span class="product-card__badge ${isIncome?'product-card__badge--income':'product-card__badge--expense'}">${data.type}</span></div><div class="product-card__amount ${isIncome?'product-card__amount--income':'product-card__amount--expense'}">${isIncome?'+':'−'}${data.amount} ₽</div><div class="product-card__info"><strong>Дата:</strong> ${data.date||''}</div><div class="product-card__info"><strong>Описание:</strong> ${data.description||''}</div><hr class="product-card__divider"><button id="delete-product-btn" class="card__btn card__btn--danger">🗑 Удалить</button></div>`;
    }
    addListeners(deleteListener) {
        document.getElementById("delete-product-btn").addEventListener("click", deleteListener);
    }
    render(data, deleteListener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        if (deleteListener) this.addListeners(deleteListener);
    }
}