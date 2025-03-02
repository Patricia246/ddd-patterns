import Address from "./address";

class Customer {
    _id: string;
    _name: string;
    _address!: Address;
    _ative: boolean = true;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if (this._name === "") {
            throw new Error("Name is required");
        }
        if (this._id === "") {
            throw new Error("Id is required");
        }
    }

   changeName(name: string) {
        this._name = name;
    }    

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is required");
        }
        this._ative = true;
    }

    desactivate() {
        this._ative = false;
    }

    setAddress(address: Address) {
        this._address = address;
    }
}