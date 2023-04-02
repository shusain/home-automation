import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Location } from "../entity/Location";

export class LocationController {
  static listAll = async (req: Request, res: Response) => {
    const locationRepository = getRepository(Location);
    const locations = await locationRepository.find({ relations: ["devices"] });
    res.send(locations);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const locationRepository = getRepository(Location);
    try {
      const location = await locationRepository.findOneOrFail({
        where: {id},
        relations: ["devices"],
      });
      res.send(location);
    } catch (error) {
      res.status(404).send("Location not found");
    }
  };

  static createLocation = async (req: Request, res: Response) => {
    const { name } = req.body;
    const location = new Location();
    location.name = name;

    const locationRepository = getRepository(Location);
    try {
      await locationRepository.save(location);
    } catch (e) {
      res.status(409).send({msg: "Location creation failed"});
      return;
    }

    res.status(201).send({msg:"Location created"});
  };

  static editLocation = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const locationRepository = getRepository(Location);
    let location;
    try {
      location = await locationRepository.findOneOrFail({where:{id}});
    } catch (error) {
      res.status(404).send("Location not found");
      return;
    }

    location.name = name;
    try {
      await locationRepository.save(location);
    } catch (e) {
      res.status(409).send("Location update failed");
      return;
    }

    res.status(204).send("Location updated");
  };

  static deleteLocation = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const locationRepository = getRepository(Location);
    try {
      await locationRepository.findOneOrFail({where:{id}});
    } catch (error) {
      res.status(404).send("Location not found");
      return;
    }
    locationRepository.delete(id);
    res.status(204).send("Location deleted");
  };
}
