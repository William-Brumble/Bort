// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/StringOutput.lua

import { OutputType } from './dcs-output-type';
import { Suffix } from './dcs-suffix';

export type IStringOutput = {
    maxLength: number;
    address: number;
    suffix: Suffix;
    description: string;
    type: OutputType.string;
};
