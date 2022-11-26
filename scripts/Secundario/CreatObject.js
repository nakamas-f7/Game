export class CreatObject{
    #Object
    // Lista com o indice 0 sendo a box e o indice 1 sendo o objeto a ser criado
    constructor(Object){
        this.#Object = Object
    }

    get Object(){
        return this.#Object
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

        x.style.marginLeft = this.Object[1].marginLeft
        x.style.width = this.Object[1].width
        x.style.height = this.Object[1].height
        x.style.backgroundColor = this.Object[1].color
        x.style.position = "absolute"
        x.style.top = this.Object[1].top
        x.id = this.Object[1].Id
        x.src = this.Object[1].link

        this.Object[0].append(x)
    }
}