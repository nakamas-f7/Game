class MoveObject{

    constructor(Object, Location){
        this.Object = Object
        this.MarginLeft = Location[0]
        this.MarginRight = Location[1]
        this.MarginTop = Location[2]
        this.MarginBottom = Location[3]
    }


    get MoveLocation(){
        return this.#MoveLocation
    }

    #MoveLocation(){
        this.Object.style.transform = "translateX(" + this.MarginLeft + ")" 
    }
}

const div = document.getElementById('box')
const teste = new MoveObject(div, ["-100%", null, null, null])


teste.MoveLocation()

