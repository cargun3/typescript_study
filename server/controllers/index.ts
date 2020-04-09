import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "../routes/baseRoutes";
import ItemList from "../model/list_model";
import * as template from "../../common/template";
import * as Iresponse from "../../common/types/Iresponse";

export class Index extends BaseRoute {

    constructor() {
        super();
    }

    public renderView(req: Request, res: Response, next: NextFunction) {
        let title = "Happy 북마크";
        
        let listArr = (new ItemList()).getList();

        let listHTML: string = template.getItemTemplate(listArr);

        let options: Object = {
            "title": title,
            "listHTML": listHTML
        };

        this.render(req, res, "index.html", options);
    }

    
    public add(req: Request, res: Response, next: NextFunction) {    
        // 클라이언트에 받은 북마크 정보
        let item = req.body.item; 

        // 공통 API에서 가져온 인터페이스 타입(Iresponse.IresponseItem)을 추가함
        let reponse:Iresponse.IresponseItem={success:true, item:item};    
        res.send(reponse);
    }
}