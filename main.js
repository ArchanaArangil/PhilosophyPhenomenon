const cheerio = require('cheerio');
const request = require('request');

let link = '/wiki/Special:Random';
let title = "";
let fillLink = "";
let myTitle = "";
let newLink ="";
let arr = [];
let bigArr = [];
console.log("start");

async function start() {
    // Call getLink for the url. Get the title & newLink
    for(var i = 0; i < 25; i++){
        await getLink(link);
        let size = 0;
        while(title != "Philosophy - Wikipedia"){
            size += 1;
            link = newLink;
            newLink = "";
            if(arr.includes(title) || title == "error"){
                arr = [];
                break;
            }
            arr.push(title);
            title = "";
            await getLink(link);
           
        }
        bigArr.push(arr);
        console.log("Link checked: " + i);
        arr = [];
        link = '/wiki/Special:Random';
    }
    let bigSize = 0;
    let bigInd = 0;
    for(var i = 0; i < bigArr.length; i++){
        if(bigArr[i].length > bigSize){
            bigSize = bigArr[i].length;
            bigInd = i;
        }
    }
    console.log("Biggest path: ");
    console.log(bigArr[bigInd]);
}

async function getLink(fillLink){
    return fetch('https://en.wikipedia.org'+fillLink)
        .then((response) => {
            return response.text(); 
        })
        .then((text) => {
            const $ = cheerio.load(text);
            newLink = $('p a').attr('href');
            title = $('title').html();
        })
        .catch(function() {
            title = "error";
        });
}

start();