// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/FixedStepInput.lua

import { InputType } from './dcs-input-type';

export type IFixedStepInput = {
    interface: InputType.fixedStep;
    description: string;
};
