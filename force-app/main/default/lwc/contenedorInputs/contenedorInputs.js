import { LightningElement , track } from 'lwc';
import InsertContact from '@salesforce/apex/ContactController.InsertContact';
import FNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LNAME_FIELD from '@salesforce/schema/Contact.LastName';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ContenedorInputs extends LightningElement {


fname = FNAME_FIELD;
lname =LNAME_FIELD;

rec= {
    FNAME:this.fname,
    LNAME:this.lname

}

filaVacia = [];
@track contacts =[
        
        ];
        
        reloadListadoNombres(event){
            console.log(event.detail);
            const objChild = this.template.querySelector('c-listado-nombres-input');
            objChild.agregarContactoLista(event.detail);
        }

    
             guardarNombreNuevo(event){
                const nombresObj = {}
                nombresObj["Id"] = Date.now().toString();
                nombresObj["Name"]= event.detail;
                this.contacts.push(nombresObj)
                this.contacts.forEach((element,index,array)=>{
                ;
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
                        conData.LastName = 'garompa';
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
                                message: 'Contact created',
                                variant: 'success',
                            }),
                        );
                        this.contacts = [];
                    })
                    .catch((error) => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Error creating record',
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
            }
          
           

}