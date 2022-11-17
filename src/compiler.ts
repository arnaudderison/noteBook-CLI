/* 
            _                               _   ____            _                 
           / \   _ __ _ __   __ _ _   _  __| | |  _ \  ___ _ __(_)___  ___  _ __  
          / _ \ | '__| '_ \ / _` | | | |/ _` | | | | |/ _ \ '__| / __|/ _ \| '_ \ 
         / ___ \| |  | | | | (_| | |_| | (_| | | |_| |  __/ |  | \__ \ (_) | | | |
        /_/   \_\_|  |_| |_|\__,_|\__,_|\__,_| |____/ \___|_|  |_|___/\___/|_| |_|
*/
const BOLD_REGEX = /\*\*(.*)\*\*/gi;
const ITALIC_REGEX = /\*(.*)\*/gi;

const H1_REGEX = /# (.*)/gi;
const H2_REGEX = /## (.*)/gi;
const H3_REGEX = /### (.*)/gi;
const H4_REGEX = /#### (.*)/gi;
const H5_REGEX = /##### (.*)/gi;
const H6_REGEX = /###### (.*)/gi;

const LINK_REGEX = /\[(.*)\]\(((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)\)/gi;

const HIGHLIGHT_REGEX = /\`(.*)\`/gi;




export function complilerToHtml(data: string): string {
    let newData = replaceInData(data, BOLD_REGEX, '<strong>$1</strong>');
    newData = replaceInData(data, BOLD_REGEX, '<strong>$1</strong>');
    newData = replaceInData(newData, ITALIC_REGEX, "<i>$1</i>");

    newData = replaceInData(newData, H6_REGEX, "<h6>$1</h6>");
    newData = replaceInData(newData, H5_REGEX, "<h5>$1</h5>");
    newData = replaceInData(newData, H4_REGEX, "<h4>$1</h4>");
    newData = replaceInData(newData, H3_REGEX, "<h3>$1</h3>");
    newData = replaceInData(newData, H2_REGEX, "<h2>$1</h2>");
    newData = replaceInData(newData, H1_REGEX, "<h1>$1</h1>");
    

    newData = paragrapheParser(newData);
    newData = replaceUrlInData(newData);

    newData = codeParser(newData);
    newData = replaceInData(newData, HIGHLIGHT_REGEX, '<span class="highlight">$1</span>');

    return newData + "\n";
}

function replaceInData(data: string, regex: RegExp, strReplace: string): string {
    const newData = data.replace(regex, strReplace);
    return newData
}
function replaceUrlInData(data:string):string{
    const newData = data.replace(LINK_REGEX, '<a href="$2">$1</a>');
    return newData;
}

function paragrapheParser(data: string):string {
    const paragrapheTab: string[] = data.split("\r\n\r\n");
    let newData:string = "";

    for (let i = 0; i < paragrapheTab.length; i++) {
        paragrapheTab[i] = "<p>\r\n" + paragrapheTab[i] + "\r\n</p>"; // saut de ligne pour ne pas modifier une ligne de possible test
        newData += paragrapheTab[i];
    }

    return newData;
}

function codeParser(data:string):string{
    let step:number = 0;
    const lines:string[] = data.split("\r\n");
    let code:string = "";
    lines.map((line, key) =>{
        if(line.startsWith("\`\`\`")){
            step++;
            if(step === 1){
                code += "<code>";
            }else{
                code += "</code>";
                step = 0;
            }
        }else{
            step === 1 ? code += line + "<br/>" : code += line;      
        }
    }) 

    return code;
}