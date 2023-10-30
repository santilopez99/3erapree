import config from "../config/index.js";
import mongoDB from "../db/mongo.db.js";
import __dirname from "../utils.js";

const { persistence } = config.app;

export let ProductDAO;
export let CartDAO;
export let UserDAO;
export let TicketDAO

switch (persistence) {
    case 'MONGO':
        mongoDB.getInstance();

        const { default: ProductMongo } = await import("./mongoDB/persistence/productsManager.mongoDB.js");
        ProductDAO = new ProductMongo();

        const { default: CartMongo } = await import("./mongoDB/persistence/cartsManager.mongoDB.js");
        CartDAO = new CartMongo();

        const { default: UserMongo } = await import("./mongoDB/persistence/usersManager.mongoDB.js");
        UserDAO = new UserMongo();

        const { default: TicketMongo } = await import('./mongoDB/persistence/ticketsManager.mongoDB.js');
        TicketDAO = new TicketMongo();

        console.log('Persistence in MongoDB');
        break;
        
    case 'FILES':
        const { default: ProductFiles } = await import("./fileSystem/productsManager.fileSystem.js");
        const productsPath = __dirname + '/files/products.json';
        ProductDAO = new ProductFiles(productsPath);

        const { default: CartFiles } = await import("./fileSystem/cartsManager.fileSystem.js");
        const cartPath = __dirname + '/files/carts.json';
        CartDAO = new CartFiles(cartPath);

        const { default: UserFiles } = await import("./fileSystem/usersManager.fileSystem.js");
        const usersPath = __dirname + '/files/users.json';
        UserDAO = new UserFiles(usersPath);

        const { default: TicketFiles } = await import("./fileSystem/ticketsManager.fileSystem.js");
        const ticketsPath = __dirname + '/files/tickets.json';
        TicketDAO = new TicketFiles(ticketsPath);

        console.log('Persistence in File System');
        break;
};