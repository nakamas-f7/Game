import { FindLocation } from './util/FindLocation.js'
import { controls } from './util/controls.js'
import { CreatObject } from './Secundario/CreatObject.js'
import { RemoveObject } from './Secundario/RemoveObject.js'

let WPx = 0
let Esquerda = []
let Meio = []
let Direita = []
let ObjectsInFase = [Esquerda, Meio, Direita]
let ObjFase = []
let seguranca = false
let direcao = "Right"
let DadosPuloRetorno = []
let valorFinal
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
        const Locate = new FindLocation(this.Box, this.Object)
        const Location = Locate.GetLocation()
        if(this.Connect[0] === false){
            if(this.EquacaoX === "-"){
                if(((Number(Location[4]) - this.x)) >= 0){
                    if(WPx + Number(Location[0]) < Number(Location[2]) / 2){
                       this.Object.style.marginLeft = ((Number(Location[4]) - this.x) + this.type) 
                       WPx -= this.x
                    }else if(WPx >= this.x){
                        WPx -= this.x
                    }
                }else if(((Number(Location[4]) - this.x)) < 0){
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
            for(let y in this.Connect[1]){
                for(let x in this.Connect[1][y]){
                    let ObjetoNaFase = this.Connect[1][y][x][0]
                    if(ObjetoNaFase != null){
                        const Locate = new FindLocation(this.Box, ObjetoNaFase)
                        const Location = Locate.GetLocation()
                        if(this.EquacaoX === "-"){ // Aqui ele vai para frente
                            ObjetoNaFase.style.marginLeft = ((Number(Location[4]) + this.x) + this.type)
                        }else if(this.EquacaoX === "+"){ // Aqui ele vai para trás
                            ObjetoNaFase.style.marginLeft = ((Number(Location[4]) - this.x) + this.type)
                        }
                    }
                }
            }
            if(this.EquacaoX === "-"){ // Aqui ele vai para frente
                WPx -= this.x
            }else if(this.EquacaoX === "+"){ // Aqui ele vai para trás
                WPx += this.x
            }

            if(Meio.length > 0){ // AQUI ELE TÁ ESCOLHENDO ONDE O PLAYER FICA AO FINAL DO PULO
                for(let meio in Meio){ // AQUI ELE OLHA AS POSSIBILIDADES

                    const dadosMeio = new FindLocation(this.Box, Meio[meio][0]) // AQUI ELE PEGA OS DADOS DO OBJETO EM CADA CICLO
                    if(Number(Location[7]) > Number(dadosMeio.GetLocation()[7]) + Number(dadosMeio.GetLocation()[1])){ // BOTTOM > BOTTOM + HEIGHT
                        this.Object.style.top = valorFinal
                    }
                }
            }else{
                document.documentElement.style.setProperty("--Inicio-Pulo", "calc( 100% - " + Location[1] + "px)")
                this.Object.style.top = "calc( 100% - " + Location[1] + "px)"
            }
        }
    }
}
// 4
class Distancia{
    #ListPlayer
    #Evento
    #Apx
    constructor(Player,Evento, Apx){
        this.#ListPlayer = Player
        this.#Evento = Evento
        this.#Apx = Apx
    }
    get ListPlayer(){
        return this.#ListPlayer
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
        const Box = document.getElementById("pista")
        const PlayerDados = document.getElementById("Player")
        let retorno = [true, [false, null]] // Permitir andar/ lista[Se o objeto ainda existe na fase/ Objetos na tela]
        for(let x in ObjFase){ // verifica se um elemento está ou não na tela para permitir a criação ou não dele
            const creat = new CreatObject([Box, ObjFase[x][0]])
            const elemento = document.getElementById(ObjFase[x][0].Id)
            if(this.ListPlayer[1] >= ObjFase[x][1] && ObjFase[x][0].marginLeft != "0px"){ // aqui se a posição em que for criada não for modificada
                if(elemento != null){ // elemento não saiu pela direita e está na tela
                    let cria = false
                    if(Direita.length > 0){
                        for(let direita in Direita){
                            if(Direita[direita].includes(elemento)){ // existe na lista
                                cria = true
                                break
                            }else{ // não existe na lista
                                if(Meio.length > 0){
                                    for(let meio in Meio){
                                        if(Meio[meio].includes(elemento)){ // existe na lista
                                            cria = true
                                            break
                                        }else{ // não existe na lista
                                            if(Esquerda.length > 0){
                                                for(let esquerda in Esquerda){
                                                    if(Esquerda[esquerda].includes(elemento)){ // existe na lista
                                                        cria = true
                                                        break
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }else{
                                    if(Esquerda.length > 0){
                                        for(let esquerda in Esquerda){
                                            if(Esquerda[esquerda].includes(elemento)){
                                                cria = true
                                                break
                                            }
                                        }
                                    }
                                }
                            }
                        } 
                        if(cria === false){
                            Direita.push([elemento, ObjFase[x][1], Number(x)])
                        }
                    }else{
                        if(Meio.length > 0){
                            for(let meio in Meio){
                                if(Meio[meio].includes(elemento)){
                                    cria = true
                                    break
                                }else{
                                    if(Esquerda.length > 0){
                                        for(let esquerda in Esquerda){
                                            if(Esquerda[esquerda].includes(elemento)){
                                                cria = true
                                                break
                                            }
                                        }
                                    }
                                }
                            }
                            if(cria === false){
                                Direita.push([elemento, ObjFase[x][1], Number(x)])
                            }
                        }else{
                            if(Esquerda.length > 0){
                                for(let esquerda in Esquerda){
                                    if(Esquerda[esquerda].includes(elemento)){
                                        cria = true
                                        break
                                    }
                                }
                                if(cria === false){
                                    Direita.push([elemento, ObjFase[x][1], Number(x)])
                                }
                            }else{
                                if(cria === false && ObjFase[x][0].marginLeft != "0px"){
                                    Direita.push([elemento, ObjFase[x][1], Number(x)])
                                }
                            }
                        }
                    }
                }else if(elemento === null){
                    creat.CreatObjectFinal()
                }
            }else if(this.ListPlayer[1] <= ObjFase[x][1] && ObjFase[x][0].marginLeft === "0px"){ // aqui se a posição em que ele sera criado for modificada 
                if(elemento != null){ // elemento não saiu pela Esquerda e está na tela
                    let cria = false
                    if(Esquerda.length > 0){
                        for(let esquerda in Esquerda){
                            if(Esquerda[esquerda].includes(elemento)){
                                cria = true
                                break
                            }else{
                                if(Meio.length > 0){
                                    for(let meio in Meio){
                                        if(Meio[meio].includes(elemento)){
                                            cria = true
                                        }else{
                                            if(Direita.length > 0){
                                                for(let direita in Direita){
                                                    if(Direita[direita].includes(elemento)){
                                                        cria = true
                                                        break
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }else{
                                    if(Direita.length > 0){
                                        for(let direita in Direita){
                                            if(Direita[direita].includes(elemento)){
                                                cria = true
                                                break
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(cria === false){
                            Esquerda.pop([elemento, ObjFase[x][1], Number(x)])
                        }
                    }else{
                        if(Meio.length > 0){
                            for(let meio in Meio){
                                if(Meio[meio].includes(elemento)){
                                    cria = true
                                    break
                                }else{
                                    if(Direita.length > 0){
                                        for(let direita in Direita){
                                            if(Direita[direita].includes(elemento)){
                                                cria = true
                                                break
                                            }
                                        }
                                    }
                                }
                            }
                            if(cria === false){
                                Esquerda.push([elemento, ObjFase[x][1], Number(x)])
                            }
                        }else{
                            if(Direita.length > 0){
                                for(let direita in Direita){
                                    if(Direita[direita].includes(elemento)){
                                        cria = true
                                        break
                                    }
                                }
                                if(cria === false){
                                    Esquerda.push([elemento, ObjFase[x][1], Number(x)])
                                }
                            }else{
                                if(cria === false){
                                    Esquerda.push([elemento, ObjFase[x][1], Number(x)])
                                }
                            }
                        }
                    }
                }else if(elemento === null){ // não esta na tela e vem pela Esquerda
                    creat.CreatObjectFinal() // cria elemento
                }
            }
        }
        // Continue aqui carlos, faça ele receber o novo formato do objetoinfase
        for(let x in ObjectsInFase){
            let adiante = true
            for(let y in ObjectsInFase[x]){
                // ele verifica o contato entre os objetos
                const Pista = document.getElementById("pista")
                const P = new FindLocation(Pista, this.ListPlayer[0])
                const O = new FindLocation(Pista, ObjectsInFase[x][y][0])

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
                let top = false // true ele anda livremente e false ele anda com obstaculos
                let bottom = false // true ele anda livremente e false ele anda com obstaculos
                let calcBottomO = Bottom.HO + Bottom.MO
                let calcBottomP = Bottom.HP + Bottom.MP
                // Verificar a possibilidade de andar 
                if(Bottom.MP > calcBottomO){
                    bottom = true
                }else if(Bottom.MO > calcBottomP){
                    top = true
                }
                if(bottom === false && top === false){
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
                }else if(top === true && bottom === true){
                    adiante === true
                }

                // aqui ele verifica a saida de objetos e Divisão de objetos nas listas
                if(Number(O.GetLocation()[4]) + Number(O.GetLocation()[0]) > Number(O.GetLocation()[2])){ // aqui ele verifica se saiu algum objeto pela direita
                    const removendo = new RemoveObject(ObjectsInFase[x][y][0].id)
                    for(let F in ObjFase){
                        if(ObjFase[F][0].Id === ObjectsInFase[x][y][0].id){
                            if(ObjFase[F][0].marginLeft === "0px"){
                               ObjFase[F][0].marginLeft = "calc(100% - " + O.GetLocation()[0] + "px)" 
                               ObjFase[F][1] -= Number(O.GetLocation()[2]) - Number(O.GetLocation()[0])
                            }
                        }
                    }
                    Direita.pop()
                    removendo.RemoveObject()
                }else if(Number(O.GetLocation()[4]) < 0){ // aqui ele verifica se saiu algum objeto pela esquerda
                    const removendo = new RemoveObject(ObjectsInFase[x][y][0].id)
                    for(let F in ObjFase){
                        if(ObjFase[F][0].Id === ObjectsInFase[x][y][0].id){
                            if(ObjFase[F][0].marginLeft != "0px"){
                                ObjFase[F][0].marginLeft = "0px"
                                ObjFase[F][1] += Number(O.GetLocation()[2]) - Number(O.GetLocation()[0])
                            }
                        }
                    }

                    Esquerda.shift()
                    removendo.RemoveObject()
                    
                }else if(Esquerda.length > 0 || Meio.length > 0 || Direita.length > 0){ // Divisão de objetos nas listas
                    if(Right.MO<= Right.MP + Right.WP && Left.MO>= Left.MP + Left.WP){
                        // Direita
                        if(Meio.includes(ObjectsInFase[x][y])){
                            Direita.unshift(ObjectsInFase[x][y])
                            Meio.pop()
                        }
                    }else if(Right.MO > Right.MP + Right.WP && Left.MO < Left.MP + Left.WP){
                        // Esquerda
                        if(Meio.includes(ObjectsInFase[x][y])){
                            Esquerda.push(ObjectsInFase[x][y])
                            Meio.shift()
                        }
                    }else{
                        if(Meio.includes(ObjectsInFase[x][y])){
                            //meio
                        }else{
                            if(Direita.includes(ObjectsInFase[x][y])){
                                Meio.push(ObjectsInFase[x][y])
                                Direita.shift()
                                
                            }else if(Esquerda.includes(ObjectsInFase[x][y])){
                                Meio.unshift(ObjectsInFase[x][y])
                                Esquerda.pop()
                            }
                        }
                    }
                    
                }
                retorno = [adiante, [true, ObjectsInFase]] 
            }
            if(adiante === false){
                break
            }
        }

        // verificando pulo
        const DadosPlayer = new FindLocation(Box, PlayerDados)
        DadosPuloRetorno = [" calc(100% - " + DadosPlayer.GetLocation()[1]  + "px)"]
        valorFinal = " calc(100% - " + DadosPlayer.GetLocation()[1] + "px)"

        for(let meio in Meio){
            const DadosPulo = new FindLocation(Box, Meio[meio][0])
            const value1 = getComputedStyle(document.documentElement).getPropertyValue("--Fim-Pulo").split(" ")[1].split("(")[1].split("%")[0] // porcentagem top do player
            const value2 = Meio[meio][0].style.top.split(" ")[0].split("(")[1].split("%")[0] // porcentagem top do objeto
            const value3 = getComputedStyle(document.documentElement).getPropertyValue("--Altura-Pulo").split(" ")[1].split("(")[1].split("%")[0]
            
            let valorDeTroca1 = Number(value1) * (Number(DadosPlayer.GetLocation()[3]) / 100) // Player / ele pega o valor do top em pixels de acordo com a porcentagem
            let valorDeTroca2 = Number(value2) * (Number(DadosPulo.GetLocation()[3]) / 100) // OBJETO / ele pega o valor do top em pixels de acordo com a porcentagem
            let valorDeTroca3 = (Number(value3) * (Number(DadosPlayer.GetLocation()[3]) / 100)) + Number(DadosPlayer.GetLocation()[1]) // Pulo / ele pega o valor do top em pixels de acordo com a porcentagem

            if(valorDeTroca1 >= valorDeTroca2 && valorDeTroca3 < valorDeTroca2 + Number(DadosPulo.GetLocation()[1]) ){

                let Secundario =  Number(DadosPulo.GetLocation()[1]) + Number(DadosPlayer.GetLocation()[1]) + 1

                valorFinal = (valorDeTroca2 / Number(DadosPulo.GetLocation()[3])) * 100
                valorFinal = " calc(" + (valorFinal) + "% - " + Secundario + "px)"
                
                document.documentElement.style.setProperty("--Inicio-Pulo", valorFinal)
                document.documentElement.style.setProperty("--Fim-Pulo", valorFinal) // aqui modifica o valor atual do Final do pulo
                DadosPuloRetorno = [valorFinal]

            }else {
                let Secundario =  Number(DadosPulo.GetLocation()[1]) + Number(DadosPlayer.GetLocation()[1]) + 1

                valorFinal = (valorDeTroca2 / Number(DadosPulo.GetLocation()[3])) * 100
                valorFinal = " calc(" + (valorFinal) + "% - " + Secundario + "px)"
                
                document.documentElement.style.setProperty("--Inicio-Pulo", valorFinal)
                document.documentElement.style.setProperty("--Fim-Pulo", valorFinal) // aqui modifica o valor atual do Final do pulo
                DadosPuloRetorno = [valorFinal]
            }

        }
        return retorno
    }
}
class Fase{
    #TFase
    #Player
    #Evento
    constructor(TFase,Player,Evento){
        this.#TFase = TFase
        this.#Player =Player
        this.#Evento = Evento
    }
    get TFase(){
        return this.#TFase
    }
    get Player(){
        return this.#Player
    }
    get Evento(){
        return this.#Evento
    }
    get Getprincipal(){
        return this.#principal
    }
    #principal(){
        const Apx = 10
        const Dis = new Distancia([this.Player[0], this.Player[1]],this.Evento, Apx)
        const pass = Dis.GetDistancia()
        const teclas = ["KeyA", "KeyW", "KeyD", "KeyS", "Space"]
        if(this.Evento === teclas[0]){
            direcao = "Left"
        }else if(this.Evento === teclas[1]){
            direcao = "Top"
        }else if(this.Evento === teclas[2]){
            direcao = "Right"
        }else if(this.Evento === teclas[3]){
            direcao = "Bottom"
        }

        if(this.Evento === "Space"){
            this.Player[0].style.animation = "none"
        }
        if(pass[0] === true){
            const Controle = new controls(this.Player[0], teclas, Apx, this.Evento, pass[1], DadosPuloRetorno)            
            Controle.GetControl()
        }else if(pass[0] === false){
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
        width: "100px",
        height: "100px",
        marginLeft: "calc(100% - 100px)",
        top: "calc(100% - 100px)",
        Id: "Obs1",
        link: "cano.png"
    }
    const Obs2 = {
        Nome: "img",
        width: "400px",
        height: "100px",
        marginLeft: "calc(100% - 400px)",
        top: "calc(30% - 100px)",
        Id: "Obs2",
        link: "parede.png"
    }
    const Obs3 = {
        Nome: "img",
        width: "100px",
        height: "100px",
        marginLeft: "calc(100% - 100px)",
        top: "calc(100% - 100px)",
        Id: "Obs3",
        link: "cano.png"
    }
    const Obs4 = {
        Nome: "img",
        width: "400px",
        height: "100px",
        marginLeft: "calc(100% - 400px)",
        top: "calc(30% - 100px)",
        Id: "Obs4",
        link: "parede.png"
    }
    const Obs5 = {
        Nome: "img",
        width: "100px",
        height: "100px",
        marginLeft: "calc(100% - 100px)",
        top: "calc(100% - 100px)",
        Id: "Obs5",
        link: "cano.png"
    }
    const Obs6 = {
        Nome: "img",
        width: "400px",
        height: "100px",
        marginLeft: "calc(100% - 400px)",
        top: "calc(30% - 100px)",
        Id: "Obs6",
        link: "parede.png"
    }
    const ValorSurgimento = Number(Location.GetLocation()[0]) / 2
    if(seguranca === false){
        ObjFase = [[Obs1, 500 + ValorSurgimento], [Obs2, 1100 + ValorSurgimento], [Obs3, 1600 + ValorSurgimento], [Obs4, 2200 + ValorSurgimento], [Obs5, 2800 + ValorSurgimento], [Obs6, 3400 + ValorSurgimento]]
        seguranca = true
    }
    const Fase1 = new Fase(5000, [Player, WPx + Number(widthPlayer.GetLocation()[0])],Evento)
    Fase1.Getprincipal()
}
document.onkeydown = function(event){
    console.log(ObjectsInFase)
    executa(event.code)
}