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
            if(Number(Location[4]) <= (Number(Location[2]) / 2) - Number(Location[0])){
                this.Object.style.marginLeft = ((Number(Location[4]) + this.x) + this.type)
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