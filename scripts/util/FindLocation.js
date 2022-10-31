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
        const WidthObject = getComputedStyle(this.GetObject).getPropertyValue('width').split("px")[0]
        const HeightObject = getComputedStyle(this.GetObject).getPropertyValue('height').split("px")[0]

        const WidthBox = getComputedStyle(this.GetBox).getPropertyValue('width').split("px")[0]
        const HeightBox = getComputedStyle(this.GetBox).getPropertyValue('height').split("px")[0]

        const MarginLeft = getComputedStyle(this.GetObject).getPropertyValue('margin-left').split("px")[0]
        const MarginTop = getComputedStyle(this.GetObject).getPropertyValue('margin-top').split("px")[0]

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