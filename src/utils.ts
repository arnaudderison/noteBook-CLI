/*          _                               _   ____            _                 
           / \   _ __ _ __   __ _ _   _  __| | |  _ \  ___ _ __(_)___  ___  _ __  
          / _ \ | '__| '_ \ / _` | | | |/ _` | | | | |/ _ \ '__| / __|/ _ \| '_ \ 
         / ___ \| |  | | | | (_| | |_| | (_| | | |_| |  __/ |  | \__ \ (_) | | | |
        /_/   \_\_|  |_| |_|\__,_|\__,_|\__,_| |____/ \___|_|  |_|___/\___/|_| |_|
*/
import fs from "node:fs/promises";
import { constants } from "node:fs/promises";
import { Reviver, Config } from "./objects/configFile";
import { DEFAULT_CONFIG_FILE } from "./command";

export async function readNote(path: string): Promise<string | number> {
    try {
        if(await fileExists(path)){
            const buffer: Buffer = await fs.readFile(path);
            const data: string = buffer.toString();
            return data;
        }
        return 0;
        
    } catch (err) {
        console.log(err)
        return 0;
    }
}

export async function fileExists(path:string):Promise<boolean>{
    try{
        await fs.access(path, constants.F_OK);
        return true;
    }catch(err){
        return false;
    }
}

export async function readConfigFile(file:string): Promise<Config>{
    try{
        if(await fileExists(file)){
            const buffer = await fs.readFile(file);
            const json:string = buffer.toString();
            return verifConfigFile(json);

        } throw new Error("erreur")
    }catch(err){
        throw err;
    }

}
export async function saveConfigFile(path:string, config: Config):Promise<boolean>{
    try{
        await fs.writeFile(path, JSON.stringify(config));
        return true;
    }catch(err){
        console.log(err)
        return false;
    }
}

export async function saveSourceFile(src:string, dest:string): Promise<boolean>{
    try{
        await fs.copyFile(src,dest);
        return true;
    }catch(err){
        console.log(err)
        return false;
    }
}

export async function writeHtmlFile(path:string, code:string):Promise<boolean>{
    const config = await readConfigFile(DEFAULT_CONFIG_FILE); 
    try{
        const startFile:string = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="${config.csslocation}"><title>Document</title></head><div class="container">`;
        const EndFile:string = '</div></body></html>';

        const newCode = startFile + code + EndFile;

        await fs.writeFile(path, newCode);
        return true;
    }catch(err){
        return false;
    }
}

function verifConfigFile(data:string): Config{
    try{
        const ObjectJsonInJs: Config = JSON.parse(data, Reviver);
        return ObjectJsonInJs;
    }catch(err){
        throw new Error("Error config File Format...")
    }
}
