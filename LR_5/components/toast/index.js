export class ToastComponent {
    constructor(message, type = 'success') { this.message = message; this.type = type; }
    show() {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const id = `toast-${Date.now()}`;
        container.insertAdjacentHTML('beforeend', `<div id="${id}" class="toast toast--${this.type}"><span>${this.message}</span><button class="toast__close" onclick="document.getElementById('${id}').remove()">✕</button></div>`);
        setTimeout(() => { const el = document.getElementById(id); if (el) el.remove(); }, 3000);
    }
}