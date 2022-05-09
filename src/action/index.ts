
import {browser, Tabs} from "webextension-polyfill-ts";
import {factNaviStorage} from "../storage/INaviStorage";

(async ()=>{

    const navis = await factNaviStorage("Chrome").getAllNavisOrEmpty()


    navis.forEach((navi)=>{
        const naviLabel = <HTMLLabelElement>document.createElement("label")
        naviLabel.title = navi.label
        naviLabel.className = "label"
        naviLabel.onclick = async ()=>{
            const tab = await browser.tabs.create({url: navi.uri})

            if(tab.id) {
                await browser.runtime.sendMessage({tabId: tab.id, x: navi.x, y: navi.y})
            }
        }
        naviLabel.textContent = navi.label

        const naviList = <HTMLUListElement>document.getElementsByClassName("navi-list")[0];
        naviList.appendChild(naviLabel)
    })
})()
