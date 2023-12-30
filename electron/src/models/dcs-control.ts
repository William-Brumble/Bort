// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/Control.lua

import { ControlType } from './dcs-control-type';
import { MomentaryPositions } from './dcs-momentary-positions';
import { PhysicalVariant } from './dcs-physical-variant';
import { ApiVariant } from './dcs-api-variant';
import { IInput } from './dcs-input';
import { IActionInput } from './dcs-action-input';
import { IFixedStepInput } from './dcs-fixed-step-input';
import { ISetStateInput } from './dcs-set-state-input';
import { ISetStringInput } from './dcs-set-string-input';
import { IOutput } from './dcs-output';
import { IStringOutput } from './dcs-string-output';
import { IIntegerOutput } from './dcs-integer-output';

export type IControl = {
    category: string;
    controlType: ControlType;
    identifier: string;
    description: string;
    inputs: (IActionInput | IFixedStepInput | ISetStateInput | ISetStringInput)[];
    outputs: (IIntegerOutput | IStringOutput)[];
    momentaryPositions?: MomentaryPositions;
    physicalVariant?: PhysicalVariant;
    apiVariant?: ApiVariant;
};
