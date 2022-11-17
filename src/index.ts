/* 
            _                               _   ____            _                 
           / \   _ __ _ __   __ _ _   _  __| | |  _ \  ___ _ __(_)___  ___  _ __  
          / _ \ | '__| '_ \ / _` | | | |/ _` | | | | |/ _ \ '__| / __|/ _ \| '_ \ 
         / ___ \| |  | | | | (_| | |_| | (_| | | |_| |  __/ |  | \__ \ (_) | | | |
        /_/   \_\_|  |_| |_|\__,_|\__,_|\__,_| |____/ \___|_|  |_|___/\___/|_| |_|
*/

import { name, description, version } from "../package.json"
import { complilerToHtml } from "./compiler";
import { Command, InvalidArgumentError } from "commander";
import { readNote } from "./utils";
import { initialisation } from "./command";

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
    .command("compile")
    .description("Compile a Mardown code to html")
    .argument("<file>", "Mardown File")
    .action(async(file)=>{
        const htmlCode = complilerToHtml((await readNote(file)).toString());
        console.log(htmlCode);
    })

Program.parse();