import Address from "./address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _ative: boolean = true;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    isActive() {
        return this._ative;
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
        this.validate();
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

    Address(address: Address) {
        this._address = address;
    }
}