export default class Address {
    _street: string;
    _number: number;
    _city: string;
    _state: string;
    _zipCode: string;

    constructor(street: string, number: number, city: string, state: string, country: string, zipCode: string) {
        this._street = street;
        this._number = number;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;
        this.validate();
    }

    validate() {
        if (this._street === "") {
            throw new Error("Street is required");
        }
        if (this._city === "") {
            throw new Error("City is required");
        }
        if (this._state === "") {
            throw new Error("State is required");
        }
        if (this._zipCode === "") {
            throw new Error("ZipCode is required");
        }
    }

    toString() {    
        return `${this._street}, ${this._number} - ${this._city}/${this._state} - ${this._zipCode}`;
    }
}