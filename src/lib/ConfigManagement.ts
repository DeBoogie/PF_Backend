import YAML from 'yaml';
import fs from 'fs';
import path from 'path';

import { IConfiguration } from '../interfaces/IConfiguration';

export class ConfigManagement {
    private configFile: string = path.join(__dirname, '../config.yml');

    constructor() {
        if (!fs.existsSync(this.configFile)) {
            console.log('Cannot find config.yml file. Copy config.yml to from the root of the project to the build directory.');
            process.exit();
        }
    }

    public getConfig(): IConfiguration {
        try {
            let config: IConfiguration = YAML.parse(fs.readFileSync(this.configFile, 'utf8'));
            return config;
        } catch (error) {
            console.error('Error parsing config file:', error);
            process.exit();
        }
    }
}