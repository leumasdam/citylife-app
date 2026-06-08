const puppeteer=require('puppeteer');
(async()=>{const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});
const p=await b.newPage();await p.setViewport({width:1600,height:1300,deviceScaleFactor:2});
await p.goto('http://localhost:5178/',{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,3500));
for(const t of ['Location','Onboarding · 02','Wallet']){
 const idx=await p.evaluate((t)=>[...document.querySelectorAll('.gallery-item')].findIndex(it=>it.querySelector('.cap .t')?.textContent===t),t);
 if(idx<0){console.log('skip',t);continue;}
 const el=(await p.$$('.gallery-item .phone'))[idx];await el.screenshot({path:`C:/Users/samue/Downloads/V_${t.replace(/[^a-z0-9]/gi,'')}.png`});}
console.log('ok');await b.close();})();
