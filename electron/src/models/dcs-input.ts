// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/Input.lua

import { InputType } from './dcs-input-type';

export type IInput = {
    interface: InputType;
    description: string;
};
