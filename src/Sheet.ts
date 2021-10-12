import excelToJson from "convert-excel-to-json";

interface File{
    [index: string]: Row[];
}

export interface Row{
    [index: string]: string;
}

class Sheet{
    private filePath: string;
    private sheetName: string;

    constructor(filePath: string, sheetName: string){
        this.filePath = filePath;
        this.sheetName = sheetName;
    }

    public getAllRows(): Row[]{
        try{
            return this.readRows();
        }catch(err){
            console.log(`Sheet: ${err}`);
        }
    }

    private readRows(): Row[]{
        const file = this.readFile();
        const sheet = this.readSheet(file);
        return sheet;
    }

    private readFile(): File{
        return excelToJson({sourceFile: this.filePath});
    }

    private readSheet(file: File): Row[]{
        const sheet: Row[] = file[this.sheetName];
        if(!sheet){
            throw new Error(`Invalid Sheet Name ${this.sheetName}`);
        }
        return sheet;
    }
}

export default Sheet;