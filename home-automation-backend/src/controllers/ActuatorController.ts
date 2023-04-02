import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Actuator } from "../entity/Actuator";
import { Device } from "../entity/Device";

export class ActuatorController {
  static listAll = async (req: Request, res: Response) => {
    const actuatorRepository = getRepository(Actuator);
    const actuators = await actuatorRepository.find({ relations: ["device"] });
    res.send(actuators);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const actuatorRepository = getRepository(Actuator);
    try {
      const actuator = await actuatorRepository.findOneOrFail({
        where: {id},
        relations: ["device"],
      });
      res.send(actuator);
    } catch (error) {
      res.status(404).send("Actuator not found");
    }
  };

  static createActuator = async (req: Request, res: Response) => {
    const { name, type, deviceId } = req.body;
    const actuator = new Actuator();
    actuator.name = name;
    actuator.type = type;

    const deviceRepository = getRepository(Device);
    try {
      const device = await deviceRepository.findOneOrFail(deviceId);
      actuator.device = device;
    } catch (error) {
      res.status(404).send("Device not found");
      return;
    }

    const actuatorRepository = getRepository(Actuator);
    try {
      await actuatorRepository.save(actuator);
    } catch (e) {
      res.status(409).send("Actuator creation failed");
      return;
    }

    res.status(201).send("Actuator created");
  };

  static editActuator = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, topic, type, deviceId } = req.body;

    const actuatorRepository = getRepository(Actuator);
    let actuator;
    try {
      actuator = await actuatorRepository.findOneOrFail({
        where: {id},
        relations: ["device"],
      });
    } catch (error) {
      res.status(404).send("Actuator not found");
      return;
    }

    actuator.name = name;
    actuator.type = type;

    if (deviceId) {
      const deviceRepository = getRepository(Device);
      try {
        const device = await deviceRepository.findOneOrFail(deviceId);
        actuator.device = device;
      } catch (error) {
        res.status(404).send("Device not found");
        return;
      }
    }

    try {
      await actuatorRepository.save(actuator);
    } catch (e) {
      res.status(409).send("Actuator update failed");
      return;
    }

    res.status(204).send("Actuator updated");
  };

  static deleteActuator = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const actuatorRepository = getRepository(Actuator);
    try {
      await actuatorRepository.findOneOrFail({where: {id}});
    } catch (error) {
      res.status(404).send("Actuator not found");
      return;
    }
    actuatorRepository.delete(id);
    res.status(204).send("Actuator deleted");
  };
}
