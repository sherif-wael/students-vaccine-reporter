import StudentCollector from "../src/StudentCollector";
import { expect } from "chai";

describe("Student Collector", () => {
    it("returns the student data in assets/data.xlsx sheet", () => {
        const collector = new StudentCollector();
        collector.getAllStudents()
            .then(students => {
                const allFieldsExist = students.every(s => s.name && s.nationalId && s.email);
                expect(allFieldsExist).to.be.true;
            })
    });
})