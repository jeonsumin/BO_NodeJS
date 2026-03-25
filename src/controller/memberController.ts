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

    public select(params:any) {
        
    } 

    public selectById(id: string){

    }

    public insert(params:any){

    }

    public update(params:any){

    }

    public delete(id: string){}
}

export const memberController = MemberController.getinstance();