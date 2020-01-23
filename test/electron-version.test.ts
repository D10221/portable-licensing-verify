import { versionNo, electronVersion } from "./electron-version"

describe("electron-version", ()=>{
    it("works", ()=>{
        expect(versionNo(electronVersion())).toBe(7)
    })
})