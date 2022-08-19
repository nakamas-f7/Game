export class FindLocation {
    constructor(Box, Object){
        this.Box = Box
        this.Object = Object
    }

    get Location(){
        return this.#FindLocation
    }

    #FindLocation(){
        const WidthObject = getComputedStyle(this.Object).getPropertyValue('width')
        const HeightObject = getComputedStyle(this.Object).getPropertyValue('height')

        const WidthBox = getComputedStyle(this.Box).getPropertyValue('width')
        const HeightBox = getComputedStyle(this.Box).getPropertyValue('height')

        const MarginLeft = getComputedStyle(this.Object).getPropertyValue('margin-left')
        let MarginRight
        if(Number(MarginLeft.split('px')[0]) === 0){
            MarginRight = (Number(WidthBox.split('px')[0]) - Number(WidthObject.split('px')[0])) + "px"
        }else if((MarginLeft.split('px')[0]) > 0) {
            MarginRight = ((Number(WidthBox.split("px")[0]) - Number(MarginLeft.split("px")[0])) - Number(WidthObject.split("px")[0])) + "px"
        }
        const Location = [WidthObject, HeightObject, WidthBox, HeightBox, MarginLeft, MarginRight]

        return Location
    }
}

class MoveObject{
    constructor(Object, Location){
        this.Object = Object
        this.width = Location[0]
        this.Top = Location[1]
    }

    get MoveLocation(){
        return this.#MoveLocation
    }

    #MoveLocation(){
        this.Object.style.transform = "translate(" + this.width + "," + this.Top +  ")"
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

