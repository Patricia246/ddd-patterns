import Product from "./product";
describe("Protuct unit test", () => {
    
    it("should throw error when id is empty", () => {
    expect(() => {
        const product = new Product("", "prod1", 100);
     }).toThrowError("Invalid id");
    });

    it("should throw error when name is empty", () => {
     expect(() => {
          const product = new Product("1", "", 100);
     }).toThrowError("Invalid name");
    });

    it("should throw error when price is empty", () => {
     expect(() => {
          const product = new Product("1", "prod1", 0);
     }).toThrowError("Invalid price");
    });

    it("should throw error when price is less then zero", () => {
        expect(() => {
             const product = new Product("1", "prod1", -1);
        }).toThrowError("Price cannot be less than zero");
    });

    it("should change name", () => {
        const product = new Product("1", "prod1", 100);
        product.changeName("prod2");
        expect(product.name).toBe("prod2");
    });

    it("should change prace", () => {
        const product = new Product("1", "prod1", 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });

});