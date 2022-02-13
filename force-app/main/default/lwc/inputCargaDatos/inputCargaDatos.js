import { LightningElement, wire, api } from 'lwc';


export default class InputCargaDatos extends LightningElement {

  

    @api nombre;
 
    nombreOnChange(event) {
        this.nombre = event.target.value;
    }


    guardarNombre() {
        const nombreGuardado = new CustomEvent('pasarnombre', { detail : this.nombre });
        this.dispatchEvent(nombreGuardado)
    }

    
}