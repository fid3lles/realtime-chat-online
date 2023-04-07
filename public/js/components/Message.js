export class Message {
    constructor(message, isMyMessage){
        this.element = document.createElement('div');
        this.element.className = isMyMessage == true ? 'my-message' : 'their-message';
    }
}