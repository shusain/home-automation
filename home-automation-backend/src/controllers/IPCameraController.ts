import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { IPCamera } from "../entity/IPCamera";
import { Location } from "../entity/Location";

export class IPCameraController {
  static listAll = async (req: Request, res: Response) => {
    const ipCameraRepository = getRepository(IPCamera);
    const ipCameras = await ipCameraRepository.find({ relations: ["location"] });
    res.send(ipCameras);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const ipCameraRepository = getRepository(IPCamera);
    try {
      const ipCamera = await ipCameraRepository.findOneOrFail({
        where: { id },
        relations: ["location"],
      });
      res.send(ipCamera);
    } catch (error) {
      res.status(404).send("IPCamera not found");
    }
  };

  static createIPCamera = async (req: Request, res: Response) => {
    const { name, rtspUrl, locationId } = req.body;
    const ipCamera = new IPCamera();
    ipCamera.name = name;
    ipCamera.rtspUrl = rtspUrl;

    const locationRepository = getRepository(Location);
    try {
      const location = await locationRepository.findOneOrFail(locationId);

      // TODO: decide if cameras should be separate from devices
      // and tied to location directly
      //   ipCamera.location = location;
    } catch (error) {
      res.status(404).send("Location not found");
      return;
    }

    const ipCameraRepository = getRepository(IPCamera);
    try {
      await ipCameraRepository.save(ipCamera);
    } catch (e) {
      res.status(409).send("IPCamera creation failed");
      return;
    }

    res.status(201).send("IPCamera created");
  };

  static editIPCamera = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, rtspUrl, locationId } = req.body;

    const ipCameraRepository = getRepository(IPCamera);
    let ipCamera;
    try {
      ipCamera = await ipCameraRepository.findOneOrFail({
        where: { id },
        relations: ["location"],
      });
    } catch (error) {
      res.status(404).send("IPCamera not found");
      return;
    }

    ipCamera.name = name;
    ipCamera.rtspUrl = rtspUrl;

    if (locationId) {
      const locationRepository = getRepository(Location);
      try {
        const location = await locationRepository.findOneOrFail({
          where: { id: locationId }
        });
        // TODO: decide if cameras should be separate from devices
        // and tied to location directly
        // ipCamera.location = location;
      } catch (error) {
        res.status(404).send("Location not found");
        return;
      }
    }

    try {
      await ipCameraRepository.save(ipCamera);
    } catch (e) {
      res.status(409).send("IPCamera update failed");
      return;
    }

    res.status(204).send("IPCamera updated");
  };

  static deleteIPCamera = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const ipCameraRepository = getRepository(IPCamera);
    try {
      await ipCameraRepository.findOneOrFail({
        where: { id }
      });
    } catch (error) {
      res.status(404).send("IPCamera not found");
      return;
    }
    ipCameraRepository.delete(id);
    res.status(204).send("IPCamera deleted");
  };
}
