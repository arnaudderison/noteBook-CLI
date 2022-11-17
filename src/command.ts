import { Config } from "./objects/configFile";
import readline from "node:readline";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";
import { saveSourceFile,saveConfigFile } from "./utils";


const DEFAULT_PATH_NOTE = path.join(os.homedir(), "Desktop/NoteBook/");

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

async function closed(file:string){
    const styleFile = path.join(file, "HTML/assets/style.css");
    const isCopy = await saveSourceFile("./style/style.css", styleFile);
    if(isCopy){
        NoteConfig.csslocation = path.join(styleFile, "style.css");
        NoteConfig.NoteBooklocation = file;
        NoteConfig.init = true;

        const issave = await saveConfigFile(path.join(os.homedir(), "NoteBookConfig.json"), NoteConfig)
        
        console.log(issave)
    }else{
        throw new Error('Error')
    }
    
}
