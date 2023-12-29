// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/Category.lua

import { IControl } from './dcs-control';

export type ICategory = {
    name: string;
    controls: IControl[];
};
