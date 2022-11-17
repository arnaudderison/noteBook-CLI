/* 
            _                               _   ____            _                 
           / \   _ __ _ __   __ _ _   _  __| | |  _ \  ___ _ __(_)___  ___  _ __  
          / _ \ | '__| '_ \ / _` | | | |/ _` | | | | |/ _ \ '__| / __|/ _ \| '_ \ 
         / ___ \| |  | | | | (_| | |_| | (_| | | |_| |  __/ |  | \__ \ (_) | | | |
        /_/   \_\_|  |_| |_|\__,_|\__,_|\__,_| |____/ \___|_|  |_|___/\___/|_| |_|
*/
export type Config = {
    init: boolean;
    csslocation: string;
    NoteBooklocation: string; 
}

export function Reviver(key: string, value:any):any{
    if(key === "") return value;
    
    switch(key){
        case "init":
            if(!(typeof value === "boolean")) throw new Error("Error Confif File Format");
            return value;
        case "csslocation" || "NoteBooklocation":
            if (!(typeof value === "string")) {
                throw new Error("Error File format...");
            }
            return value;
        default:
            if(isNaN(parseInt(key,10))) return value;
            throw new Error("Error File format...");
    }
}