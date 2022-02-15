import { LightningElement, wire, api } from 'lwc';


export default class InputCargaDatos extends LightningElement {

  

    @api nombre;
    @api apellido;
    data = {name: this.nombre , lastname: this.apellido};
 
    nombreOnChange(event) {

        if (event.target.name == 'input1'){
            this.nombre = event.target.value;

        } else if (event.target.name == 'input2'){

            this.apellido = event.target.value;
        }
        
    }


    guardarNombre() {
        const nombreGuardado = new CustomEvent('pasarnombre', { detail : {name: this.nombre , lastname: this.apellido} });
        this.dispatchEvent(nombreGuardado)
        this.template.querySelector('lightning-input[data-name="input1"]').value = null; 
        this.template.querySelector('lightning-input[data-name="input2"]').value = null; 
    }

    
}