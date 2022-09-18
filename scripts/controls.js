import {FindLocation} from "./Classes.js"
import {MoveObject} from "./Classes.js"
import {Connection} from "./Classes.js"

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
        const Caixa = document.getElementById("Caixa")
        const Player = document.getElementById('Player')
        
        const Location = new FindLocation(box, Player)

        function Move(Direction){
            const ObjectLeft = Location.GetLocation()[4]
            if(Direction === "Left"){
                let ConexaoX = new Connection(Player, ["+", 0, "px", box], [Caixa])
                if(ObjectLeft >= 0){
                    if(ConexaoX.GetVerification()[2] === true){
                        const MoveLeft = new MoveObject(Player, box, [ConexaoX.GetVerification()[0], 0], "-", "+", "px")
                        let Conexao = new Connection(Player, ["+", ConexaoX.GetVerification()[1], "px", box], [Caixa])
                        MoveLeft.GetMoveLocation()
                        Conexao.GetConnection()
                    }else if(ConexaoX.GetVerification()[2] === false){ 
                        console.log("travou Esquerda")
                    }
                }else{
                    console.log("Limite alcançado")
                } 
            }else if(Direction === "Right"){
                let ConexaoX = new Connection(Player, ["-", 0, "px", box], [Caixa])
                if(ObjectLeft >= 0){
                    if(ConexaoX.GetVerification()[3] === true){
                        const MoveRight = new MoveObject(Player, box, [ConexaoX.GetVerification()[0], 0], "+", "+", "px")
                        let Conexao = new Connection(Player, ["-", ConexaoX.GetVerification()[1], "px", box], [Caixa])
                        MoveRight.GetMoveLocation()
                        Conexao.GetConnection()
                    }else if(ConexaoX.GetVerification()[3] === false){
                        console.log("travou Direita")
                    }
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