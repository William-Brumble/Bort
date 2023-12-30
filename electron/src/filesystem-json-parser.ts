import { ActionArgument } from './models/dcs-action-argument';
import { IActionInput } from './models/dcs-action-input';
import { IFixedStepInput } from './models/dcs-fixed-step-input';
import { ControlType } from './models/dcs-control-type';
import { InputType } from './models/dcs-input-type';
import { OutputType } from './models/dcs-output-type';
import { ISetStateInput } from './models/dcs-set-state-input';
import { ISetStringInput } from './models/dcs-set-string-input';
import { IVariableStepInput } from './models/dcs-variable-step-input';
import { IIntegerOutput } from './models/dcs-integer-output';
import { IStringOutput } from './models/dcs-string-output';
import { IControl } from './models/dcs-control';
import { IModule } from './models/dcs-module';
import { IDocumentation } from './models/dcs-documentation';
import { ICategory } from './models/dcs-category';
import { MomentaryPositions } from './models/dcs-momentary-positions';
import { PhysicalVariant } from './models/dcs-physical-variant';
import { ApiVariant } from './models/dcs-api-variant';

export class JsonParser {
    constructor() {}

    deserializeAllModules = async (rawModules: any[]): Promise<IModule[]> => {
        try {
            // Modules
            const deserializedModules = [];
            for (const rawModule of rawModules) {
                // Categories
                const categoryNames = Object.keys(rawModule.documentation);
                const deserializedCategories = [];
                for (const categoryName of categoryNames) {
                    const rawCategory = rawModule.documentation[categoryName];
                    const deserializedCategory = await this.deserializeCategory(categoryName, rawCategory);
                    deserializedCategories.push(deserializedCategory);
                }

                // Documentation
                const documentation: IDocumentation = {
                    categories: deserializedCategories,
                };

                // Module
                const deserializedModule: IModule = {
                    name: rawModule.name,
                    documentation: documentation,
                };
                deserializedModules.push(deserializedModule);
            }

            return deserializedModules;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Failed to deserialize modules: ${error.message}`);
            }
            return [];
        }
    };

    deserializeCategory = async (categoryName: string, rawCategory: any) => {
        // Category
        const controlNames = Object.keys(rawCategory);
        const deserializedControls = [];
        // Controls
        for (const controlName of controlNames) {
            const rawControl = rawCategory[controlName];
            const deserializedControl = await this.deserializeControl(rawControl);
            deserializedControls.push(deserializedControl);
        }

        const deserializedCategory: ICategory = {
            name: categoryName,
            controls: deserializedControls,
        };

        return deserializedCategory;
    };

    deserializeControl = async (rawControl: any) => {
        // Inputs
        const deserializedInputs: (
            | IActionInput
            | IFixedStepInput
            | ISetStateInput
            | ISetStringInput
            | IVariableStepInput
        )[] = [];
        for (const rawInput of rawControl.inputs) {
            const deserializedInput = await this.deserializeInput(rawInput);
            if (deserializedInput) {
                deserializedInputs.push(deserializedInput);
            }
        }

        // Outputs
        const deserializedOutputs: (IIntegerOutput | IStringOutput)[] = [];
        for (const rawOutput of rawControl.outputs) {
            const deserializedOutput = await this.deserializeOutput(rawOutput);
            if (deserializedOutput) {
                deserializedOutputs.push(deserializedOutput);
            }
        }

        // Control
        let controlType: ControlType | null;
        switch (rawControl.control_type) {
            case '2Pos_2Command_Switch_OpenClose':
                controlType = ControlType.twoPosTwoCommandSwitchOpenClose;
                break;
            case '3Pos_2Command_Switch_OpenClose':
                controlType = ControlType.threePosTwoCommandSwitchOpenClose;
                break;
            case 'action':
                controlType = ControlType.action;
                break;
            case 'analog_dial':
                controlType = ControlType.analogDial;
                break;
            case 'analog_gauge':
                controlType = ControlType.analogGauge;
                break;
            case 'discrete_dial':
                controlType = ControlType.discreteDial;
                break;
            case 'display':
                controlType = ControlType.display;
                break;
            case 'electrically_held_switch':
                controlType = ControlType.electricallyHeldSwitch;
                break;
            case 'emergency_parking_brake':
                controlType = ControlType.emergencyParkingBrake;
                break;
            case 'fixed_step_dial':
                controlType = ControlType.fixedStepDial;
                break;
            case 'frequency':
                controlType = ControlType.frequency;
                break;
            case 'led':
                controlType = ControlType.led;
                break;
            case 'limited_dial':
                controlType = ControlType.limitedDial;
                break;
            case 'metadata':
                controlType = ControlType.metadata;
                break;
            case 'mission_computer_switch':
                controlType = ControlType.missionComputerSwitch;
                break;
            case 'Multi':
                controlType = ControlType.multi;
                break;
            case 'radio':
                controlType = ControlType.radio;
                break;
            case 'selector':
                controlType = ControlType.selector;
                break;
            case 'toggle_switch':
                controlType = ControlType.toggleSwitch;
                break;
            case 'variable_step_dial':
                controlType = ControlType.variableStepDial;
                break;
            default:
                throw new Error(`json has invalid enum for control_type: ${rawControl.control_type}`);
        }

        let momentaryPosition: MomentaryPositions | undefined;
        if (rawControl.momentary_positions) {
            switch (rawControl.momentary_positions) {
                case 'none':
                    momentaryPosition = MomentaryPositions.none;
                    break;
                case 'last':
                    momentaryPosition = MomentaryPositions.last;
                    break;
                case 'first_and_last':
                    momentaryPosition = MomentaryPositions.firstAndLast;
                    break;
                default:
                    throw new Error(`json has invalid enum for momentary_positions: ${rawControl.momentary_positions}`);
            }
        }

        let physicalVariant: PhysicalVariant | undefined;
        if (rawControl.physical_variant) {
            switch (rawControl.physical_variant) {
                case '3_position_switch':
                    physicalVariant = PhysicalVariant.threePositionSwitch;
                    break;
                case 'button_light':
                    physicalVariant = PhysicalVariant.buttonLight;
                    break;
                case 'infinite_rotary':
                    physicalVariant = PhysicalVariant.infiniteRotary;
                    break;
                case 'limited_rotary':
                    physicalVariant = PhysicalVariant.limitedRotary;
                    break;
                case 'push_button':
                    physicalVariant = PhysicalVariant.pushButton;
                    break;
                case 'rocker_switch':
                    physicalVariant = PhysicalVariant.rockerSwitch;
                    break;
                case 'toggle_switch':
                    physicalVariant = PhysicalVariant.toggleSwitch;
                    break;
                default:
                    throw new Error(`json has invalid enum for physical_variant: ${rawControl.physical_variant}`);
            }
        }

        let apiVariant: ApiVariant | undefined;
        if (rawControl.api_variant) {
            switch (rawControl.api_variant) {
                case 'momentary_last_position':
                    apiVariant = ApiVariant.momentaryLastPosition;
                    break;
                case 'multiturn':
                    apiVariant = ApiVariant.multiturn;
                    break;
                default:
                    throw new Error(`json has invalid enum for api_variant: ${rawControl.api_variant}`);
            }
        }

        const deserializedControl: IControl = {
            category: rawControl.category,
            controlType: controlType,
            identifier: rawControl.identifier,
            description: rawControl.description,
            inputs: deserializedInputs,
            outputs: deserializedOutputs,
            momentaryPositions: momentaryPosition,
            physicalVariant: physicalVariant,
            apiVariant: apiVariant,
        };

        return deserializedControl;
    };

    deserializeInput = async (
        rawInput: any,
    ): Promise<IActionInput | IFixedStepInput | ISetStateInput | ISetStringInput | IVariableStepInput | null> => {
        let deserializedInput = null;

        switch (rawInput.interface) {
            case InputType.action:
                const actionInput: IActionInput = {
                    interface: InputType.action,
                    description: rawInput.description,
                    argument: rawInput.argument as ActionArgument,
                };
                deserializedInput = actionInput;
                break;

            case InputType.fixedStep:
                const fixedStepInput: IFixedStepInput = {
                    interface: InputType.fixedStep,
                    description: rawInput.description,
                };
                deserializedInput = fixedStepInput;
                break;

            case InputType.setState:
                const setStateInput: ISetStateInput = {
                    maxValue: rawInput.max_value,
                    interface: InputType.setState,
                    description: rawInput.description,
                };
                deserializedInput = setStateInput;
                break;

            case InputType.variableStep:
                const variableStepInput: IVariableStepInput = {
                    suggestedStep: rawInput.suggested_step,
                    maxValue: rawInput.max_value,
                    interface: InputType.variableStep,
                    description: rawInput.description,
                };
                deserializedInput = variableStepInput;
                break;

            case InputType.setString:
                const setStringInput: ISetStringInput = {
                    interface: InputType.setString,
                    description: rawInput.description,
                };
                deserializedInput = setStringInput;
                break;
        }

        return deserializedInput;
    };

    deserializeOutput = async (rawOutput: any): Promise<IStringOutput | IIntegerOutput | null> => {
        let deserializedOutput = null;

        switch (rawOutput.type) {
            case OutputType.integer:
                const outputInteger: IIntegerOutput = {
                    mask: rawOutput.mask,
                    maxValue: rawOutput.max_value,
                    shiftBy: rawOutput.shift_by,
                    address: rawOutput.address,
                    suffix: rawOutput.suffix,
                    description: rawOutput.description,
                    addressIdentifier: rawOutput.address_identifier,
                    addressMaskIdentifier: rawOutput.address_mask_identifier,
                    addressMaskShiftIdentifier: rawOutput.address_mask_shift_identifier,
                    type: OutputType.integer,
                };
                deserializedOutput = outputInteger;
                break;

            case OutputType.string:
                const outputString: IStringOutput = {
                    maxLength: rawOutput.max_length,
                    address: rawOutput.address,
                    suffix: rawOutput.suffix,
                    description: rawOutput.description,
                    addressIdentifier: rawOutput.address_identifier,
                    addressMaskIdentifier: rawOutput.address_mask_identifier,
                    addressMaskShiftIdentifier: rawOutput.address_mask_shift_identifier,
                    type: OutputType.string,
                };
                deserializedOutput = outputString;
                break;
        }

        return deserializedOutput;
    };
}
