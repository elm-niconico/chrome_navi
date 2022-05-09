import {Observable} from "rx";
import { browser } from 'webextension-polyfill-ts'
import {createMemoDom, tryCreateNavisDom} from "./navi";

(async ()=>{


    browser.runtime.onMessage.addListener(({x,y}:{x:number, y:number}, sender) => {
        window.scrollTo(x,y)
    })


    await tryCreateNavisDom(document)


    const click = Observable
        .fromEvent<MouseEvent>(document, "click")

    Observable
        .fromEvent<KeyboardEvent>(document,"keydown")
        .where(ev => ev.shiftKey)
        .switchMap(_ => click.takeUntil(Observable.fromEvent<KeyboardEvent>(document,"keyup")))
        .subscribe((event: any)=>{
            //なぜかObservable<Observable<MouseEvent>>と解釈されるため、anyからキャスト
            const e = event as PointerEvent

            const memo = createMemoDom(document, e.pageX, e.pageY)
            document.body.appendChild(memo)
            memo.focus()
        })

})()
