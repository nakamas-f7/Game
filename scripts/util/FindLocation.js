export class FindLocation {
    #Box
    #Object
    constructor(Box, Object){
        this.#Box = Box
        this.#Object = Object
    }

    get GetBox(){
        return this.#Box
    }

    get GetObject(){
        return this.#Object
    }

    get GetLocation(){
        return this.#FindLocation
    }

    #FindLocation(){
        let WidthObject = getComputedStyle(this.GetObject).getPropertyValue('width').split("px")[0]
        let HeightObject = getComputedStyle(this.GetObject).getPropertyValue('height').split("px")[0]

        let WidthBox = getComputedStyle(this.GetBox).getPropertyValue('width').split("px")[0]
        let HeightBox = getComputedStyle(this.GetBox).getPropertyValue('height').split("px")[0]

        let MarginLeft = getComputedStyle(this.GetObject).getPropertyValue('margin-left').split("px")[0]
        let MarginTop = getComputedStyle(this.GetObject).getPropertyValue('top').split("px")[0]
        
        let MarginRight
        let MarginBottom
        
        if(Number(MarginLeft.split('px')[0]) === 0){
            MarginRight = (Number(WidthBox.split('px')[0]) - Number(WidthObject.split('px')[0]))
        }else if((MarginLeft.split('px')[0]) > 0) {
            MarginRight = ((Number(WidthBox.split("px")[0]) - Number(MarginLeft.split("px")[0])) - Number(WidthObject.split("px")[0]))
        }

        if(Number(MarginTop.split('px')[0]) === 0){
            MarginBottom = (Number(HeightBox.split('px')[0]) - Number(HeightObject.split('px')[0]))
        }else if((MarginTop.split('px')[0]) > 0 || (MarginTop.split('px')[0]) < 0) {
            MarginBottom = ((Number(HeightBox.split("px")[0]) - Number(MarginTop.split("px")[0])) - Number(HeightObject.split("px")[0]))
        }
        const Location = [WidthObject, HeightObject, WidthBox, HeightBox, MarginLeft, MarginTop, MarginRight, MarginBottom]

        return Location
    }
}