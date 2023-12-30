import * as path from 'path';

import { FileInteractor } from '../electron/src/filesystem-file-interactor';
import { JsonParser } from '../electron/src/filesystem-json-parser';
import { Application } from '../electron/src/application';
import { IModule } from '../electron/src/models/dcs-module';
import { OutputType } from '../electron/src/models/dcs-output-type';
import { InputType } from '../electron/src/models/dcs-input-type';
import { IIntegerOutput } from '../electron/src/models/dcs-integer-output';
import { IStringOutput } from '../electron/src/models/dcs-string-output';
import { IActionInput } from '../electron/src/models/dcs-action-input';
import { IFixedStepInput } from '../electron/src/models/dcs-fixed-step-input';
import { ISetStateInput } from '../electron/src/models/dcs-set-state-input';
import { IVariableStepInput } from '../electron/src/models/dcs-variable-step-input';
import { ISetStringInput } from '../electron/src/models/dcs-set-string-input';
import { IControl } from '../electron/src/models/dcs-control';

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

test('get all modules', async () => {
    if (!application) {
        throw new Error('uninitialized application');
    }

    const modules = await application.getAllModules();
    expect(Array.isArray(modules)).toBe(true);

    // this causes the test to be slow, but maybe
    // that's okay, will need to see how it acts
    // during normal operation/runtime
    for (let i = 0; i < modules.length; i++) {
        await verifyModule(modules[i]);
    }
});

test('get all module names', async () => {
    if (!application) {
        throw new Error('uninitialized application');
    }

    const moduleNames = await application.getAllModuleNames();
    expect(Array.isArray(moduleNames)).toBe(true);
    expect(moduleNames).toEqual([
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
    ]);
});

test('get module by name', async () => {
    if (!application) {
        throw new Error('uninitialized application');
    }

    const module = await application.getModuleByName('A-10C');
    await verifyModule(module);
});

const verifyModule = async (module: IModule) => {
    // Module checks
    expect(module.name).toEqual(expect.any(String));
    expect(Array.isArray(module.documentation.categories)).toBe(true);

    // Category checks
    for (const category of module.documentation.categories) {
        expect(category.name).toEqual(expect.any(String));
        expect(Array.isArray(category.controls)).toBe(true);

        // Control checks
        for (const control of category.controls) {
            await verifyControl(control);

            // Input checks
            for (let input of control.inputs) {
                await verifyInput(input);
            }

            // Output checks
            for (let output of control.outputs) {
                await verifyOutput(output);
            }
        }
    }
};

const verifyControl = async (control: IControl) => {
    expect(control.category).toEqual(expect.any(String));
    expect([
        '2Pos_2Command_Switch_OpenClose',
        '3Pos_2Command_Switch_OpenClose',
        'action',
        'analog_dial',
        'analog_gauge',
        'discrete_dial',
        'display',
        'electrically_held_switch',
        'emergency_parking_brake',
        'fixed_step_dial',
        'frequency',
        'led',
        'limited_dial',
        'metadata',
        'mission_computer_switch',
        'Multi',
        'radio',
        'selector',
        'toggle_switch',
        'variable_step_dial',
    ]).toContain(control.controlType);
    expect(control.identifier).toEqual(expect.any(String));
    expect(control.description).toEqual(expect.any(String));
    if (control.momentaryPositions) {
        expect(['none', 'last', 'first_and_last']).toContain(control.momentaryPositions);
    }
    if (control.physicalVariant) {
        expect([
            '3_position_switch',
            'button_light',
            'infinite_rotary',
            'limited_rotary',
            'push_button',
            'rocker_switch',
            'toggle_switch',
        ]).toContain(control.physicalVariant);
    }
    if (control.apiVariant) {
        expect(['momentary_last_position', 'multiturn']).toContain(control.apiVariant);
    }
};

const verifyInput = async (
    input: IActionInput | IFixedStepInput | ISetStateInput | IVariableStepInput | ISetStringInput,
) => {
    expect(input.interface).toEqual(expect.any(String));
    expect(['action', 'fixed_step', 'set_state', 'variable_step', 'set_string']).toContain(input.interface);
    expect(input.description).toEqual(expect.any(String));
    switch (input.interface) {
        case InputType.action:
            input = input as IActionInput;
            expect(input.description).toEqual(expect.any(String));
            break;

        case InputType.fixedStep:
            const fixedSetpInput = input as IFixedStepInput;
            break;

        case InputType.setState:
            const setStateInput = input as ISetStateInput;
            expect(setStateInput.maxValue).toEqual(expect.any(Number));
            break;

        case InputType.variableStep:
            const variableStepInput = input as IVariableStepInput;
            expect(variableStepInput.suggestedStep).toEqual(expect.any(Number));
            expect(variableStepInput.maxValue).toEqual(expect.any(Number));
            break;

        case InputType.setString:
            const setStringInput = input as ISetStringInput;
            break;
    }
};

