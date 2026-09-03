import { createBuilder } from './.aspire/modules/aspire.mjs';

const builder = await createBuilder();

const cache = await builder
    .addRedis("cache");  

const externalSvc = await builder.addExternalService("legacy-db-or-something", "https://jsonplaceholder.typicode.com")

// Run the Express API and expose its HTTP endpoint externally.
const api = await builder
    .addNodeApp("api", "./api", "src/index.ts")
    .withHttpEndpoint({ env: "PORT" })
    .withExternalHttpEndpoints()
    .withEnvironment("API_KEY", "iLoveAspire123");

// Run the Vite frontend after the API and inject the API URL for local proxying.
const frontend = await builder
    .addViteApp("frontend", "./frontend")
    .withReference(api, { name: "BACKEND"})
    .withReference(cache)
    .withEnvironment("VITE_DB_URL", externalSvc)
    .withEnvironment("VITE_API_URL", api.getEndpoint("http"));


await builder.build().run();