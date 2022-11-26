import { FindLocation } from './util/FindLocation.js'
import { controls } from './util/controls.js'
import { CreatObject } from './Secundario/CreatObject.js'
import { RemoveObject } from './Secundario/RemoveObject.js'

let WPx = 0

let ObjectsInFase = []
let objetosSaiu = []

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
        // aqui tem uma linha de raciocionio que o Player anda se não tiver nada na tela
        if(this.Connect[0] === false){
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

        // aqui tem uma linha de raciocinio que o player anda se tiver algo na tela 
        }else if(this.Connect[0] === true){
            for(let x in this.Connect[1]){
                let ObjetoNaFase = this.Connect[1][x][0]
                const Locate = new FindLocation(this.Box, ObjetoNaFase)
        
                const Location = Locate.GetLocation()
                if(this.EquacaoX === "-"){ // Aqui ele vai para frente
                    ObjetoNaFase.style.marginLeft = ((Number(Location[4]) + this.x) + this.type)
                    WPx -= this.x
                    
                    
                }else if(this.EquacaoX === "+"){ // Aqui ele vai para trás
                    ObjetoNaFase.style.marginLeft = ((Number(Location[4]) - this.x) + this.type)
                    WPx += this.x
                }
            }
        }
    }
}

// 4

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
        const Box = document.querySelector('main')
        let retorno = [true, [false, null]] // Permitir andar/ lista[Se o objeto ainda existe na fase/ Objetos na tela]
        for(let x in this.ListObs){ // verifica se um elemento já foi usado e saiu da tela
            let cria = true 
            for(let b in objetosSaiu){
                if(objetosSaiu[b][0] == x){
                    cria = false
                }
            }

            if(cria === true){
                const creat = new CreatObject([Box, this.ListObs[x][0]])

                if(this.ListPlayer[1] >= this.ListObs[x][1]){ // Essa parte é responsavel por permitir criação de objetos
                    const elemento = document.getElementById(this.ListObs[x][0].Id)
                    if(elemento != null){ // Caso o elemento exista
                        if(ObjectsInFase.length > 0){
                            let y = false
                            for(let x in ObjectsInFase){ // esse laço diz se o elemento já existe na lista
                                if(ObjectsInFase[x].includes(elemento)){
                                    y = true
                                    break
                                }else{
                                    y = false
                                }
                            }
                            if(y === false){ // aqui ele cria o elemento

                                ObjectsInFase.push([elemento, this.ListObs[x][1], x])
                            }

                        }else if(ObjectsInFase.length === 0){ // aqui ele cria o elemento
                            
                            ObjectsInFase.push([elemento, this.ListObs[x][1], x])
                        }
                    }else if(elemento === null){ // Caso o elemento não exista
                        creat.CreatObjectFinal()
                    }
                }
            }
        }

        for(let x in ObjectsInFase){
            // Verificar a possibilidade de andar 
            let adiante = true
            const P = new FindLocation(Box, this.ListPlayer[0])
            const O = new FindLocation(Box, ObjectsInFase[x][0])
            let Left = { // Dados para calculo de contato do lado direito
                MP: Number(P.GetLocation()[4]),
                WP: Number(P.GetLocation()[0]),
                MO: Number(O.GetLocation()[4]),
                WO: Number(O.GetLocation()[0])
            }
            let Right = { // Dados para calculo de contato do lado Esquerdo
                MP: Number(P.GetLocation()[6]),
                WP: Number(P.GetLocation()[0]),
                MO: Number(O.GetLocation()[6]),
                WO: Number(O.GetLocation()[0])
            }

            let Bottom = { // Dados para calculo de contato do lado Bottom
                MP: Number(P.GetLocation()[7]),
                HP: Number(P.GetLocation()[1]),
                MO: Number(O.GetLocation()[7]),
                HO: Number(O.GetLocation()[1])
            }
            let Top = { // Dados para calculo de contato do lado Top
                MP: Number(P.GetLocation()[5]),
                HP: Number(P.GetLocation()[1]),
                MO: Number(O.GetLocation()[5]),
                HO: Number(O.GetLocation()[1])
            }

            if(this.Evento === "KeyD"){
                let Calc1 = (Left.MP + Left.WP)
                let Calc2 = (Left.MO + Left.WO)
                if(Calc1 <= Left.MO){
                    adiante = true
                }else if(Calc1 <= Calc2){
                    adiante = false
                    retorno = [adiante, [true, ObjectsInFase]]
                    break
                }
            }else if(this.Evento === "KeyA"){
                let Calc1 = (Right.MP + Right.WP)
                let Calc2 = (Right.MO + Right.WO)
                if(Calc1 <= Right.MO){
                    adiante = true
                }else if(Calc1 <= Calc2){
                    adiante = false
                    retorno = [adiante, [true, ObjectsInFase]]
                    break
                }
            }

            for(let a in ObjectsInFase){
                
                let marginLo = new FindLocation(Box, ObjectsInFase[a][0])
                if(Number(marginLo.GetLocation()[4]) + Number(marginLo.GetLocation()[0]) > Number(marginLo.GetLocation()[2])){ // aqui ele verifica se saiu algum objeto pela direita
                    const removendo = new RemoveObject(ObjectsInFase[a][0].id)
                    removendo.RemoveObject()
                    ObjectsInFase.splice(ObjectsInFase.indexOf(ObjectsInFase[a][0]), 1);

                }else if(Number(marginLo.GetLocation()[4]) < 0){ // aqui ele verifica se saiu algum objeto pela esquerda
                    const removendo = new RemoveObject(ObjectsInFase[a][0].id)
                    removendo.RemoveObject()
                    objetosSaiu.push([Number(ObjectsInFase[a][2]), WPx])
                    ObjectsInFase.splice(ObjectsInFase.indexOf(ObjectsInFase[a][0]), 1)
                    
                    
                }
            }

            retorno = [adiante, [true, ObjectsInFase]] 
        }
        return retorno
    }
}

// 3

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
            const Controle = new controls(this.Player[0],["KeyA", "KeyW", "KeyD", "KeyS"], Apx, this.Evento, pass[1])            
            Controle.GetControl()
        }else if(pass[0] === false){
            console.log("parou aqui")
        }
    }
}


// 2

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

// Inicio

document.onkeydown = function(event){
    executa(event.code)
    
} 