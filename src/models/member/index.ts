import pool from "../../db/databases";
import { Member, toMember } from "./types/member.types";

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
        const rows = await pool.execute<Member>(query);

        const data = rows.map(r=> ({...toMember(r)}))
        return data
    }


    public async selectById(id:string){
    }

    
}