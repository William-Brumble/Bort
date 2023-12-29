// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/SetStringInput.lua

import { InputType } from './dcs-input-type';

export type ISetStringInput = {
    interface: InputType.setString;
    description: string;
};
