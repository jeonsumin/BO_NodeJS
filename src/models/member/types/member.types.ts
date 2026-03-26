import {RowDataPacket} from "mysql2";

export interface MemberRow extends RowDataPacket {
    IDX: number,
    USER_CODE: string,
    NICK_NAME: string,
    PHONE_NUM: string,
    REG_DATE: string,
    UPDATE_DATE: string,
}

export interface Member {
    id: number;
    name: string;
    phoneNum: string;
    createDt: string;
    updateDt: string;
}

export function toMember(row: MemberRow) {
    return {
        id: row.IDX,
        userCode: row.USER_CODE,
        name: row.NICK_NAME,
        phoneNum: row.PHONE_NUM,
        createDt: row.REG_DATE,
        updateDt: row.UPDATE_DATE
    }
}