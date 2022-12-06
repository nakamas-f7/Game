import { FindLocation } from './FindLocation.js'
import { MoveObject } from '../Principal.js'

// 5
let Left = true
let Right = true
let Pulo = true
let P = "andando1"
let seguranca = null
export class controls{
    #Object
    #Buttons
    #Andar
    #Evento
    #Connect
    #Altura

    constructor(Object, Buttons, Anda, Evento, Connect, Altura){
        this.#Object = Object
        this.#Buttons = Buttons
        this.#Andar = Anda
        this.#Evento = Evento
        this.#Connect = Connect
        this.#Altura = Altura
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

    get DadosPulo(){
        return this.#Altura
    }

    get GetControl(){
        return this.#controls
    }

    

    #controls(){
        const anda = this.Andar
        const Connect = this.Connect
        const pulodados = this.DadosPulo
        const box = document.querySelector('main')
        const Player = document.getElementById('Player')

        const Location = new FindLocation(box, Player)

        function Pulou(){

            if(Player.style.top === ("calc(100% - " + Location.GetLocation()[1] + "px)")){
                console.log("entrei aqui")
                seguranca = null
            }
            if(pulodados[2] != null){
                if(seguranca === null){
                    let porcentagem = (Number(pulodados[2][0]) / Number(Location.GetLocation()[3])) * 100
                    let valorAltura = Number(pulodados[2][1]) - porcentagem
                    valorAltura = " calc(" + valorAltura + "% - " + Location.GetLocation()[1] + "px)"
                    document.documentElement.style.setProperty("--Altura-Pulo", valorAltura)
                    seguranca = valorAltura
                }
                
            }

            const musica = document.getElementById("pulomusica")
            musica.play()

            Player.style.animation = "teste 1.8s linear"
            
            
        }
        function Move(Acao){
            const ObjectLeft = Location.GetLocation()[4]
            const andamusica = document.getElementById("andandomusica")
            if(Acao === "Left"){
                if(ObjectLeft >= 0){
                    if(Pulo === true){
                        andamusica.play() 
                     }
                    const MoveLeft = new MoveObject(Player, box, [anda, 0], "-", null, "px", Connect)
                    MoveLeft.GetMoveLocation()

                }else{
                    console.log("Limite alcançado")
                } 
            }else if(Acao === "Right"){
                if(ObjectLeft >= 0){
                    if(Pulo === true){
                       andamusica.play() 
                    }
                    
                    const MoveLeft = new MoveObject(Player, box, [anda, 0], "+", null, "px", Connect)
                    MoveLeft.GetMoveLocation()

                }else{
                    console.log("Limite alcançado")
                } 
            }else if(Acao === "Pulo"){
                Pulou()
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
                    console.log("Algum erro em Left")
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
            }else if(button === buttons[4]){
                if(Pulo === true && pulodados[1] === true){
                    Pulo = false
                    return true
                }else if(Pulo === false){
                    return false
                }else{
                    const bateumusica = document.getElementById("bateumusica")
                    bateumusica.play()
                }
            }
        }
        const buttons = this.Buttons
        if(this.Evento === buttons[0]){
            if(verification(buttons[0]) === true){
                if(P === "andando1"){
                    Player.src = "andando2.gif"
                    P = "andando2"
                }
                Move("Left")
                setInterval(() => {
                    Left = true
                }, 10)
            }
        }else if(this.Evento === buttons[2]){
            if(verification(buttons[2]) === true){
                if(P === "andando2"){
                    Player.src = "andando1.gif"
                    P = "andando1"
                }

                Move("Right")
                setInterval(() => {
                    Right = true
                }, 10)
            }
        }else if(this.Evento === buttons[4]){
            if(verification(buttons[4]) === true){
                Move("Pulo")
                setTimeout(() => {
                    document.documentElement.style.setProperty("--Inicio-Pulo", this.DadosPulo[0])
                    Pulo = true
                }, 1800)
            }
        }
    }
}