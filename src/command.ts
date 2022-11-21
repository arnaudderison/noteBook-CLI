/* 
            _                               _   ____            _                 
           / \   _ __ _ __   __ _ _   _  __| | |  _ \  ___ _ __(_)___  ___  _ __  
          / _ \ | '__| '_ \ / _` | | | |/ _` | | | | |/ _ \ '__| / __|/ _ \| '_ \ 
         / ___ \| |  | | | | (_| | |_| | (_| | | |_| |  __/ |  | \__ \ (_) | | | |
        /_/   \_\_|  |_| |_|\__,_|\__,_|\__,_| |____/ \___|_|  |_|___/\___/|_| |_|
*/
import { Config } from "./objects/configFile";
import readline from "node:readline";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";
import { saveSourceFile,saveConfigFile, readNote, writeHtmlFile, readConfigFile } from "./utils";
import { complilerToHtml } from "./compiler";


const DEFAULT_PATH_NOTE = path.join(os.homedir(), "Desktop/NoteBook-CLI/");
export const DEFAULT_CONFIG_FILE = path.join(os.homedir(), "NoteBookConfig.json");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let NoteConfig:Config = {
    init: false,
    csslocation: "",
    NoteBooklocation: ""
}

export async function initialisation() {
    rl.question("Emplcament of your note file - [Y] for DEFAULT>>", (noteFile) => {
        if (noteFile.toLowerCase() === "y") {
            fs.mkdir(DEFAULT_PATH_NOTE, { recursive: true }, (err, path) => {
                if (err) throw err;
                console.log("[+] Create file :" + path);
            })
            fs.mkdir(DEFAULT_PATH_NOTE + "HTML/assets/", { recursive: true }, (err, path) => {
                if (err) throw err;
                console.log("[+] Create file :" + path);
            })
            fs.mkdir(DEFAULT_PATH_NOTE + "Notes", { recursive: true }, (err, path) => {
                if (err) throw err;
                console.log("[+] Create file :" + path);
                closed(DEFAULT_PATH_NOTE)
                rl.close();
            })
        } else {
            fs.mkdir(noteFile, { recursive: true }, (err, path) => {
                if (err) throw err;
                console.log(path);
            })
            fs.mkdir(path.join(noteFile, "HTML/assets/"), { recursive: true }, (err, path) => {
                if (err) throw err;
                console.log("[+] Create file :" + path);
            })
            fs.mkdir(path.join(noteFile, "Notes"), { recursive: true }, (err, path) => {
                if (err) throw err;
                console.log("[+] Create file :" + path);
                closed(noteFile);
                rl.close();
                
            })   
        }

    })
}

export async function compile(file:string){
    try{
        const htmlCode = complilerToHtml((await readNote(file)).toString());
        const configFile = await readConfigFile(DEFAULT_CONFIG_FILE);

        let fileName = file.split("\\")
        const fileNameTab = fileName[fileName.length - 1].split(".")
      
        
        await writeHtmlFile(path.join(configFile.NoteBooklocation, `HTML/${fileNameTab[0]}.html`),htmlCode);
        rl.close()
        return true;
    }catch(err){
        console.log(err)
        return false;
    }
    
}

async function closed(file:string){
    const styleFile = path.join(file, "HTML/assets/style.css");
    const isCopy = await saveSourceFile("./style/style.css", styleFile);
    if(isCopy){
        NoteConfig.csslocation = styleFile;
        NoteConfig.NoteBooklocation = file;
        NoteConfig.init = true;

        await saveConfigFile(DEFAULT_CONFIG_FILE, NoteConfig)
        
    }else{
        throw new Error('Error')
    }
    
}
