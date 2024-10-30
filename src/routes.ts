import { Router, Request, Response, NextFunction  } from "express";

const router = Router();

router.get("/status", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: "OK" });
  } catch (error) {
    next(error);
  }
});

export { router }