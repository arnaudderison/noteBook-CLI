import { complilerToHtml } from "./compiler";
import { readNote } from "./utils";

async function writeCli(){
    const data = await readNote("note.txt");
    console.log("INIT DATA :\n", data);
    console.log("----------------------------------------------------------");
    console.log(complilerToHtml(data.toString()));
    console.log("----------------------------------------------------------");


}
writeCli()