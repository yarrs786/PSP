class TransactionUrls {
    constructor() { this.baseUrl = 'http://localhost:3000'; }
    getTransactions() { return `${this.baseUrl}/transactions`; }
    getTransactionById(id) { return `${this.baseUrl}/transactions/${id}`; }
    createTransaction() { return `${this.baseUrl}/transactions`; }
    updateTransactionById(id) { return `${this.baseUrl}/transactions/${id}`; }
    deleteTransactionById(id) { return `${this.baseUrl}/transactions/${id}`; }
}
export const transactionUrls = new TransactionUrls();