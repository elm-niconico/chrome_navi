import {ChromeNaviStorage} from "./ChromeNaviStorage";

export interface INaviStorage {
    save(navi: Navi): Promise<void>
    getByUrlOrEmpty(url: string): Promise<Navi[]>
    getAllNavisOrEmpty(): Promise<Navi[]>
    delete(navi: Navi): Promise<void>
}
export const factNaviStorage = (naviType: "Chrome"): INaviStorage => {
    switch (naviType) {
        case "Chrome":
            return new ChromeNaviStorage()
    }
}

export interface Navi{
    uri: string,
    label: string,
    x: number,
    y: number
}
