
/*============ Variaveis ============*/ 

const body = document.querySelector('body')

const pista = document.getElementById('gif')

const gif = document.getElementById('gif') 

const banco = document.getElementById('banco')

let valorX = 0
let altura = 0
let controladorDirecao = 'null'
let controladorPulo = 0

/*============ Funções ============*/ 

function EsquerdaDireita(){
    body.onkeydown = function(event){
        console.log(event.code)
        if(event.code === 'KeyD'){
            if(valorX < 90 ){
                if((valorX + valorX) >= 0){
                    valorX += 1.5
                    mexer(valorX, 'KeyD')
                }
            }
        }else if(event.code === 'KeyA'){
            if(valorX >= 1.5 ){
                if((valorX + valorX) >= 1){
                    valorX -= 1.5
                    mexer(valorX, 'KeyA')
                }                
            }
        }else if(event.code === 'Space'){
            if(altura === 0){
                altura = 20
                mexer(altura, 'Space')
            }
        }
    }
}


function pulo(){
    if(controladorDirecao === 'Esquerda'){
        if(valorX - 10 >= 0 ){
            valorX -= 10 
            gif.style.marginLeft = valorX + '%'
        }else if(valorX - 10 < 0){
            valorX = 0
            gif.style.marginLeft = 0
        }
    }else if(controladorDirecao === 'Direita'){
        if(valorX + 10 <= 100){
            valorX += 10 
            gif.style.marginLeft = valorX + '%'
        }else if(valorX + 10 > 100){
            valorX = 100
            gif.style.marginLeft = valorX + '%'
        }
    }
    
}
function mexer(valor, direcao){
    if(direcao === 'KeyD'){
        controladorDirecao = 'Direita'
        gif.style.marginLeft = valor + '%'
    }else if(direcao === 'KeyA'){
        controladorDirecao = 'Esquerda'
        gif.style.marginLeft = valor + '%'
    }else if(direcao === 'Space'){
        pulo()
        gif.style.marginBottom = valor + '%'
        gif.style.animation = 'gif 1s linear'
        setTimeout(function(){
            gif.style.animation = 'none'
            gif.style.marginBottom = 0
        }, 1000)
        altura = 0
    }
}
function iniciar(){
    EsquerdaDireita()
}
iniciar()
