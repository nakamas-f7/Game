import { FindLocation } from './util/FindLocation.js'
import { controls } from './util/controls.js'
import { CreatObject } from './Secundario/CreatObject.js'

let WPx = 0

export class MoveObject{
    #Object
    #Box
    #x
    #y
    #EquacaoX
    #EquacaoY
    #type
    constructor(Object, Box, Location, EquacaoX, EquacaoY, Type){
        this.#Object = Object
        this.#Box = Box
        this.#x = Location[0]
        this.#y = Location[1]
        this.#EquacaoX = EquacaoX
        this.#EquacaoY = EquacaoY
        this.#type = Type
    }

    get GetMoveLocation(){
        return this.#MoveLocation
    }

    get Object(){
        return this.#Object
    }

    get Box(){
        return this.#Box
    }

    get x(){
        return this.#x
    }

    get y(){
        return this.#y
    }

    get EquacaoX(){
        return this.#EquacaoX
    }

    get EquacaoY(){
        return this.#EquacaoY
    }

    get type(){
        return this.#type
    }
    
    #MoveLocation(){
        const Locate = new FindLocation(this.Box, this.Object)
        
        const Location = Locate.GetLocation()
        

        if(this.EquacaoX === "-"){
            if(((Number(Location[4]) - this.x)) >= 0){
                this.Object.style.marginLeft = ((Number(Location[4]) - this.x) + this.type)
                if(WPx >= this.x){
                    WPx -= this.x
                }
                
            }else if(((Number(Location[4]) - this.x)) < 0){
                this.Object.style.marginLeft = 0
                if(WPx >= this.x){
                    WPx -= this.x - Number(Location[4])
                }
            }
        }else if(this.EquacaoX === "+"){
            
            if(Location[6] > 0){
                if(Number(Location[4]) <= (Number(Location[2]) / 2) - Number(Location[0])){
                    this.Object.style.marginLeft = ((Number(Location[4]) + this.x) + this.type)
                }
            }else if(Location[6] === 0){
                this.Object.style.marginLeft = Number(Location[4])
            }

            WPx += this.x
        }
    }
}

class Distancia{
    #ListPlayer
    #ListObs
    #Evento
    constructor(Player, Obs, Evento){
        this.#ListPlayer = Player
        this.#ListObs = Obs
        this.#Evento = Evento
    }

    get ListPlayer(){
        return this.#ListPlayer
    }

    get ListObs(){
        return this.#ListObs
    }

    get Evento(){
        return this.#Evento
    }

    get GetDistancia(){
        return this.#Distancia
    }

    #Distancia(){
        let ObjectsInFase = []

        const Box = document.querySelector('main')
        
        for(let x in this.ListObs){
            const creat = new CreatObject([Box, this.ListObs[x][0]])

            if(this.ListPlayer[1] >= this.ListObs[x][1]){
                const elemento = document.getElementById(this.ListObs[x][0].Id)
                if(elemento != null){
                    ObjectsInFase.push(elemento)
                }else if(elemento === null){
                    creat.CreatObjectFinal()
                }
            }
        }
        
        for(let x in ObjectsInFase){
            
            let Location = new FindLocation(Box, ObjectsInFase[x])
            let VDS = ObjectsInFase[x][1]
            let DPA = this.ListPlayer[1]
            let D = DPA - VDS
            if(D < 0){
                return false
            }else if(D > 0){
                if(D > (VDS + Number(Location[0]))){
                    return true
                }else{return false}
            }else {
                return false
            }
        }
        return true
    }
}

class Fase{
    #TFase
    #Player
    #Obj
    #Evento
    constructor(TFase,Player, obj, Evento){
        this.#TFase = TFase
        this.#Player =Player
        this.#Obj = obj
        this.#Evento = Evento
    }

    get TFase(){
        return this.#TFase
    }

    get Player(){
        return this.#Player
    }

    get Obj(){
        return this.#Obj
    }

    get Evento(){
        return this.#Evento
    }

    get Getprincipal(){
        return this.#principal
    }

    #principal(){
        
        const APx = 10
        const Controle = new controls(this.Player[0],["KeyA", "KeyW", "KeyD", "KeyS"], APx, this.Evento)
        
        const Dis = new Distancia([this.Player[0], this.Player[1]], this.Obj, this.Evento)
        let pass = Dis.GetDistancia()
        if(pass === true){
            Controle.GetControl()
        }else {
            console.log("parou aqui")
        }
    }
}

function executa(Evento){
    
    const Player = document.getElementById('Player')
    const box = document.querySelector('main')
    const body = document.querySelector('body')
    const Location = new FindLocation(body, box)

    const Obs1 = {
        Nome: "div",
        width: "50px",
        height: "100px",
        marginLeft: "calc(100% - 50px)",
        color: "blue",
        bottom: "calc(10vh)",
        Id: "Obs1"
    }
            
    const Obs2 = {
        Nome: "div",
        width: "50px",
        height: "150px",
        marginLeft: "calc(100% - 50px)",
        color: "green",
        bottom: "calc(10vh)",
        Id: "Obs2"
    }
    const Fase1 = new Fase(5000, [Player, WPx], [[Obs1, 500 + (Number(Location.GetLocation()[0]) / 2)], [Obs2, 1000 + (Number(Location.GetLocation()[0]) / 2)]], Evento)
    
    Fase1.Getprincipal()
}

document.onkeydown = function(event){
    executa(event.code)
    
} 