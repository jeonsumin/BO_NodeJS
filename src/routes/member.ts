import { Router } from "express";
import { memberController } from "../controller/memberController";

const router = Router();

router.get("/",memberController.select);
router.get("/:id", memberController.selectById);

router.post("/", memberController.insert);
router.put("/:id",memberController.update);
router.delete("/:id",memberController.delete);

export default router;