// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/VariableStepInput.lua

import { IInput } from './dcs-input';

export interface IVariableStepInput extends IInput {
    suggestedStep: number;
    maxValue: number;
}
