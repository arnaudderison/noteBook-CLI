/* 
            _                               _   ____            _                 
           / \   _ __ _ __   __ _ _   _  __| | |  _ \  ___ _ __(_)___  ___  _ __  
          / _ \ | '__| '_ \ / _` | | | |/ _` | | | | |/ _ \ '__| / __|/ _ \| '_ \ 
         / ___ \| |  | | | | (_| | |_| | (_| | | |_| |  __/ |  | \__ \ (_) | | | |
        /_/   \_\_|  |_| |_|\__,_|\__,_|\__,_| |____/ \___|_|  |_|___/\___/|_| |_|
*/
import fs from "node:fs/promises";
import { constants } from "node:fs/promises";
import { Reviver, Config } from "./objects/configFile";

const DEFAULT_CONFIG_FILE = "./notebookConfig.json";

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

export async function readConfigFile(): Promise<Config | number>{
    try{
        if(await fileExists(DEFAULT_CONFIG_FILE)){
            const buffer = await fs.readFile(DEFAULT_CONFIG_FILE);
            const json:string = buffer.toString();
            return verifConfigFile(json);

        }else return -1;
    }catch(err){
        return -1;
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

function verifConfigFile(data:string): Config{
    try{
        const ObjectJsonInJs: Config = JSON.parse(data, Reviver);
        return ObjectJsonInJs;
    }catch(err){
        throw new Error("Error config File Format...")
    }
}