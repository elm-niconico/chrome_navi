import {INaviStorage, Navi} from "./INaviStorage";
import {browser} from "webextension-polyfill-ts";

import {eliminateDuplicate} from "../arrayHelper";

export class ChromeNaviStorage implements INaviStorage{
    delete(navi: Navi): Promise<void> {
        return Promise.resolve(undefined);
    }

    async getByUrlOrEmpty(url: string): Promise<Navi[]> {
        return (await this.getAllNavisOrEmpty())
            .filter(n => n.uri == url);
    }

    async getAllNavisOrEmpty(): Promise<Navi[]> {
        return  (await browser.storage.sync.get("navi"))?.["navi"] as Navi[] || [];
    }

    async save(navi: Navi): Promise<void> {
        const saveNavis = [...await this.getByUrlOrEmpty(navi.uri), navi]
        await browser.storage.sync.set({["navi"] : eliminateDuplicate(saveNavis)});
    }



}
