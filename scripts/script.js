const body = document.querySelector('body')
const pista = document.getElementById('gif')
const gif = document.getElementById('gif') 
let valorX = 0
let valorY = 0

let controladorX = 1

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
        }
    }

}

function mexer(valorX, direcao){
    
    
    if(direcao === 'KeyD'){
        gif.style.marginLeft = valorX + '%'
    }else if(direcao === 'KeyA'){
        gif.style.marginLeft = valorX + '%'
        
    }
    
    
}

function iniciar(){
    EsquerdaDireita()
}


iniciar()
