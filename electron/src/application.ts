import { FileInteractor } from './filesystem-file-interactor';
import { JsonParser } from './filesystem-json-parser';
import { IModule } from './models/dcs-module';

export class Application {
    private _root: string;
    private _fileInteractor: FileInteractor;
    private _jsonParser: JsonParser;
    private _modules: IModule[] = [];

    constructor(root: string, fileInteractor: FileInteractor, jsonParser: JsonParser) {
        this._root = root;
        this._fileInteractor = fileInteractor;
        this._jsonParser = jsonParser;
    }

    setRootPath = async (root: string) => {
        this._root = root;
    };

    updateModulesFromDisk = async () => {
        const rawModules = await this._fileInteractor.readAllModuleJsonFiles(this._root);
        const deserializedModules = await this._jsonParser.deserializeAllModules(rawModules);
        this._modules = deserializedModules;
    };

    getAllModules = async () => {
        return this._modules;
    };

    getModuleByName = async (moduleName: string) => {
        const module = this._modules.find(module => {
            return module.name === moduleName;
        });

        if (!module) {
            throw new Error(`Module name: ${moduleName} not found`);
        }

        return module;
    };

    getAllModuleNames = async () => {
        const moduleNames = [];
        for (const module of this._modules) {
            moduleNames.push(module.name);
        }
        return moduleNames;
    };

    getAllCategoryNamesByModuleName = async (moduleName: string) => {
        const module = this._modules.find(module => {
            return module.name === moduleName;
        });

        if (!module) {
            throw new Error(`Module name: ${moduleName} not found`);
        }

        const categoryNames = [];
        for (const category of module.documentation.categories) {
            categoryNames.push(category.name);
        }

        return categoryNames;
    };

    getAllControlIdentifiersByNames = async (moduleName: string, categoryName: string) => {
        const module = await this.getModuleByName(moduleName);

        if (!module) {
            throw new Error(`Module name: ${moduleName} not found`);
        }

        const category = module.documentation.categories.find(category => {
            return category.name === categoryName;
        });

        if (!category) {
            throw new Error(`Category name: ${categoryName} not found`);
        }

        const controlIdentifiers = [];
        for (const control of category.controls) {
            controlIdentifiers.push(control.identifier);
        }

        return controlIdentifiers;
    };

    getControlByNames = async (moduleName: string, categoryName: string, identiferName: string) => {
        const module = await this.getModuleByName(moduleName);

        if (!module) {
            throw new Error(`Module name: ${moduleName} not found`);
        }

        const category = module.documentation.categories.find(category => {
            return category.name === categoryName;
        });

        if (!category) {
            throw new Error(`Category name: ${categoryName} not found`);
        }

        const control = category.controls.find(control => {
            return control.identifier === identiferName;
        });

        if (!control) {
            throw new Error(`Control identifier: ${identiferName} not found`);
        }

        return control;
    };
}