const verifyOutput = async (output: IIntegerOutput | IStringOutput) => {
    expect(output.address).toEqual(expect.any(Number));
    expect(output.suffix).toEqual(expect.any(String));
    expect(['', '_INT', '_STR', '_KNOB_POS']).toContain(output.suffix);
    expect(output.type).toEqual(expect.any(String));
    expect(['integer', 'string']).toContain(output.type);
    expect(output.description).toEqual(expect.any(String));
    if (output.addressIdentifier) {
        expect(output.addressIdentifier).toEqual(expect.any(String));
    }
    if (output.addressMaskIdentifier) {
        expect(output.addressMaskIdentifier).toEqual(expect.any(String));
    }
    if (output.addressMaskShiftIdentifier) {
        expect(output.addressMaskShiftIdentifier).toEqual(expect.any(String));
    }
    switch (output.type) {
        case OutputType.integer:
            const integerOutput = output as IIntegerOutput;
            expect(integerOutput.mask).toEqual(expect.any(Number));
            expect(integerOutput.maxValue).toEqual(expect.any(Number));
            expect(integerOutput.shiftBy).toEqual(expect.any(Number));
            break;
        case OutputType.string:
            const stringOutput = output as IStringOutput;
            expect(stringOutput.maxLength).toEqual(expect.any(Number));
            break;
    }
};

test('get all category names by module name', async () => {
    if (!application) {
        throw new Error('uninitialized application');
    }

    const categoryNames = await application.getAllCategoryNamesByModuleName('A-10C');
    expect(categoryNames).toEqual([
        'AAP',
        'ADI',
        'AHCP',
        'AOA Indicator',
        'ARC-210',
        'ARC-210 Display',
        'ARC-210 Radio',
        'Accelerometer',
        'Airspeed Indicator',
        'Altimeter',
        'Antenna Panel',
        'Auxiliary Light Control Panel',
        'CDU',
        'CDU Display',
        'CMSC',
        'CMSP',
        'Caution Lights Panel',
        'Circuit Breaker Panel',
        'DVADR',
        'Digital Clock',
        'Electrical Power Panel',
        'Emergency Flight Control Panel',
        'Engine Instruments',
        'Environment Control Panel',
        'External Aircraft Model',
        'Front Dash',
        'Fuel Panel',
        'Fuel System Control Panel',
        'Glare Shield',
        'HARS',
        'HMCS Panel',
        'HSI',
        'HUD',
        'IFF',
        'ILS Panel',
        'Intercom Panel',
        'LASTE Panel',
        'Landing Gear and Flap Control Panel',
        'Left MFCD',
        'Light System Control Panel',
        'Misc',
        'NMSP',
        'Oxygen Regulator Panel',
        'RWR',
        'Right MFCD',
        'SAS Panel',
        'Secure Voice Comms Panel',
        'Stall System Volume Controls',
        'Standby Attitude Indicator',
        'Standby Compass',
        'TACAN Panel',
        'TISL Panel',
        'Throttle',
        'UFC',
        'UHF Radio',
        'VHF AM Radio',
        'VHF FM Radio',
        'VVI',
    ]);
});

test('get all control identifiers by module and category names', async () => {
    if (!application) {
        throw new Error('uninitialized application');
    }

    const controlIdentifiers = await application.getAllControlIdentifiersByNames('A-10C', 'AAP');
    expect(controlIdentifiers).toEqual(['AAP_CDUPWR', 'AAP_EGIPWR', 'AAP_PAGE', 'AAP_STEER', 'AAP_STEERPT']);
});

test('get control by module, category, and identifier  names', async () => {
    if (!application) {
        throw new Error('uninitialized application');
    }

    const controlIdentifiers = await application.getAllControlIdentifiersByNames('A-10C', 'AAP');
    expect(controlIdentifiers).toEqual(['AAP_CDUPWR', 'AAP_EGIPWR', 'AAP_PAGE', 'AAP_STEER', 'AAP_STEERPT']);

    const control = await application.getControlByNames('A-10C', 'AAP', 'AAP_PAGE');
    expect(control.identifier).toEqual('AAP_PAGE');
});
