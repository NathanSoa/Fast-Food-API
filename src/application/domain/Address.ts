type addressProperties = {
    streetName: string,
    zipCode: string,
    cityName: string,
    stateName: string
}

export class Address {    

    streetName: string
    zipCode: string
    cityName: string
    stateName: string
    
    constructor(props: addressProperties) {
        this.streetName = props.streetName
        this.zipCode = props.zipCode
        this.cityName = props.cityName
        this.stateName = props.stateName
    }
}