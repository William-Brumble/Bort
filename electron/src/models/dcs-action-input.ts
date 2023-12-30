// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/ActionInput.lua

import { IInput } from './dcs-input';
import { ActionArgument } from './dcs-action-argument';

export interface IActionInput extends IInput {
    argument: ActionArgument;
}
