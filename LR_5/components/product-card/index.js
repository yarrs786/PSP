export class ProductCardComponent {
    constructor(parent) { this.parent = parent; }
    getHTML(data) {
        const isIncome = data.type === 'доход';
        return `<div class="card"><div class="card__header"><h5 class="card__title">${data.title}</h5><span class="card__badge ${isIncome?'card__badge--income':'card__badge--expense'}">${data.type}</span></div><div class="card__amount ${isIncome?'card__amount--income':'card__amount--expense'}">${isIncome?'+':'−'}${data.amount} ₽</div><div class="card__date">${data.date||''}</div><div class="card__description">${data.description||''}</div><div class="card__actions"><button class="card__btn card__btn--primary" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button><button class="card__btn card__btn--edit" id="edit-card-${data.id}" data-id="${data.id}">✎</button><button class="card__btn card__btn--danger" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button></div></div>`;
    }
    addListeners(data, listener, editListener, deleteListener) {
        document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
        document.getElementById(`edit-card-${data.id}`).addEventListener("click", editListener);
        document.getElementById(`delete-card-${data.id}`).addEventListener("click", deleteListener);
    }
    render(data, listener, editListener, deleteListener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        this.addListeners(data, listener, editListener, deleteListener);
    }
}