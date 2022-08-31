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
        let Right = true

        const box = document.querySelector('main')
        const Player = document.getElementById('Player')
        
        const Location = new FindLocation(box, Player)

        function Move(Direction){
            const ObjectLeft = Location.GetLocation()[4]

            if(Direction === "Left"){
                if(ObjectLeft >= 0){
                    const MoveLeft = new MoveObject(Player, box, [5, 0], "-", "+", "px")
                    MoveLeft.GetMoveLocation()
                }else{
                    console.log("Limite alcançado")
                } 
            }else if(Direction === "Right"){
                if(ObjectLeft >= 0){
                    const MoveRight = new MoveObject(Player, box, [5, 0], "+", "+", "px")
                    MoveRight.GetMoveLocation()
                }else{
                    console.log("Limite alcançado")
                } 
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
                    console.log("Algum erro Left")
                }
            }else if(button === buttons[2]){
                if(Right === true){
                    Right = false
                    return true
                }else if(Right === false){
                    return false
                }else{
                    console.log("Algum erro em Right")
                }
            }
        }
        const buttons = this.Buttons
        document.onkeydown = function(event){
            if(event.code === buttons[0]){
                if(verification(buttons[0]) === true){
                    Move("Left")
                    Left = true
                }
            }else if(event.code === buttons[2]){
                if(verification(buttons[2]) === true){
                    Move("Right")
                    Right = true
                }
            }
        }
    }
}
const Player = document.getElementById('Player')

const Classe = new Controls(Player,["KeyA", "KeyW", "KeyD", "KeyS"])

Classe.GetControl()