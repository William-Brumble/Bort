// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/IntegerOutput.lua

import { IOutput } from './dcs-output';

export interface IIntegerOutput extends IOutput {
    mask: number;
    maxValue: number;
    shiftBy: number;
}
