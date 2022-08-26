import {FindLocation} from "./Classes.js"
import {MoveObject} from "./Classes.js"

class Controls{
    constructor(Object, Buttons){
        this.Object = Object
        this.Buttons = Buttons
        
    }

    get GetControl(){
        return this.#controls
    }

    #controls(){
        let Left = true

        const box = document.querySelector('main')
        const bola = document.getElementById('gif')

        
        const Location = new FindLocation(box, bola)
        
        

        function Move(){
            
            const ObjectLeft = Location.GetLocation()[4]
            const ObjectRight = Location.GetLocation()[6]

            if(ObjectLeft >= 0 && ObjectRight >= 0){
                const move = new MoveObject(bola, box, [10, 0], "-", "+", "px")

                move.GetMoveLocation()

                console.log("cheguei") 
            }else{
                console.log("Limite alcançado")
            } 
        }

        function verification(button){
            if(button === buttons[0]){
                if(Left === true){
                    Left = false
                    return true
                }else if(Left === false){
                    return false
                }else{
                    console.log("Algum erro")
                }
            }
        }
        const buttons = this.Buttons
        document.onkeydown = function(event){
            if(event.code === buttons[0]){
                if(verification(buttons[0]) === true){
                    Move()
                    Left = true
                }
            }
        }
    }

}

const gif = document.getElementById('gif')

const Classe = new Controls(gif,["KeyA", "KeyW", "KeyD", "KeyS"])

Classe.GetControl()