import ProductFactory from "./product.factory";

describe ("Product factory unity test", () => {
    it("should create a product type A", () =>{
        const product = ProductFactory.create("a","Product A", 1);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
        expect(product.constructor).toBe("Product");
    });

    it("should create a product type B", () =>{
        const product = ProductFactory.create("b","Product B", 1);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(2);
        expect(product.constructor).toBe("Product");
    });

    it("should throw error when product type C", () =>{
        expect(() => ProductFactory.create("C","Product C", 1)).toThrowError(
            "Product type not suported"
        );
    });
});