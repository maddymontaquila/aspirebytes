// Aspire TypeScript AppHost
// For more information, see: https://aspire.dev

import { createBuilder } from './.aspire/modules/aspire.mjs';

const builder = await createBuilder();

const api = builder.addPythonApp('api', './src', 'api.py')
    .withHttpEndpoint({'env': 'PORT'});

await builder.addViteApp('frontend', './src/frontend')
    .withEnvironment('VITE_API_BASE_URL', api.getEndpoint('http'));

await builder.build().run();