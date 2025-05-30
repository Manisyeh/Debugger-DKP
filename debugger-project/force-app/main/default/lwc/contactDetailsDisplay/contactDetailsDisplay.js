import { LightningElement, api } from 'lwc';

export default class ContactDetailsDisplay extends LightningElement {
    @api recordId; // Captures the record ID from the record page context
}