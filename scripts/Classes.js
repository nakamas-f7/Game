export class FindLocation {
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

export class MoveObject{
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
            }else if(((Number(Location[4]) - this.x)) < 0){
                this.Object.style.marginLeft = 0
            }
        }else if(this.EquacaoX === "+"){
            if(Location[6] > 0){
                if(Number(Location[4]) <= (Number(Location[2]) / 1) - Number(Location[0])){
                    this.Object.style.marginLeft = ((Number(Location[4]) + this.x) + this.type)
                }
            }else if(Location[6] === 0){
                this.Object.style.marginLeft = Number(Location[4])
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
        const x = document.createElement(this.Object[1])
        this.Object[0].prepend(x)
    }

    #CreatObjectFinal(){
        const x = document.createElement(this.Object[1])
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

export class Connection{
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
        const LocationPlayer = new FindLocation(this.Box, this.Player)
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

    get GetVerification(){
        return this.#Verification
    }

    #Verification(){
        let LocationPlayer = new FindLocation(this.Box, this.Player)
        let Objects = []

        const Player = {
            Altura: Number(LocationPlayer.GetLocation()[1]),
            Width: Number(LocationPlayer.GetLocation()[0]),
            ML: Number(LocationPlayer.GetLocation()[4]),
            MR: LocationPlayer.GetLocation()[6],
            MT: Number(LocationPlayer.GetLocation()[5]),
            MB: LocationPlayer.GetLocation()[7]
        }

        for(let x in this.Objects){
            let LocationObject = new FindLocation(this.Box, this.Objects[x])
            let Obstaculo = {
                D0: Number(LocationObject.GetLocation()[4]) + Number(LocationObject.GetLocation()[0]), // a margem left fica igual a do player
                D1: LocationObject.GetLocation()[6] + LocationPlayer.GetLocation()[0] // Com iss0 a margin right fica igual a do player
            }

            Objects.push(Obstaculo)

            

            


        }
        function Contato(){
            function verificacao(){
            }
        }
    }
}