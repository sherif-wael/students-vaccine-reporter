type StudentStatus = "RESOLVED" | "INVALID_NID" | "NETWORK_ERROR";

export interface StudentWithName{
    nationalId: string;
    name: string;
    email: string;
}

export interface StudentWithStatus{
    gender: string;
    birthDate: string;
    status: StudentStatus;
    isRegistered: boolean;
}

export default interface StudentData extends StudentWithName, StudentWithStatus{};