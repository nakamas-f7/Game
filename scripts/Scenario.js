import {FindLocation} from "./Classes.js"

class Scenario{
    constructor(Object, Box){
        this.Object = Object
        this.Box = Box
    }

    get GetMoveScenario(){
        return this.#MoveScenario
    }

    #MoveScenario(){
    }
}

const Sky = document.getElementById('Nuvem')
const Box = document.querySelector('main')

const Executar = new Scenario(Sky, Box)

Executar.GetSky()


