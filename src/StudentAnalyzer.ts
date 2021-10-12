import StudentData from "./StudentData";

class StudentAnalyzer{
    private students: StudentData[];

    constructor(students: StudentData[]){
        this.students = students;
    }

    public getTotalCount(): number{
        return this.students.length;
    }

    public getTotalRegisteredCount(): number{
        return this.students.reduce((acc, s) => s.isRegistered ? acc + 1 : acc, 0);
    }

    public getTotalNonRegisteredCount(): number{
        return this.students.reduce((acc, s) => !s.isRegistered ? acc + 1 : acc, 0);
    }

    public getTotalNetworkErrors(): number{
        return this.students.reduce((acc, s) => s.status === "NETWORK_ERROR" ? acc + 1 : acc, 0);
    }

    public getTotalInvalidNationalIdCount(): number{
        return this.students.reduce((acc, s) => s.status === "INVALID_NID" ? acc + 1 : acc, 0);        
    }

    public getStudents(){
        return this.students;
    }
}

export default StudentAnalyzer;