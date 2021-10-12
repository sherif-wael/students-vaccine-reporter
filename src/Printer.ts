import StudentData from "./StudentData";
import fs from "fs/promises";

export interface PrinterData{
    totalStudentsCount: number;
    totalRegisteredCount: number;
    totalNonRegisteredCount: number;
    totalNetworkErrors: number;
    totalInvalidNationalIdCound: number;
    students: StudentData[];
}

export interface Printer{
    print(data: PrinterData): Promise<void>;
}

class JsonStudentsPrinter{
    private filePath: string;

    constructor(filePath: string){
        this.filePath = filePath;
    }

    public async print(data: PrinterData): Promise<void>{
        await this.writeFile(data);
        console.log(`File at ${this.filePath} is created...`);
    }

    private async writeFile(data: PrinterData): Promise<void>{
        await fs.writeFile(this.filePath, this.convertToJson(data));
    }

    private convertToJson(data: any){
        return JSON.stringify(data);
    }
}

export default JsonStudentsPrinter;