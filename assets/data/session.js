
class session {
    constructor() {
        this.id = null;
        this.currentIdProd = null;
        this.search = null;
        this.card = null;
        this.rateUserId = null;
    }
    userId = (id) => {
        if (!id) return this.id;
        this.id = id;
    }
    productId = (idP) => {
        if (!idP) return this.currentIdProd;
        this.currentIdProd = idP;
    }
    searchWord = (word) => {
        if (!word) return this.search;
        this.search = word;
    }
    cardId = (id) => {
        if(!id) return this.card;
        this.card = id;
    }
    userRate = (id) => {
        if (!id) return this.rateUserId
        this.rateUserId = id;
    }
}
const instance = new session()
export default instance;