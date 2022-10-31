import { FindLocation } from '../util/FindLocation.js'

export class Connection{
    #Player
    #Equacao
    #Value
    #Type
    #Box
    #Objects
    constructor(Player, Dados, Objects){
        this.Player = Player
        this.Equacao = Dados[0]
        this.Value = Dados[1]
        this.Type = Dados[2]
        this.Box = Dados[3]
        this.Objects = Objects
    }

    get Player(){
        return this.#Player
    }

    get Equacao(){
        return this.#Equacao
    }

    get Value(){
        return this.#Value
    }

    get Type(){
        return this.#Type
    }

    get Box(){
        return this.#Box
    }

    get Objects(){
        return this.#Objects
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