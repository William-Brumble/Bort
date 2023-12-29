import { FileInteractor } from './filesystem-file-interactor';
import { JsonParser } from './filesystem-json-parser';

export class Application {
    private _fileInteractor: FileInteractor;
    private _jsonParser: JsonParser;

    constructor(fileInteractor: FileInteractor, jsonParser: JsonParser) {
        this._fileInteractor = fileInteractor;
        this._jsonParser = jsonParser;
    }

    getAllModules = async (root: string) => {
        const rawModules = await this._fileInteractor.readAllModuleJsonFiles(root);
        const deserializedModules = await this._jsonParser.deserializeAllModules(rawModules);
        return deserializedModules;
    };
}
