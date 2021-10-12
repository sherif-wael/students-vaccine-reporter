import { expect } from "chai";
import Sheet from "../src/Sheet";
import { join } from "path";

describe("Sheet Object", () => {
    it("Reads sheet rows", () => {
        const filePath = join(process.cwd(), "assets", "data.xlsx");
        const sheet = new Sheet(filePath, "ثالثة 19-20");
        expect(sheet.getAllRows().length).to.be.greaterThan(1);
    });
});