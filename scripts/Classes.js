let WPx = 500

class FindLocation {
    constructor(Box, Object){
        this.Box = Box
        this.Object = Object
    }

    get GetLocation(){
        return this.#FindLocation
    }

    #FindLocation(){
        const WidthObject = getComputedStyle(this.Object).getPropertyValue('width').split("px")[0]
        const HeightObject = getComputedStyle(this.Object).getPropertyValue('height').split("px")[0]

        const WidthBox = getComputedStyle(this.Box).getPropertyValue('width').split("px")[0]
        const HeightBox = getComputedStyle(this.Box).getPropertyValue('height').split("px")[0]

        const MarginLeft = getComputedStyle(this.Object).getPropertyValue('margin-left').split("px")[0]
        const MarginTop = getComputedStyle(this.Object).getPropertyValue('margin-top').split("px")[0]

        let MarginRight
        let MarginBottom

        if(Number(MarginLeft.split('px')[0]) === 0){
            MarginRight = (Number(WidthBox.split('px')[0]) - Number(WidthObject.split('px')[0]))
        }else if((MarginLeft.split('px')[0]) > 0) {
            MarginRight = ((Number(WidthBox.split("px")[0]) - Number(MarginLeft.split("px")[0])) - Number(WidthObject.split("px")[0]))
        }

        if(Number(MarginTop.split('px')[0]) === 0){
            MarginBottom = (Number(HeightBox.split('px')[0]) - Number(HeightObject.split('px')[0]))
        }else if((MarginTop.split('px')[0]) > 0) {
            MarginBottom = ((Number(HeightBox.split("px")[0]) - Number(MarginTop.split("px")[0])) - Number(HeightObject.split("px")[0]))
        }
        const Location = [WidthObject, HeightObject, WidthBox, HeightBox, MarginLeft, MarginTop, MarginRight, MarginBottom]

        return Location
    }
}

class MoveObject{
    constructor(Object, Box, Location, EquacaoX, EquacaoY, Type){
        this.Object = Object
        this.Box = Box
        this.x = Location[0]
        this.y = Location[1]
        this.EquacaoX = EquacaoX
        this.EquacaoY = EquacaoY
        this.type = Type
    }

    get GetMoveLocation(){
        return this.#MoveLocation
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

class controls{
    
    constructor(Object, Buttons, Anda, Evento){
        this.Object = Object
        this.Buttons = Buttons
        this.Andar = Anda
        this.Evento = Evento
    }

    get GetControl(){
        return this.#controls
    }

    #controls(){
        let Left = true
        let Right = true
        const anda = this.Andar

        const box = document.querySelector('main')
        const Player = document.getElementById('Player')

        
        const Location = new FindLocation(box, Player)
        
        function Move(Direction){
            const ObjectLeft = Location.GetLocation()[4]
            if(Direction === "Left"){
                if(ObjectLeft >= 0){
                    const MoveLeft = new MoveObject(Player, box, [anda, 0], "-", "+", "px")
                    MoveLeft.GetMoveLocation()
                    
                }else{
                    console.log("Limite alcançado")

                } 
            }else if(Direction === "Right"){
                if(ObjectLeft >= 0){
                    const MoveRight = new MoveObject(Player, box, [anda, 0], "+", "+", "px")
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

class CreatObject{
    // Lista com o indice 0 sendo a box e o indice 1 sendo o objeto a ser criado
    constructor(Object){
        this.Object = Object
    }

    get CreatObjectStart(){
        return this.#CreatObjectStart
    }

    get CreatObjectFinal(){
        return this.#CreatObjectFinal
    }

    #CreatObjectStart(){
        const x = document.createElement(this.Object[1].Nome)
        this.Object[0].prepend(x)
    }

    #CreatObjectFinal(){
        const x = document.createElement(this.Object[1].Nome)
        const elemento = document.querySelector(this.Object[1].Nome)
        
        let exists = document.body.contains(elemento)
        x.style.marginLeft = this.Object[1].marginLeft
        x.style.width = this.Object[1].width
        x.style.height = this.Object[1].height
        x.style.backgroundColor = this.Object[1].color
        x.style.position = "absolute"
        x.style.bottom = this.Object[1].bottom
        x.id = this.Object[1].Id

        this.Object[0].append(x)
        



        
    }
}

class RemoveObject{
    constructor(Object){
        this.Object = Object
    }

    get RemoveObject(){
        return this.#RemoveObject
    }

    #RemoveObject(){
        this.Object.remove()
    }
}

class Connection{
    constructor(Player, Dados, Objects){
        this.Player = Player
        this.Equacao = Dados[0]
        this.Value = Dados[1]
        this.Type = Dados[2]
        this.Box = Dados[3]
        this.Objects = Objects
    }

    get GetConnection(){
        return this.#Connection
    }

    #Connection(){
        for(let x in this.Objects){
            let LocationObject = new FindLocation(this.Box, this.Objects[x])

            if(this.Equacao === "-"){ // vai pra esquerda
                if(((Number(LocationObject.GetLocation()[4]) - this.Value)) >= 0){
                    this.Objects[x].style.marginLeft = ((Number(LocationObject.GetLocation()[4])) - (Number(this.Value) )) + this.Type
                }else if(((Number(LocationObject.GetLocation()[4]) - this.Value)) < 0){
                    this.Objects[x].style.marginLeft = "0px"
                }
            }else if(this.Equacao === "+"){ // Vai pra direita
                if(Number(LocationObject.GetLocation()[4]) <= (Number(LocationObject.GetLocation()[2]) - Number(LocationObject.GetLocation()[0]))){
                    this.Objects[x].style.marginLeft = ((Number(LocationObject.GetLocation()[4])) + (Number(this.Value) )) + this.Type
                }
            }
        }
    }
}

class Distancia{
    constructor(Player, Obs, Evento){
        this.ListPlayer = Player
        this.ListObs = Obs
        this.Evento = Evento
    }

    get GetDistancia(){
        return this.#Distancia
    }

    #Distancia(){
        let ObjectsInFase = []

        const Box = document.querySelector('main')
        const Player = this.ListPlayer[0]
        
        
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
    constructor(TFase,Player, obj, Evento){
        this.TFase = TFase
        this.Player =Player
        this.Obj = obj
        this.Evento = Evento
    }

    get Getprincipal(){
        return this.#principal
    }

    #principal(){
        const APx = 10
        const Classe = new controls(this.Player[0],["KeyA", "KeyW", "KeyD", "KeyS"], APx, this.Evento)

        const Dis = new Distancia([this.Player[0], this.Player[1]], this.Obj, this.Evento)
        let pass = Dis.GetDistancia()
        if(pass === true){
            Classe.GetControl()
        }else {
            console.log("parou aqui")
        }
    }
}

function executa(Evento){
    const Player = document.querySelector('Player')
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