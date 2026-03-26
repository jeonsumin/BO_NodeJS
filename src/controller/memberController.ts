import { Request, Response, NextFunction } from 'express';
import { memberModels } from '../models/member';
import { errorResponse, success } from '../utils/response';

class MemberController {
    private static instance: MemberController
    constructor(){

    }

    static getinstance (): MemberController {
        if(!MemberController.instance){
            MemberController.instance = new MemberController;
        }
        return MemberController.instance;
    }

    async select(req:Request, res:Response, next: NextFunction) {
        try{
            const list = await memberModels.select();
            if(!list) return res.status(404).json(errorResponse("NOT_FOUND", "데이터를 찾을 수 없습니다."));
            res.json(success(list));
        }catch(e){
            next(e);
        }
    } 

    async selectById(req:Request, res:Response, next: NextFunction) {
        try{
            const id =  Number(req.params.id);
             const entity = await memberModels.selectById(id);
            if(!entity) return res.status(404).json(errorResponse("NOT_FOUND", "회원을 찾을 수 없습니다."));
            res.json(success(entity));
        }catch(e){
            next(e);
        }
    }

    public insert(req:Request, res:Response, next: NextFunction) {
        try{
            const { name, email} = req.body;
            if(!name) return res.status(400).json(errorResponse("VALIDATION_ERROR", "이름은 필수입니다."));
            const insert = memberModels.insert(req.body);
            res.status(201).json(success(insert));
        }catch(e){
            next(e);
        }
    }

    public update(req:Request, res:Response, next: NextFunction) {
        try{
            const id = Number(req.params.id);
            const existing = memberModels.selectById(id);
            if (!existing) return res.status(404).json(errorResponse("NOT_FOUND", "회원을 찾을 수 없습니다."));
            const update = memberModels.update(id, req.body);
            res.json(success(update));
        }catch(e){
            next(e);
        }
    }

    public delete(req:Request, res:Response, next: NextFunction) {
        try{
            const id = Number(req.params.id);
            const existing = memberModels.selectById(id);
            if (!existing) return res.status(404).json(errorResponse("NOT_FOUND", "회원을 찾을 수 없습니다."));
            memberModels.delete(id);
            res.status(204).send();
        }catch(e){
            next(e);
        }
    }

}

export const memberController = MemberController.getinstance();