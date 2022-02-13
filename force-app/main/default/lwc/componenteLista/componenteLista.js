import { LightningElement,wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';





export default class ComponenteLista extends LightningElement {

    @wire(getContactList) contacts;
    
    

    connectedCallback(){
        
    }

}