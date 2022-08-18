class FindLocation {
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

    #CreatObjectStart(){
        let Total =  this.Object.length
        let x = 0
        while(Total > 0){
            
            console.log(Total)
            Total -= 1
        }
    }
}


const main =  document.querySelector('main')

let teste = new CreatObject([main, 'a'])

teste.CreatObjectStart()