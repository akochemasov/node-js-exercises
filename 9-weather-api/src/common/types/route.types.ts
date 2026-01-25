import { type Request, type Response, type NextFunction, type Router } from "express";

export interface RouteConfig {
    path: string;
    func: (req: Request, res: Response, next: NextFunction) => void;
    method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
}
