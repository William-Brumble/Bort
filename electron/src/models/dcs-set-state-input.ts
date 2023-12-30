// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/SetStateInput.lua

import { IInput } from './dcs-input';

export interface ISetStateInput extends IInput {
    maxValue: number;
}
