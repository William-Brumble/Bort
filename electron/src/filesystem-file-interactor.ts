import * as fs from 'fs/promises';
import * as path from 'path';

export class FileInteractor {
    constructor() {}

    readAllModuleJsonFiles = async (root: string): Promise<any[]> => {
        try {
            const filenames = await fs.readdir(root);
            const jsonObjects = await Promise.all(
                filenames.map(async filename => {
                    try {
                        // exclude the AircraftAliases.json file as it's not a module
                        if (filename === 'AircraftAliases.json') {
                            return null;
                        }
                        const filePath = path.join(root, filename);
                        const fileContent = await fs.readFile(filePath, 'utf-8');
                        const jsonObject = JSON.parse(fileContent);
                        const moduleName = filename.split('.')[0];
                        return { name: moduleName, documentation: jsonObject };
                    } catch (error) {
                        if (error instanceof Error) {
                            console.error(`Error reading or parsing file ${filename}: ${error.message}`);
                        }
                        return null;
                    }
                }),
            );
            const validJsonObjects = jsonObjects.filter(obj => obj !== null);
            return validJsonObjects;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error reading directory: ${error.message}`);
            }
            return [];
        }
    };
}
