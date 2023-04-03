import { Request, Response } from "express";
import Stream from "node-rtsp-stream";
import { getRepository } from "typeorm";
import { Device } from "../entity/Device";
import { IPCamera } from "../entity/IPCamera";
import { Location } from "../entity/Location";

export class IPCameraController {
  static startStream = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const ipCameraRepository = getRepository(IPCamera);

    try {
      const ipCamera = await ipCameraRepository.findOneOrFail({where:{id}});

      let stream: Stream | undefined = req.app.get(`stream-${id}`);

      if(stream) {
        console.log('Stream already running')
        res.status(200).send({ streamUrl:  `http://localhost:${stream.wsServer.options.port}`});
      }

      stream = new Stream({
        name: `camera-${id}`,
        streamUrl: ipCamera.rtspUrl,
        wsPort: 9999 + id, // Assuming unique IDs
      });

      // Store the stream instance in the request object for later access
      req.app.set(`stream-${id}`, stream);

      res.status(200).send({ streamUrl: `http://localhost:${stream.wsServer.options.port}`});
    } catch (error) {
      res.status(404).send({message: 'IPCamera not found'});
    }
  };

  static stopStream = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    const stream: Stream | undefined = req.app.get(`stream-${id}`);

    if (stream) {
      stream.wsServer.close();
      req.app.set(`stream-${id}`, undefined);
      res.status(200).send({ message: 'Stream stopped' });
    } else {
      res.status(404).send('Stream not found');
    }
  };

  static listAll = async (req: Request, res: Response) => {
    const ipCameraRepository = getRepository(IPCamera);
    const ipCameras = await ipCameraRepository.find({ relations: ["device"] });
    res.send(ipCameras);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const ipCameraRepository = getRepository(IPCamera);
    try {
      const ipCamera = await ipCameraRepository.findOneOrFail({
        where: { id },
        relations: ["device"],
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
    // try {
      // const location = await locationRepository.findOneOrFail(locationId);

      // TODO: decide if cameras should be separate from devices
      // and tied to location directly
      //   ipCamera.location = location;
    // } catch (error) {
      // res.status(404).send("Location not found");
      // return;
    // }

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
    const { name, rtspUrl, deviceId } = req.body;

    const ipCameraRepository = getRepository(IPCamera);
    let ipCamera;
    try {
      ipCamera = await ipCameraRepository.findOneOrFail({
        where: { id },
        relations: ["device"],
      });
    } catch (error) {
      res.status(404).send("IPCamera not found");
      return;
    }

    ipCamera.name = name;
    ipCamera.rtspUrl = rtspUrl;

    // TODO: decide if cameras should be separate from devices
    // and tied to location directly
    if (deviceId) {
      const deviceRepo = getRepository(Device);
      try {
        const device = await deviceRepo.findOneOrFail({
          where: { id: deviceId }
        });
        ipCamera.device = device;
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
