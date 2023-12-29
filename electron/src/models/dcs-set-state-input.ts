// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/SetStateInput.lua

import { InputType } from './dcs-input-type';

export type ISetStateInput = {
    interface: InputType.setState;
    maxValue: number;
    description: string;
};
