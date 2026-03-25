import { ResultSetHeader } from "mysql2";
import pool from "../../db/databases";
import { Member, MemberRow, toMember } from "./types/member.types";

class MemberModels{
    private static instance:MemberModels;

    constructor(){

    }

    static getInstance():MemberModels{
        if(!MemberModels.instance){
            MemberModels.instance = new MemberModels;
        }
        return MemberModels.instance;
    }

    public async select(){
        const query = "SELCT * FROM TEST";
        const [rows] = await pool.execute<MemberRow[]>(query);

        const data = rows.map(async r=> ({...toMember(r)}))
        return data
    }


    public async selectById(id:number){
        const query =`SELECT * FROM TEST WHERE ID = ?`;
        const [rows] = await pool.execute<MemberRow[]>(query,[id]);
        const row = rows[0];
        if(!row) return null;
        return {...toMember(row)}
    }

    public async insert(param:Member){
        const query = 'INSERT INTO TEST (NAME, EMAIL, CREATE_DT) VALUES (?, ?, NOW() )';
        const [result] = await pool.execute<ResultSetHeader>(query, [param.name, param.email]);

        return this.selectById(result.insertId)
    }
    
    public async update(id:number, param:Member){
        const query = "UPDATE TEST SET NAME = ?, EMAIL = ? , UPDT_DT = NOW() WHERE ID = ?";
        await pool.execute(query, [param.name, param.email, id]);

        return this.selectById(id);
    }

    public async delete(id:number) {
        await pool.execute("DELETE FROM TEST WHERE ID = ?", [id]);   
    }

    
}

export const memberModels = MemberModels.getInstance();