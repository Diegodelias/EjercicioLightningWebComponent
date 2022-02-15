import { LightningElement , track, wire } from 'lwc';
import InsertContact from '@salesforce/apex/ContactController.InsertContact';
import FNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LNAME_FIELD from '@salesforce/schema/Contact.LastName';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { publish, MessageContext} from 'lightning/messageService';
import PASAR_DATA_CHANNEL from '@salesforce/messageChannel/Pasar_Data__c';
export default class ContenedorInputs extends LightningElement {

    @wire(MessageContext) MessageContext;

fname = FNAME_FIELD;
lname =LNAME_FIELD;

recargarListadoPrincipal = true;

rec= {
    FNAME:this.fname,
    LNAME:this.lname

}

filaVacia = [];
@track contacts =[
        
        ];
        
        reloadListadoNombres(event){
            console.log('evetn detail' + (event.detail.name));
            const objChild = this.template.querySelector('c-listado-nombres-input');
            objChild.agregarContactoLista(event.detail);
        }

    
             guardarNombreNuevo(event){
                const nombresObj = {}
                nombresObj["Id"] = Date.now().toString();
                nombresObj["Name"]= event.detail.name;
                nombresObj["LastName"]= event.detail.lastname;

                this.contacts.push(nombresObj)
                this.contacts.forEach((element,index,array)=>{
                
            });

               
             }


             saveData(){
                let contacts = this.contacts;
                let contactDataList = [];
                for(let i = 0; i < contacts.length; i++){
                    if(contacts[i] !== undefined ){
                        let conData = new Object();
                        console.log("primer nombre lapqtp" + contacts[i].Name);
                        conData.FirstName = contacts[i].Name;
                        conData.LastName = contacts[i].LastName;;
                        console.log(conData);
                        contactDataList.push(conData);
                        console.log("primer nombre cargo?" + conData.FirstName);
                    }
                }
                if(contactDataList.length > 0){
                    InsertContact({contactDataString: JSON.stringify(contactDataList)}).then(() => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Success',
                                message: 'Contact creado con exito',
                                variant: 'success',
                            }),
                        );
                        this.contacts = [];
                        const payload = { recargarListadoPrincipal: this.recargarListadoPrincipal };

                        publish(this.MessageContext, PASAR_DATA_CHANNEL , payload);
                    })
                    .catch((error) => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Error al crear contacto',
                                message: error.body.message,
                                variant: 'error',
                            }),
                        );
                        console.log('error', JSON.stringify(error));
                    });




                    //
                }else{
                    window.alert('Please select any row to insert data.');
                }



                //

               
            }
          
           

}