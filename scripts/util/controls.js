import { FindLocation } from './FindLocation.js'
import { MoveObject } from '../Principal.js'

export class controls{

    #Object
    #Buttons
    #Andar
    #Evento
    #Connect

    constructor(Object, Buttons, Anda, Evento, Connect){
        this.#Object = Object
        this.#Buttons = Buttons
        this.#Andar = Anda
        this.#Evento = Evento
        this.#Connect = Connect
    }

    get Object(){
        return this.#Object
    }

    get Buttons(){
        return this.#Buttons
    }

    get Andar(){
        return this.#Andar
    }

    get Evento(){
        return this.#Evento
    }

    get Connect(){
        return this.#Connect
    }

    get GetControl(){
        return this.#controls
    }

    #controls(){
        let Left = true
        let Right = true
        const anda = this.Andar
        const Connect = this.Connect

        
        const box = document.querySelector('main')
        const Player = document.getElementById('Player')

        
        const Location = new FindLocation(box, Player)
        
        function Move(Direction){
            const ObjectLeft = Location.GetLocation()[4]
            if(Direction === "Left"){
                if(ObjectLeft >= 0){
                    const MoveLeft = new MoveObject(Player, box, [anda, 0], "-", null, "px", Connect)
                    MoveLeft.GetMoveLocation()
                    
                }else{
                    console.log("Limite alcançado")

                } 
            }else if(Direction === "Right"){
                if(ObjectLeft >= 0){
                    const MoveLeft = new MoveObject(Player, box, [anda, 0], "+", null, "px", Connect)
                    MoveLeft.GetMoveLocation()
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
        if(this.Evento === buttons[0]){
            if(verification(buttons[0]) === true){
                Move("Left")
                Left = true
            }
        }else if(this.Evento === buttons[2]){
            if(verification(buttons[2]) === true){
                Move("Right")
                Right = true
            }
        }        
    }
}