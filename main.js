#!/user/bin/env node
import { differenceInSeconds } from 'date-fns';
import inquirer from 'inquirer';
const res = await inquirer.prompt({
    type: "input",
    name: "userInput",
    message: "Please enter the  amount of second",
    validate: (input) => {
        if (isNaN(input)) {
            return "please enter valid number";
        }
        else if (input > 60) {
            return "second must be in 60";
        }
        else {
            return true;
        }
    }
});
let input = res.userInput;
function startTime(val) {
    // new Date().setSecond hamare pass second ko set kare gha. jo current second he us me user ki value add ho jaye.or jo ap ki second he wo aye our is me add kar do, para meter ki value.
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    // setInterval ka matlab ye he ke her second k bad ye refresh hota rahe gha.
    setInterval(() => {
        const currentTime = new Date();
        // time difference karna he. differenceInSeconds intervalTime or currentTime dena he
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log("Time has expired");
            process.exit();
        }
        // timeDiff % ka modules kisse 3600 to * 24 divided by 3600
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        // timeDiff ka modules ko karte he 60 se
        const sec = Math.floor(timeDiff % 60);
        // .toString() minut ko string me convert kar de gha es ke bad string ka number he padStart(2, "0") is me hum maximum length  batate he or is me hum amt space "0" se fill karenge. minut ko string me convert kardiya or string k under he hum ne string mathode padStart ka use kiya yani k ap is ko 2 number me convert kar de ya ek digit ho to us me ek extra "0" add kar de.
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
;
startTime(input);
