import Sheet from "./Sheet";
import { join } from "path";
import { Row } from "./Sheet";
import CovacAPI from "./CovacAPI";
import StudentData, { StudentWithName, StudentWithStatus} from "./StudentData";

class StudentCollector{
    private covacAPI: CovacAPI;

    constructor(){
        this.covacAPI = new CovacAPI();
    }

    public async getAllStudents(): Promise<StudentData[]>{
        const students = this.getStudentsFromSheet();
        const studentsWithStatus = [];

        for(let student of students){
            const status = await this.getStudentFromCovac(student.nationalId);
            studentsWithStatus.push({...student, ...status});
        }

        return studentsWithStatus;
    }

    private async getStudentFromCovac(nationalId: string): Promise<StudentWithStatus>{
        return await this.covacAPI.getStudentFromCovac(nationalId);
    }

    private getStudentsFromSheet(): StudentWithName[]{
        const sheet = this.createSheet();
        const rows = sheet.getAllRows();
        return rows.filter(this.filterRow).map(this.mapRowToStudent);
    }

    private createSheet(){
        const filePath = join(process.cwd(), "assets", "data.xlsx");
        return new Sheet(filePath, "ثالثة 19-20");
    }

    private filterRow(row: Row){
        if(!row["C"] || Number.isNaN(Number(row["C"]))) return false;
        return true; 
    }

    private mapRowToStudent(row: Row): StudentWithName{
        return {
            name: row["B"].split("").reverse().join(),
            nationalId: row["C"],
            email: row["D"] || "placeholer"
        }
    }
}

export default StudentCollector;