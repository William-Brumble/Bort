// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/Output.lua

import { OutputType } from './dcs-output-type';
import { Suffix } from './dcs-suffix';

export type IOutput = {
    address: number;
    suffix: Suffix;
    type: OutputType;
    description: string;
    addressIdentifier?: string;
    addressMaskIdentifier?: string;
    addressMaskShiftIdentifier?: string;
};
