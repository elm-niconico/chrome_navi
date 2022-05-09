import {browser} from "webextension-polyfill-ts";
const sleep = (time: number)=>new Promise<void>((resolve) => setTimeout(()=>resolve(), time))
browser.runtime.onMessage.addListener(async ({tabId, x, y}:{
    tabId: number,
    x: number,
    y: number
})=>{

    await sleep(1000)

    await browser.tabs.sendMessage(tabId, {x,y})
})
