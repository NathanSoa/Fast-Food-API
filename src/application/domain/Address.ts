type addressProperties = {
    streetName: string,
    zipCode: string,
    cityName: string,
    stateName: string
}

export class Address {    

    constructor(props: addressProperties) {
        this.streetName = props.streetName
        this.zipCode = props.zipCode
        this.cityName = props.cityName
        this.stateName = props.stateName
    }

    get streetName(): string {
        return this.streetName
    }

    get zipCode(): string {
        return this.zipCode
    }

    get cityName(): string {
        return this.cityName
    }

    get stateName(): string {
        return this.stateName
    }

    set streetName(streetName: string) {
        this.streetName = streetName
    }

    set zipCode(zipCode: string) {
        this.zipCode = zipCode
    }

    set cityName(cityName: string) {
        this.cityName = cityName
    }

    set stateName(stateName: string) {
        this.stateName = stateName
    }
}