class Ajax {
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = () => { if (xhr.readyState === 4) this._handle(xhr, callback); };
    }
    post(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = () => { if (xhr.readyState === 4) this._handle(xhr, callback); };
    }
    patch(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('PATCH', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = () => { if (xhr.readyState === 4) this._handle(xhr, callback); };
    }
    delete(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', url);
        xhr.send();
        xhr.onreadystatechange = () => { if (xhr.readyState === 4) this._handle(xhr, callback); };
    }
    _handle(xhr, callback) {
        try { callback(JSON.parse(xhr.responseText), xhr.status); }
        catch (e) { callback(null, xhr.status); }
    }
}
export const ajax = new Ajax();