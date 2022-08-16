class Find {
    
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




