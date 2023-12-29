// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/VariableStepInput.lua

import { InputType } from './dcs-input-type';

export type IVariableStepInput = {
    interface: InputType.variableStep;
    suggestedStep: number;
    maxValue: number;
    description: string;
};
