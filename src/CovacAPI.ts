import axios from "axios";
import { StudentWithStatus } from "./StudentData";

interface DataField{
    birthDate: string;
    checkSum: null | string;
    gender: string;
}


interface ErrorField{
    errors: string[];
    errorCode: string;
}

interface ResponseData{
    data: DataField;
    error: ErrorField;
    isSuccessful: boolean;
}



class CovacAPI{
    public async getStudentFromCovac(nationalId: string): Promise<StudentWithStatus>{
        try{
            const res = await axios.get<ResponseData>(this.createCovacUrl(nationalId));
            return this.createResolvedStatus(res.data.data, false);
        }catch(err){
            return this.handleAxiosError(err);
        }
    }

    private handleAxiosError(err): StudentWithStatus{
        if(err.response){
            if(err.response.data.error.errors.includes("Invalid_NID")){
                return this.createInvalidNationalIdStatus();
            }
            return this.createResolvedStatus(err.response.data.data, true);
        }else if(err.request){
            return this.createNetworkErrorStatus();
        }
    }

    private createNetworkErrorStatus(): StudentWithStatus{
        return {
            birthDate: "",
            gender: "",
            status: "NETWORK_ERROR",
            isRegistered: false
        }
    }

    private createInvalidNationalIdStatus(): StudentWithStatus{
        return {
            birthDate: "",
            gender: "",
            status: "INVALID_NID",
            isRegistered: false
        }
    }

    private createResolvedStatus(data: DataField, isRegistered: boolean): StudentWithStatus{
        return {
            birthDate: data.birthDate,
            gender: data.gender,
            status: "RESOLVED",
            isRegistered
        }
    }

    private createCovacUrl(nationalId: string): string{
        return `https://egcovac.mohp.gov.eg/regapi/Registration/CheckNID?nid=${nationalId}&isNID=true&requestID=0&nationalityID=74`;
    }
}

export default CovacAPI;