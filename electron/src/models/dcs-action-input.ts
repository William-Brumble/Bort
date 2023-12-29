// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/ActionInput.lua

import { InputType } from './dcs-input-type';
import { ActionArgument } from './dcs-action-argument';

export type IActionInput = {
    interface: InputType.action;
    argument: ActionArgument;
    description: string;
};
