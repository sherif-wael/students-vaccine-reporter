import { expect } from "chai";
import CovacAPI from "../src/CovacAPI";

describe("CovacAPI", () => {
    it("returns valid student with status object", async () => {
        const api = new CovacAPI();
        const student = await api.getStudentFromCovac("29906173100076");
        console.log(student);
        expect(student.isRegistered).to.be.true;
    })
})