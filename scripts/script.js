import { FindLocation } from "./Classes.js"
/*============ Variaveis constantes de ligação html============*/ 

const body = document.querySelector('body')
const pista = document.getElementById('pista')
const gif = document.getElementById('gif') 
const banco = document.getElementById('banco')

/*============ Variaveis controladoras ============*/ 

let valorX = 0
let controladorDirecao = 'Direita'
let controladorPulo = 0

/*============ Variaveis botões ============*/ 

let KeyA = true
let KeyD = true
let KeySpace = true

/*============ Funções ============*/ 

function EsquerdaDireita(){
    body.onkeydown = function(event){
        console.log(event.code)
        if(event.code === 'KeyD' && KeySpace === true){
            KeyD = false
            if(valorX < 90 ){
                if((valorX + valorX) >= 0){
                    valorX += 1.5
                    mexer(valorX, 'KeyD')
                }
            }
        }else if(event.code === 'KeyA' && KeySpace === true){
            KeyA = false
            if(valorX >= 1.5 ){
                if((valorX + valorX) >= 1){
                    valorX -= 1.5
                    mexer(valorX, 'KeyA')
                }                
            }
        }else if(event.code === 'Space'){
            if(KeySpace === true){
                KeyA = false
                KeyD = false
                KeySpace = false
                pulo()
            }
        }
    }
}
function pulo(){
    if(controladorDirecao === 'Direita'){
        if(valorX + 10 <= 90){
            document.documentElement.style.setProperty('--pulo-atras', (valorX + 10) + '%');
            gif.style.animation = 'puloatras 1s linear'
            setTimeout(function(){
                valorX += 10
                gif.style.marginLeft = valorX + '%'
                gif.style.animation = 'none'
                KeySpace = true
                KeyA = true
                KeyD = true
            }, 1000)
        }else if(valorX + 10 > 90){
            document.documentElement.style.setProperty('--pulo-atras', 90 + '%');
            gif.style.animation = 'puloatras 1s linear'
            setTimeout(function(){
                valorX = 90
                gif.style.marginLeft = valorX + '%'
                gif.style.animation = 'none'
                KeySpace = true
                KeyA = true
                KeyD = true
            }, 1000)
        }
    }else if(controladorDirecao === 'Esquerda'){
        if(valorX - 10 >= 0){
            document.documentElement.style.setProperty('--pulo-atras', (valorX - 10) + '%');
            gif.style.animation = 'puloatras 1s linear'
            
            setTimeout(function(){
                valorX -= 10
                gif.style.marginLeft = valorX + '%'
                gif.style.animation = 'none'
                KeySpace = true
                KeyA = true
                KeyD = true
            }, 1000)
        }else if(valorX - 10 < 0){
            document.documentElement.style.setProperty('--pulo-atras', 0 + '%');
            gif.style.animation = 'puloatras 1s linear'  
            setTimeout(function(){
                valorX = 0
                gif.style.marginLeft = valorX + '%'
                gif.style.animation = 'none'
                KeySpace = true
                KeyA = true
                KeyD = true
            }, 1000)            
        }
    }
}

function mexer(valor, direcao){
    if(direcao === 'KeyD'){
        controladorDirecao = 'Direita'
        gif.style.marginLeft = valor + '%'
        KeyD = true
    }else if(direcao === 'KeyA'){
        controladorDirecao = 'Esquerda'
        gif.style.marginLeft = valor + '%'
        KeyA = true
    }
}
function iniciar(){
    EsquerdaDireita()
}

iniciar()


let teste = new FindLocation(pista, gif)

console.log(teste.Location())