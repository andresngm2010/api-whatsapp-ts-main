import express, { Router } from "express";
import MassiveCtrl from "../controller/massive.ctrl";
import container from "../ioc";
const router: Router = Router();

/**
 * http://localhost/lead POST
 */
const massiveCtrl: MassiveCtrl = container.get("massive.ctrl");
router.post("/", massiveCtrl.sendCtrl);

export { router };
