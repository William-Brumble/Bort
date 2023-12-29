// See:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/documentation/Documentation.lua

import { ICategory } from './dcs-category';

export type IDocumentation = {
    categories: ICategory[];
};
