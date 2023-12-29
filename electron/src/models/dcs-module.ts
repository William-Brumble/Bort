// This is an abstraction unique to Bort, it's akin to a json file / module.
// It's like the following, but only includes the name, and documentation:
// https://github.com/DCS-Skunkworks/dcs-bios/blob/master/Scripts/DCS-BIOS/lib/modules/Module.lua

import { IDocumentation } from './dcs-documentation';

export type IModule = {
    name: string;
    documentation: IDocumentation;
};
