import {FindLocation} from "./Classes.js"
import {MoveObject} from "./Classes.js"

class Scenario{
    constructor(Object, Box){
        this.Object = Object
        this.Box = Box
        this.move = new MoveObject(Object, Box, [10, 0], "-", "+", "px")
        this.Location = new FindLocation(Box, Object)
    }

    get GetSky(){
        return this.#Sky
    }

    #Sky(){
        let x = Number(this.Location.GetLocation()[4])
        
        if(x > 0){
            console.log(x)
            this.move.GetMoveLocation()
            x = Number(this.Location.GetLocation()[4])
            this.#Sky()
        }
    }
}

const Sky = document.getElementById('Nuvem')
const Box = document.querySelector('main')

const Executar = new Scenario(Sky, Box)

Executar.GetSky()