import { Router, Request, Response, NextFunction } from 'express';

class ituneRouter {
    public router: Router;
    public constructor() {
      this.router = Router();
      this.init();
    }
    private init() {
      this.router.get(
        '/search',
        async (req: Request,res: Response,next: NextFunction) => {
          try {
            res.status(200).send(req.query);
          } catch (err) {
            res.status(500).send(err.message);
          }
        });
  }
}

export default new ituneRouter().router;
  