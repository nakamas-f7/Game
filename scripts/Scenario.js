import {FindLocation} from "./Classes.js"
import {MoveObject} from "./Classes.js"

class Scenario{
    constructor(Object, Box){
        this.Object = Object
        this.Box = Box
        this.move = new MoveObject(Object, Box, [10, 0], "-", "+", "px")
        this.Location = new FindLocation(Box, Object)
    }


    get GetMoveSky(){
        return this.#MoveSky
    }

    #MoveSky(){
        
    }

    
}

const Sky = document.getElementById('Nuvem')
const Box = document.querySelector('main')

const Executar = new Scenario(Sky, Box)

Executar.GetSky()