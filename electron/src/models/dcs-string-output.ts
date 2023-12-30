// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/StringOutput.lua

import { IOutput } from './dcs-output';

export interface IStringOutput extends IOutput {
    maxLength: number;
}
