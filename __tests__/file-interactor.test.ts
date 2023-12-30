import * as path from 'path';

import { FileInteractor } from '../electron/src/filesystem-file-interactor';
import { JsonParser } from '../electron/src/filesystem-json-parser';
import { Application } from '../electron/src/application';

const root = path.join(__dirname, 'test-assets', 'json');
const fileInteractor = new FileInteractor();
const jsonParser = new JsonParser();
const application = new Application(root, fileInteractor, jsonParser);
let modulesUpdated = false;

beforeAll(async () => {
    if (!modulesUpdated) {
        await application.updateModulesFromDisk();
    }
});

test('confirm AircraftAliases is ignored', async () => {
    if (!application) {
        throw new Error('uninitialized application');
    }

    const modules = await application.getAllModules();
    const exists = modules.find(module => {
        return module.name === 'AircraftAliases';
    });
    expect(exists).toBe(undefined);
});

test('confirm that we are able to find all modules', async () => {
    if (!application) {
        throw new Error('uninitialized application');
    }

    const expectedModules = [
        'A-10C',
        'A-29B',
        'A-4E-C',
        'AH-64D',
        'AH-6J',
        'AJS37',
        'AV8BNA',
        'Alphajet',
        'Bf-109K-4',
        'C-101',
        'Christen Eagle II',
        'CommonData',
        'Edge540',
        'F-14',
        'F-15E',
        'F-16C_50',
        'F-22A',
        'F-5E-3',
        'F-86F Sabre',
        'FA-18C_hornet',
        'FC3',
        'FW-190A8',
        'FW-190D9',
        'I-16',
        'JF-17',
        'Ka-50',
        'L-39',
        'M-2000C',
        'MB-339',
        'MH-60R',
        'MetadataEnd',
        'MetadataStart',
        'Mi-24P',
        'Mi-8MT',
        'MiG-15bis',
        'MiG-19P',
        'MiG-21Bis',
        'MirageF1',
        'Mosquito',
        'NS430',
        'P-47D',
        'P-51D',
        'SA342',
        'SpitfireLFMkIX',
        'SuperCarrier',
        'UH-1H',
        'VNAO_Room',
        'VNAO_T-45',
        'Yak-52',
    ];

    const modules = await application.getAllModules();

    for (const expectedModule of expectedModules) {
        const result = modules.find(item => {
            return item.name === expectedModule;
        });
        expect(result).toBeDefined();
    }
});
