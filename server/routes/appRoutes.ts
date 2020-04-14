import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./../routes/BaseRoutes";
import { Index } from "../controllers/index";
import { DashBaordIndex } from "../controllers/dashboardIndex";

export class AppRoutes extends BaseRoute {

    constructor() {
      super();
    }
  
    public static create(router: Router) {
      router.get("/", (req: Request, res: Response, next: NextFunction) => {
        new Index().renderView(req, res, next);
      });
  
      router.get("/map", (req: Request, res: Response, next: NextFunction) => {
        new DashBaordIndex().renderMapView(req, res, next);
      });

      router.post("/add", (req: Request, res: Response, next: NextFunction) => {
        new Index().add(req, res, next);
      });
  
      router.get("/request/test/api-call", (req: Request, res: Response, next: NextFunction) => {
        new DashBaordIndex().testCallAPI(req, res, next);
      });

      router.get("/axios/test/api-call", (req: Request, res: Response, next: NextFunction) => {
        new DashBaordIndex().testCallAPIByAsyncAndAwait(req, res, next);
      });
    }
}