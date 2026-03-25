export interface Member{
    ID:string,
    NAME:string,
    EMAIL:string,
    CREATE_DT:string,
    UPDT_DT:string,
}

export function toMember(row: Member){
return {
    id: row.ID,
    name: row.NAME,
    email:row.EMAIL,
    createDt: row.CREATE_DT,
    updateDt: row.UPDT_DT
}
}