// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/IntegerOutput.lua

import { Suffix } from './dcs-suffix';
import { OutputType } from './dcs-output-type';

export type IIntegerOutput = {
    mask: number;
    maxValue: number;
    shiftBy: number;
    address: number;
    suffix: Suffix;
    description: string;
    type: OutputType.integer;
};
