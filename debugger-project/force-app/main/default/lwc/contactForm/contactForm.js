import { LightningElement, api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ContactForm extends LightningElement {
    @api recordId;

    handleSuccess(){
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message:'Contact Saved successfully by Deepak',
                variant: 'success'
            })
        );
        this.handleCancel();
    }

    handleCancel(){
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        inputFields.forEach(field => field.reset());
    }       
}