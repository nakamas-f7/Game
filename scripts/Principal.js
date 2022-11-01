import { FindLocation } from './util/FindLocation.js'
import { controls } from './util/controls.js'
import { CreatObject } from './Secundario/CreatObject.js'
import { RemoveObject } from './Secundario/RemoveObject.js'

let WPx = 500

export class MoveObject{
    #Object
    #Box
    #x
    #y
    #EquacaoX
    #EquacaoY
    #type
    #Connect
    constructor(Object, Box, Location, EquacaoX, EquacaoY, Type, Connect){
        this.#Object = Object
        this.#Box = Box
        this.#x = Location[0]
        this.#y = Location[1]
        this.#EquacaoX = EquacaoX
        this.#EquacaoY = EquacaoY
        this.#type = Type
        this.#Connect = Connect
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

    get Connect(){
        return this.#Connect
    }
    
    #MoveLocation(){
        const Locate = new FindLocation(this.Box, this.Object)
        
        const Location = Locate.GetLocation()
        

        if(this.Connect[0] === false){
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
        }else if(this.Connect[0] === true){
            if(this.EquacaoX === "-"){
                console.log("-")
            }else if(this.EquacaoX === "+"){
                console.log("+")
            }
        }
    }
}

class Distancia{
    #ListPlayer
    #ListObs
    #Evento
    #Apx
    constructor(Player, Obs, Evento, Apx){
        this.#ListPlayer = Player
        this.#ListObs = Obs
        this.#Evento = Evento
        this.#Apx = Apx
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

    get Apx(){
        return this.#Apx
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
                    ObjectsInFase.push([elemento, this.ListObs[x][1]])
                }else if(elemento === null){
                    creat.CreatObjectFinal()
                }
            }
        }

        for(let x in ObjectsInFase){
            return [true, this.Apx, [false, ObjectsInFase]]
        }
        return [true, this.Apx, [false, null]]
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
        const Apx = 10
        const Dis = new Distancia([this.Player[0], this.Player[1]], this.Obj, this.Evento, Apx)
        const pass = Dis.GetDistancia()
        if(pass[0] === true){
            const Controle = new controls(this.Player[0],["KeyA", "KeyW", "KeyD", "KeyS"], pass[1], this.Evento, pass[2])            
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
    const widthPlayer = new FindLocation(box, Player)

    const Obs1 = {
        Nome: "img",
        width: "200px",
        height: "100px",
        marginLeft: "calc(100% - 200px)",
        bottom: "calc(10vh)",
        Id: "Obs1",
        link: "pngegg.png"

    }
            
    const Obs2 = {
        Nome: "img",
        width: "200px",
        height: "100px",
        marginLeft: "calc(100% - 200px)",
        bottom: "calc(10vh)",
        Id: "Obs2",
        link: "pngegg.png"
    }

    const ValorSurgimento = Number(Location.GetLocation()[0]) / 2
    const Fase1 = new Fase(5000, [Player, WPx + Number(widthPlayer.GetLocation()[0])], [[Obs1, 500 + ValorSurgimento], [Obs2, 1000 + ValorSurgimento]], Evento)
    
    Fase1.Getprincipal()
}

document.onkeydown = function(event){
    executa(event.code)
    
} 