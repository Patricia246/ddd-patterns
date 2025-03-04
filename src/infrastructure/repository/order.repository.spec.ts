import { Sequelize } from "sequelize-typescript";


describe("Order repository unity tests", () => {
    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
        sequileze.addModels([OrdertModel]);
        await sequileze.sync();
      });
    
      afterEach(async () => {
        await sequileze.close();
      });
});