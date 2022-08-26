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
            const BoxWidth = Location.GetLocation()[2]

            if(ObjectLeft <= BoxWidth && ObjectLeft >= 0){
                
                const move = MoveObject(bola, box, [1, 1])
            }else{
                console.log("Limite alcançado")
            } 
        }

        function verification(button){
            if(button === this.Buttons[0]){
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
        document.onkeydown = function(event){
            console.log("foi")
            console.log(this.Buttons[0])
            if(event.code === this.Buttons[0]){
                if(verification(this.Buttons[0]) === true){
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