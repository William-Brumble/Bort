import * as path from 'path';

import { FileInteractor } from '../electron/src/filesystem-file-interactor';
import { JsonParser } from '../electron/src/filesystem-json-parser';
import { Application } from '../electron/src/application';

let application: Application | null;
let jsonParser: JsonParser | null;
let fileInteractor: FileInteractor | null;

beforeAll(() => {
    fileInteractor = new FileInteractor();
    jsonParser = new JsonParser();
    application = new Application(fileInteractor, jsonParser);
});

afterAll(() => {
    fileInteractor = null;
    jsonParser = null;
    application = null;
});

test('confirm AircraftAliases.json is ignored', async () => {
    if (!application) {
        throw new Error('uninitialized application');
    }

    const root = path.join(__dirname, 'test-assets', 'json');
    const modules = await application.getAllModules(root);
    const exists = modules.find(module => {
        return module.name === 'AircraftAliases';
    });
    expect(exists).toBe(undefined);
});
