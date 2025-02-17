import { ContainerBuilder } from "node-dependency-injection";
import { LeadCreate } from "../application/lead.create";
import LeadCtrl from "./controller/lead.ctrl";

import { MassiveCreate } from "../application/massive.create";
import MassiveCtrl from "./controller/massive.ctrl";


import MetaRepository from "./repositories/meta.repository";
import MockRepository from "./repositories/mock.repository";
import TwilioService from "./repositories/twilio.repository";
import WsTransporter from "./repositories/ws.external";
import { VenomTransporter } from "./repositories/venom.repository";

const container = new ContainerBuilder();

/**
 * Inicamos servicio de WS / Bot / Twilio
 */
container.register("ws.transporter", VenomTransporter);
const wsTransporter = container.get("ws.transporter");

container.register("db.repository", MockRepository);
const dbRepository = container.get("db.repository");

container
  .register("massive.creator", MassiveCreate)
  .addArgument([dbRepository, wsTransporter]);

container
  .register("lead.creator")
  .addArgument([dbRepository, wsTransporter]);

const massiveCreator = container.get("massive.creator");
const leadCreator = container.get("lead.creator");

container.register("massive.ctrl", MassiveCtrl).addArgument(massiveCreator);
container.register("lead.ctrl", LeadCtrl).addArgument(leadCreator);

export default container;
