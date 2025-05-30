import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactListDisplay extends LightningElement {
    @track searchKey = '';
    @track filteredContacts = [];
    @track error;

    // Define datatable columns
    columns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Email', fieldName: 'Email', type: 'email' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' }
    ];

    // Wire Apex method to fetch contacts
    @wire(getContacts)
    wiredContacts({ error, data }) {
        if (data) {
            this.filteredContacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = 'Error fetching contacts: ' + error.body.message;
            this.filteredContacts = [];
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Failed to load contacts.',
                    variant: 'error'
                })
            );
        }
    }

    handleSearchChange(event) {
        this.searchKey = event.target.value.toLowerCase();
        this.filterContacts();
    }

    filterContacts() {
        if (!this.searchKey) {
            // Reset to original list if search is empty
            getContacts()
                .then(result => {
                    this.filteredContacts = result;
                })
                .catch(error => {
                    this.error = 'Error filtering contacts: ' + error.body.message;
                });
        } else {
            // Filter contacts by name
            getContacts()
                .then(result => {
                    this.filteredContacts = result.filter(contact =>
                        contact.Name.toLowerCase().includes(this.searchKey)
                    );
                })
                .catch(error => {
                    this.error = 'Error filtering contacts: ' + error.body.message;
                });
        }
    }
}