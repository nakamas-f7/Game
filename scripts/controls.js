import {FindLocation} from "./Classes.js"
import {MoveObject} from "./Classes.js"

class controls{
    constructor(Object){
        this.Object = Object
        
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
                          
            }else{
                console.log("Limite alcançado")
            }

            
        }

        function verification(button){
            if(button === "KeyA"){
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
            console.log(event)
            if(event.code === "KeyA"){
                if(verification("KeyA") === true){
                    Move()
                    Left = true
                }
            }
        }
    }

}

const gif = document.getElementById('gif')

const Classe = new controls(gif)

Classe.GetControl()