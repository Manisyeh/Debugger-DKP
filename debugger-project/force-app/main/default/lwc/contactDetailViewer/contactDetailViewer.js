import { LightningElement, api } from 'lwc';

export default class ContactDetailViewer extends LightningElement {
    @api contact;

    handleClear() {
        this.dispatchEvent(new CustomEvent('clearselection'));
    }
}