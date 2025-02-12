import child from "child_process";

console.log("First compilation");

child.execSync("npx tsc");

setTimeout(() => {
    import("./dist/src/bot.js");
}, 4000);