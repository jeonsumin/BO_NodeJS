import {ResultSetHeader} from "mysql2";
import pool from "../../db/databases";
import {Member, MemberRow, toMember} from "./types/member.types";
import {errorHandler} from "../../middleware/errorHandler";

class MemberModels {
    private static instance: MemberModels;

    constructor() {

    }

    static getInstance(): MemberModels {
        if (!MemberModels.instance) {
            MemberModels.instance = new MemberModels;
        }
        return MemberModels.instance;
    }

    public async select() {
        const query = "SELECT * FROM USER";
        const [rows] = await pool.execute<MemberRow[]>(query);

        return rows.map(r => ({...toMember(r)}))
    }


    public async selectById(id: number) {
        const query = 'SELECT * FROM USER WHERE IDX = ?';
        const [rows] = await pool.execute<MemberRow[]>(query, [id]);

        const row = rows[0];
        if (!row) return null;
        return {...toMember(row)}
    }

    public async insert(param: Member) {
        const UUID = crypto.randomUUID();
        const query = 'INSERT INTO USER (USER_CODE , NICK_NAME, PHONE_NUM, REG_DATE) VALUES (?, ?, ?, NOW() )';
        const [result] = await pool.execute<ResultSetHeader>(query, [UUID, param.name, param.phoneNum]);

        return this.selectById(result.insertId)
    }

    public async update(id: number, param: Member) {
        const query = "UPDATE USER SET NICK_NAME = ?, PHONE_NUM = ? , UPDATE_DATE = NOW() WHERE IDX = ?";
        await pool.execute(query, [param.name, param.phoneNum, id]);

        return this.selectById(id);
    }

    public async delete(id: number) {
        await pool.execute("DELETE FROM USER WHERE IDX = ?", [id]);
    }


}

export const memberModels = MemberModels.getInstance();