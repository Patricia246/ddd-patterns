import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../event/customer-created.event";
import SendConsoleLogHandlerWhenCustomerIsCreatedHandler from "../event/handler/send-console-log-handler-when-customer-is-created.handler";
import SendConsoleLog2HandlerWhenCustomerIsCreatedHandler from "../event/handler/send-console-log2-handler-when-customer-is-created.handler";
import Address from "../value-object/address";
import AddressChangedEvent from "../event/address-changed.event";
import SendConsoleLogHandlerWhenCustomerChangeAddressHandler from "../event/handler/send-console-log-handler-when-customer-change-address.handler";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _ative: boolean = true;
    private _rewardPoints: number = 0;
    private eventDispatcher: EventDispatcher;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
        this.eventDispatcher = new EventDispatcher();
        this.eventDispatcher.register("CustomerCreatedEvent", new SendConsoleLogHandlerWhenCustomerIsCreatedHandler());
        this.eventDispatcher.register("CustomerCreatedEvent", new SendConsoleLog2HandlerWhenCustomerIsCreatedHandler());
        this.eventDispatcher.notify(new CustomerCreatedEvent(this));
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

    get rewardPoints() {
        return this._rewardPoints;
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

    get Address(): Address {
        return this._address;
    }    

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    changeAddress(address: Address) {
        this._address = address;
        const addressChangedEvent = new AddressChangedEvent({
            id: this.id,
            name: this.name,
            address: this.Address,  // Novo endereço
          });
          this.eventDispatcher.register("AddressChangedEvent", new SendConsoleLogHandlerWhenCustomerChangeAddressHandler())
          this.eventDispatcher.notify(addressChangedEvent);
    }
}