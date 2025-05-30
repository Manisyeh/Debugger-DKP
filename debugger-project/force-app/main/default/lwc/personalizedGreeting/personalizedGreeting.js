import { LightningElement, track } from 'lwc';

export default class PersonalizedGreeting extends LightningElement {
    @track userName = ''; // Reactive property to store the input name

    get greetingMessage() {
        return this.userName ? `Hello, ${this.userName}!` : 'Hello, Guest!';
    }

    handleNameChange(event) {
        this.userName = event.target.value;
    }
}