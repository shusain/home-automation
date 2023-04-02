import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Sensor } from "../entity/Sensor";
import { Device } from "../entity/Device";

export class SensorController {
  static listAll = async (req: Request, res: Response) => {
    const sensorRepository = getRepository(Sensor);
    const sensors = await sensorRepository.find({ relations: ["device"] });
    res.send(sensors);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const sensorRepository = getRepository(Sensor);
    try {
      const sensor = await sensorRepository.findOneOrFail({
        where: {id},
        relations: ["device"],
      });
      res.send(sensor);
    } catch (error) {
      res.status(404).send("Sensor not found");
    }
  };

  static createSensor = async (req: Request, res: Response) => {
    const { name, deviceId, type } = req.body;
    const sensor = new Sensor();
    sensor.name = name;
    sensor.type = type;
    sensor.lastValue = 0;

    const deviceRepository = getRepository(Device);
    try {
      const device = await deviceRepository.findOneOrFail({where:{id:deviceId}});
      sensor.device = device;
    } catch (error) {
      res.status(404).send("Device not found");
      return;
    }

    const sensorRepository = getRepository(Sensor);
    try {
      await sensorRepository.save(sensor);
    } catch (e) {
      res.status(409).send("Sensor creation failed");
      return;
    }

    res.status(201).send("Sensor created");
  };

  static editSensor = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, deviceId } = req.body;

    const sensorRepository = getRepository(Sensor);
    let sensor;
    try {
      sensor = await sensorRepository.findOneOrFail({
        where: {id},
        relations: ["device"],
      });
    } catch (error) {
      res.status(404).send("Sensor not found");
      return;
    }

    sensor.name = name;

    if (deviceId) {
      const deviceRepository = getRepository(Device);
      try {
        const device = await deviceRepository.findOneOrFail({where: {id: deviceId}});
        sensor.device = device;
      } catch (error) {
        res.status(404).send("Device not found");
        return;
      }
    }

    try {
      await sensorRepository.save(sensor);
    } catch (e) {
      res.status(409).send("Sensor update failed");
      return;
    }

    res.status(204).send("Sensor updated");
  };

  static deleteSensor = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const sensorRepository = getRepository(Sensor);
    try {
      await sensorRepository.findOneOrFail({where:{id}});
    } catch (error) {
      res.status(404).send("Sensor not found");
      return;
    }
    sensorRepository.delete(id);
    res.status(204).send("Sensor deleted");
  };
}
