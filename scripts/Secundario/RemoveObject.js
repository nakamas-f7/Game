import { controls } from "../util/controls.js"

export class RemoveObject{
    #Object
    constructor(Object){
        this.#Object = Object
    }

    get Object(){
        return this.#Object
    }

    get RemoveObject(){
        return this.#RemoveObject
    }

    #RemoveObject(){
        const elemento = document.getElementById(this.Object)
        elemento.parentNode.removeChild(elemento)

    }
}