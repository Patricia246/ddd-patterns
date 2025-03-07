import EventHandlerInterface from "../../@shared/event-handler.interface";
import ProductCreatedEvent from "../../product/product-created.event";
import AddressChangedEvent from "../address-changed.event";

export default class SendConsoleLogHandlerWhenCustomerChangeAddressHandler implements EventHandlerInterface<AddressChangedEvent> {

    handle(event: AddressChangedEvent): void {
        const { id, name, address } = event.eventData;
        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address.toString()}`);
    }
}