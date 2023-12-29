import { ActionArgument } from './models/dcs-action-argument';
import { IActionInput } from './models/dcs-action-input';
import { IFixedStepInput } from './models/dcs-fixed-step-input';
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

export class JsonParser {
    constructor() {}

    deserializeAllModules = async (rawModules: any[]): Promise<IModule[]> => {
        try {
            const deserializedModules = [];
            for (const rawModule of rawModules) {
                const categoryNames = Object.keys(rawModule.documentation);
                const deserializedCategories = [];
                for (const categoryName of categoryNames) {
                    const rawCategory = rawModule.documentation[categoryName];
                    const deserializedCategory = await this.deserializeCategory(rawCategory);
                    deserializedCategories.push(deserializedCategory);
                }

                const documentation: IDocumentation = {
                    categories: deserializedCategories,
                };

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

    deserializeCategory = async (rawCategory: any) => {
        const controlNames = Object.keys(rawCategory);
        const deserializedControls = [];
        for (const controlName of controlNames) {
            const rawControl = rawCategory[controlName];
            const deserializedControl = await this.deserializeControl(rawControl);
            deserializedControls.push(deserializedControl);
        }

        const deserializedCategory: ICategory = {
            name: rawCategory.name,
            controls: deserializedControls,
        };

        return deserializedCategory;
    };

    deserializeControl = async (rawControl: any) => {
        const deserializedInputs = [];
        for (const rawInput of rawControl.inputs) {
            const deserializedInput = await this.deserializeInput(rawInput);
            if (deserializedInput) {
                deserializedInputs.push(deserializedInput);
            }
        }

        const deserializedOutputs = [];
        for (const rawOutput of rawControl.outputs) {
            const deserializedOutput = await this.deserializeOutput(rawOutput);
            if (deserializedOutput) {
                deserializedOutputs.push(deserializedOutput);
            }
        }

        const deserializedControl: IControl = {
            category: rawControl.category,
            controlType: rawControl.control_type,
            identifier: rawControl.identifier,
            description: rawControl.description,
            inputs: deserializedInputs,
            outputs: deserializedOutputs,
            momentaryPositions: rawControl.momentary_positions,
            physicalVariant: rawControl.physical_variant,
            apiVariant: rawControl.api_variant,
        };

        return deserializedControl;
    };

    deserializeInput = async (rawInput: any) => {
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
                    interface: InputType.setState,
                    description: rawInput.description,
                    maxValue: rawInput.max_value,
                };
                deserializedInput = setStateInput;
                break;

            case InputType.variableStep:
                const variableStepInput: IVariableStepInput = {
                    interface: InputType.variableStep,
                    description: rawInput.description,
                    suggestedStep: rawInput.suggestedStep,
                    maxValue: rawInput.max_value,
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

    deserializeOutput = async (rawOutput: any) => {
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
                    type: OutputType.string,
                };
                deserializedOutput = outputString;
                break;
        }

        return deserializedOutput;
    };
}
