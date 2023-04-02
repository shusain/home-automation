import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Device } from "../entity/Device";
import { Location } from "../entity/Location";

export class DeviceController {
  static listAll = async (req: Request, res: Response) => {
    const deviceRepository = getRepository(Device);
    const devices = await deviceRepository.find({ relations: ["location"] });
    res.send(devices);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const deviceRepository = getRepository(Device);
    try {
      const device = await deviceRepository.findOneOrFail({
        where: {id},
        relations: ["location", "sensors"]
      });
      res.send(device);
    } catch (error) {
      res.status(404).send("Device not found");
    }
  };

  static createDevice = async (req: Request, res: Response) => {
    const { name, locationId } = req.body;
    const device = new Device();
    device.name = name;

    const locationRepository = getRepository(Location);
    try {
      const location = await locationRepository.findOneOrFail({where:{id:locationId}});
      device.location = location;
    } catch (error) {
      res.status(404).send("Location not found");
      return;
    }

    const deviceRepository = getRepository(Device);
    try {
      await deviceRepository.save(device);
    } catch (e) {
      res.status(409).send("Device creation failed");
      return;
    }

    res.status(201).send("Device created");
  };

  static editDevice = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, locationId } = req.body;

    const deviceRepository = getRepository(Device);
    let device;
    try {
      device = await deviceRepository.findOneOrFail({
        where: {id},
        relations: ["location"],
      });
    } catch (error) {
      res.status(404).send("Device not found");
      return;
    }

    device.name = name;

    if (locationId) {
      const locationRepository = getRepository(Location);
      try {
        const location = await locationRepository.findOneOrFail(locationId);
        device.location = location;
      } catch (error) {
        res.status(404).send("Location not found");
        return;
      }
    }

    try {
      await deviceRepository.save(device);
    } catch (e) {
      res.status(409).send("Device update failed");
      return;
    }

    res.status(204).send("Device updated");
  };

  static deleteDevice = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const deviceRepository = getRepository(Device);
    try {
      await deviceRepository.findOneOrFail({
        where: {id}
      });
    } catch (error) {
      res.status(404).send("Device not found");
      return;
    }
    deviceRepository.delete(id);
    res.status(204).send("Device deleted");
  };
}
