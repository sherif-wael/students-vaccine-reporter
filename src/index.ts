import StudentCollector from "./StudentCollector";
import JsonStudentsPrinter, { Printer, PrinterData } from "./Printer";
import StudentAnalyzer from "./StudentAnalyzer"
import { join } from "path";

class RegisterReporter{
    private collector: StudentCollector;
    private printer: Printer;

    constructor(collector: StudentCollector, printer: Printer){
        this.collector = collector;
        this.printer = printer;
    }

    public async generate(): Promise<void>{
        const studets = await this.collector.getAllStudents();
        const analyzer = new StudentAnalyzer(studets);
        const data: PrinterData = {
            totalStudentsCount: analyzer.getTotalCount(),
            totalInvalidNationalIdCound: analyzer.getTotalInvalidNationalIdCount(),
            totalNetworkErrors: analyzer.getTotalNetworkErrors(),
            totalNonRegisteredCount: analyzer.getTotalNonRegisteredCount(),
            totalRegisteredCount: analyzer.getTotalRegisteredCount(),
            students: analyzer.getStudents()
        }
        await this.printer.print(data);
    }

    public static create(): RegisterReporter{
        const collector = new StudentCollector();
        const filePath = join(process.cwd(), "assets", "data.json");
        const printer = new JsonStudentsPrinter(filePath);
        return new RegisterReporter(collector, printer);
    }
}

const reporter = RegisterReporter.create();

reporter.generate().then(() => console.log("Report Generated"));