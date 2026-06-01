export class HeaderComponent {
    constructor(parent) { this.parent = parent; }
    getHTML() { return `<header class="header"><a class="header__brand">💰 Финансы</a><button id="home-button" class="header__home-btn">🏠 Домой</button></header>`; }
    addListeners(listener) { document.getElementById("home-button").addEventListener("click", listener); }
    render(listener) { this.parent.insertAdjacentHTML('beforeend', this.getHTML()); this.addListeners(listener); }
}