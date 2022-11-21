/* 
            _                               _   ____            _                 
           / \   _ __ _ __   __ _ _   _  __| | |  _ \  ___ _ __(_)___  ___  _ __  
          / _ \ | '__| '_ \ / _` | | | |/ _` | | | | |/ _ \ '__| / __|/ _ \| '_ \ 
         / ___ \| |  | | | | (_| | |_| | (_| | | |_| |  __/ |  | \__ \ (_) | | | |
        /_/   \_\_|  |_| |_|\__,_|\__,_|\__,_| |____/ \___|_|  |_|___/\___/|_| |_|
*/

import { name, description, version } from "../package.json"
import { Command, InvalidArgumentError } from "commander";

import { compile, initialisation } from "./command";

const Program = new Command();

Program
    .name(name.replace("Arnaud Derison", ""))
    .version(version)
    .description(description);

Program
    .command("init")
    .description("Initialization of useful files")
    .action(async () => {
        await initialisation()
    });
Program
    .command("compileFile")
    .description("Compile a Mardown code to html")
    .argument("<file>", "Mardown File")
    .action(async (file) => {
        await compile(file);
        console.log("htmlCode");
    })
Program
    .command("compileNote")
    .description("Compile a Mardown code to html in note directory")
    .argument("<dir>", "Mardown directory")
    .action(async (dir) => {
        console.log("compiler le dossier notes ");
    })

Program.parse();