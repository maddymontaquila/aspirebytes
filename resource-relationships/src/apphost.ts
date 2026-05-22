import { createBuilder } from './.modules/aspire.js';

const builder = await createBuilder();

const cache = await builder
    .addRedis("cache");    

// Run the Express API and expose its HTTP endpoint externally.
const app = await builder
    .addNodeApp("app", "./api", "src/index.ts")
    .withHttpEndpoint({ env: "PORT" })
    .withExternalHttpEndpoints()
    .withEnvironment("API_KEY", "iLoveAspire123");

// Run the Vite frontend after the API and inject the API URL for local proxying.
const frontend = await builder
    .addViteApp("frontend", "./frontend")
    .withReference(app)
    .withReference(cache);

await builder.build().run();