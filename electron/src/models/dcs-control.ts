// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/Control.lua

import { ControlType } from './dcs-control-type';
import { IInput } from './dcs-input';
import { IOutput } from './dcs-output';
import { MomentaryPositions } from './dcs-momentary-positions';
import { PhysicalVariant } from './dcs-physical-variant';
import { ApiVariant } from './dcs-api-variant';

export type IControl = {
    category: string;
    controlType: ControlType;
    identifier: string;
    description: string;
    inputs: IInput[];
    outputs: IOutput[];
    momentaryPositions: MomentaryPositions;
    physicalVariant: PhysicalVariant;
    apiVariant: ApiVariant;
};
