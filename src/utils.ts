import fs from "node:fs/promises";
import { constants } from "node:fs/promises";

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