import {browser} from "webextension-polyfill-ts";
import {factNaviStorage, Navi} from "../storage/INaviStorage";






export const tryCreateNavisDom = async (document: Document) => {
    const navis =  await factNaviStorage("Chrome").getByUrlOrEmpty(window.location.href);
    navis
        .forEach(n => {
            const dom = createMemoDom(document, n.x, n.y, n.label)
            document.body.appendChild(dom)
        })
}
const toMemoInfo = (label: string, x: number, y: number)=> ({

        uri: location.href,
        label,
        x,
        y
    })
export const createMemoDom = (document: Document, x: number, y:number, defaultLabel: string = "")=>{

    const memo = <HTMLInputElement>document.createElement("input");
    memo.type = "text"

    memo.placeholder = "名前を入力してください"
    memo.id = "chrome-navi-memo"
    memo.style.position = "absolute"
    memo.style.left = `${x}px`
    memo.style.top =`${y}px`
    memo.defaultValue = defaultLabel
    memo.onkeydown = async (button)=>{
        if(!(button.key == "Enter"))return;

        await factNaviStorage("Chrome").save(toMemoInfo(memo.value, x, y))

        memo?.blur()
    }

    return memo
}

export const recreateMemoDomIfRegister = (document: Document, memo: Navi|null) =>{

    if(memo && location.href == memo.uri)
    {
        const memoDom = createMemoDom(document, memo.x, memo.y)
        memoDom.defaultValue = memo.label
        document.body.appendChild(memoDom)

        return memoDom
    }else{
        return null
    }
}

