import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "../routes/baseRoutes";
import DashBoardItemList from "../model/dashboard_model";
import * as template from "../../common/template";
import * as Iresponse from "../../common/types/Iresponse";

export class DashBaordIndex extends BaseRoute {

    constructor() {
        super();
    }

    public renderMapView(req: Request, res: Response, next: NextFunction) {
        
        let listArr = (new DashBoardItemList()).getList();
        let resultMap = (new DashBoardItemList()).getDataListMap();
        // let listHTML: string = template.getDashBoardItemTemplate(listArr);
        let resultHtmlMap = template.getDashBoardItemTemplate2(resultMap);
        let options: Object = {
            "resultHtmlMap": resultHtmlMap
        };

        this.render(req, res, "map2.html", options);
    }

    public testCallAPI(req: Request, res: Response, next: NextFunction) {    
        (new DashBoardItemList()).getSampleAPICallResult(function(err, result) {
            res.send(result);
        });
    }

    public testCallAPIByAsyncAndAwait(req: Request, res: Response, next: NextFunction) {    
        (new DashBoardItemList()).getSampleAPICallResultByAsyncAwait(function(err, result) {
            res.send(result);
        });
    }
}