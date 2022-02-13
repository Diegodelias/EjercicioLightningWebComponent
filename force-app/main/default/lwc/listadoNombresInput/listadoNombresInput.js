import { LightningElement, api } from 'lwc';

export default class ListadoNombresInput extends LightningElement {
    @api nombres
    @api agregarContactoLista(strNombre){
       

       
        const nombreNuevo = new CustomEvent('nombrenuevo', { detail : strNombre
         });
        this.dispatchEvent(nombreNuevo)

    }


}