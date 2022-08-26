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

        const WidthBox = getComputedStyle(this.Box).getPropertyValue('width')
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
            console.log(((Location[4] - this.x) + this.type))
            this.Object.style.marginLeft = ((Location[4] - this.x) + this.type)
        }else if(this.EquacaoX === "+"){
            this.Object.style.marginLeft = ((Location[4] + this.x) + this.type)
        }
    }
}

class CreatObject{
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