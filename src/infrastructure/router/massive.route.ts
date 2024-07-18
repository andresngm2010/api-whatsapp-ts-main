import express, { Router } from "express";
import MassiveCtrl from "../controller/massive.ctrl";
import container from "../ioc";
const router: Router = Router();

/**
 * http://localhost/massive GET
 */
const massiveCtrl: MassiveCtrl = container.get("massive.ctrl");
router.get("/", massiveCtrl.sendCtrl);

export { router };
