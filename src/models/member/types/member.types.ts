import { RowDataPacket } from "mysql2";

export interface MemberRow extends RowDataPacket{
    ID:number,
    NAME:string,
    EMAIL:string,
    CREATE_DT:string,
    UPDT_DT:string,
}

export interface Member{
    id:number;
    name: string;
    email: string;
    createDt: string;
    updateDt: string;
}

export function toMember(row: MemberRow){
return {
    id: row.ID,
    name: row.NAME,
    email:row.EMAIL,
    createDt: row.CREATE_DT,
    updateDt: row.UPDT_DT
}
}