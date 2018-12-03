const puppeteer = require('puppeteer')
// const wget = require('node-wget')
const { mkdirsSync, fsReadFile } = require('../utils/fileUtil')
const pth = require('path')
const fs = require('fs')

let browser = null
let page = null
;(async () => {
  browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    devtools: true,
    ignoreDefaultArgs: ['--mute-audio']
  })
  await initPage()
  // await page.setViewport({ width: 1280, height: 720 })
  await page.setViewport({ width: 1280, height: 720 })
  // page.on('request', request => {
  //   // console.log("Intercept " + request.resourceType + " " + request.url);
  //   let currentUrl = request._url
  //   if (
  //     request._resourceType === 'image' &&
  //     currentUrl.includes('i0.hdslb.com') &&
  //     currentUrl.includes('bfs/')
  //   ) {
  //     console.log('GeetestImageUrl=' + request._url)
  //     wget(
  //       {
  //         url: request._url,
  //         dest: 'public/images/img/'
  //       },
  //       (error, response, body) => {
  //         if (error) {
  //           console.log('--- error:')
  //           console.log(currentUrl) // error encountered
  //         } else {
  //           console.log('--- success:')
  //           console.log(currentUrl) // response headers
  //           // console.log('--- body:')
  //           // console.log(body) // content of package
  //         }
  //       }
  //     )
  //   }
  // })
})()

// 默认只有一个页面
initPage = async () => {
  pages = await browser.pages()
  if (pages.length) {
    page = pages[0]
  } else {
    page = await browser.newPage()
  }
}

test = async url => {
  const self = this
  await page.goto(url, { referer: url, waitUntil: 'domcontentloaded' })
  const js =
    "var res=[];try{var scriptList = document.querySelectorAll('script');for(script of scriptList){if(script.innerHTML.includes('window[')){var temp = script.innerHTML;break}};var info=eval(temp.substring(temp.indexOf('(')));info=info.substring(info.indexOf('{'),info.lastIndexOf('}')+1);info=JSON.parse(info);var path=pVars.manga.filePath;for(var i=0;i<info.files.length;i++){var url=path+info.files[i]+'?cid='+info.cid;for(t in info.sl){url+='&'+t+'='+info.sl[t]}res.push(url)}}catch(error){res=null;}"
  const result = await page.evaluate(js => {
    eval(js)
    return res
  }, js)
  return result
}

screenshot = async url => {
  await page.goto(url)
  // jpeg | png
  const type = 'jpeg'
  path = pth.join('download/screenshot/', Math.random() * 1000 + '.' + type)
  mkdirsSync(pth.dirname(path))

  await page.screenshot({ path, quality: 50, fullPage: true, type })
  return fsReadFile(path)
}

async function close() {
  if (browser === null) await browser.close()
}

module.exports = { screenshot, close, test }
