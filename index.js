//import cheerio dari module cheerio
const cheerio = require('cheerio');
//import function readFileSync dan writeFileSync dari module fs
const { writeFileSync, readFileSync } = require("fs");
//import function resolve dari module path
const { resolve } = require('path');

function main() {

  //get list jobs
  let jobs = getJobs()

  for (const job of jobs) {

    //load html dengan function readFileSync 
    const $ = cheerio.load(readFileSync(resolve(job.path)));

    //gunakan append untuk menambah di akhir tag dan gunakan prepend untuk tambahkan di awal tag
    $("body").append(`<img src="http://1x1px.me/FF4D00-0.8.png?trackId=${job.trackId}"/>`);
    // $("body").prepend(`<img src="http://1x1px.me/FF4D00-0.8.png?trackId=${job.trackId}"/>`);

    //save html yang telah dirubah
    writeFileSync(resolve(`outputHtml/${job.jobId}.html`), $.html());
  }
}
function getJobs() {
  return [
    { jobId: 1, path: "inputHtml/index1.htm", trackId: "123456" },
    { jobId: 2, path: "inputHtml/index1.htm", trackId: "123457" },
    { jobId: 3, path: "inputHtml/index1.htm", trackId: "123458" },
  ];
}

main();