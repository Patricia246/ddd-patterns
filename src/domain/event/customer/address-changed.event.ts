import Address from "../../entity/address";
import EventInterface from "../@shared/event.interface";

interface AddressChangedEventData {
    id: string;
    name: string;
    address: Address;
  }
  
  export default class AddressChangedEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: AddressChangedEventData;
  
    constructor(eventData: AddressChangedEventData) {
      this.dataTimeOcurred = new Date();  
      this.eventData = eventData; 
    }
  }