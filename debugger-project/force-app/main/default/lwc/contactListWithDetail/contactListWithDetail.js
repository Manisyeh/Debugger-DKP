import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactListWithDetail extends LightningElement {
    @track searchKey = '';
    @track filteredContacts = [];
    @track selectedContact;
    @track error;

    columns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Email', fieldName: 'Email', type: 'email' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
        {
            label: 'View',
            type: 'button',
            typeAttributes: {
                label: 'View Details',
                name: 'view_details',
                variant: 'brand'
            }
        }
    ];

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
            getContacts()
                .then(result => {
                    this.filteredContacts = result;
                })
                .catch(error => {
                    this.error = 'Error filtering contacts: ' + error.body.message;
                });
        } else {
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

    handleRowAction(event) {
        const row = event.detail.row;
        this.selectedContact = { ...row }; // Create a copy to avoid mutating original data
    }

    handleClearSelection() {
        this.selectedContact = null;
    }
}