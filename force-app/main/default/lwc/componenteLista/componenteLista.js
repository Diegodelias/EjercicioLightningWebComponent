import { LightningElement,wire,track } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
import { subscribe,  MessageContext } from 'lightning/messageService';
import PASAR_DATA_CHANNEL from '@salesforce/messageChannel/Pasar_Data__c';
import { refreshApex } from '@salesforce/apex';





export default class ComponenteLista extends LightningElement {
    subscription = null;
    // @wire(getContactList) contacts;
     wiredcontactResutados;
    @wire(getContactList)
    imperativeWiring(result) {
        this.wiredcontactResutados = result;
        if(result.data) {
            this.myData = result.data;
        }
    }
     

  @wire(MessageContext)
  messageContext;


  


  subscribeToMessageChannel() {
    this.subscription = subscribe(
        this.messageContext,
        PASAR_DATA_CHANNEL,
            (message) => this.recargarComponente(message)
    );
}





    connectedCallback(){
        // if(!this.subscription){
        //     this.subscription = subscribe(
        //         this.MessageContext,Pasar_Data_CHANNEL,
        //         (message)=>this.recargarComponente(message)
        //     );
        // }

        this.subscription = subscribe(
            this.messageContext,
            PASAR_DATA_CHANNEL,
            (message) => this.recargarComponente(message)
        );
    }


    recargarComponente(message){
        
        console.log("mensaje" + message.recargarListadoPrincipal)
        const recargar = message.recargarListadoPrincipal;
        if (recargar==true){
            
            return refreshApex(this.wiredcontactResutados);
        }

    }

}