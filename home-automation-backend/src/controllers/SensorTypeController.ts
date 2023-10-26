// src/controller/SensorTypeController.ts

import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { SensorType } from "../entity/SensorType";

export class SensorTypeController {
    static listAll = async (req: Request, res: Response) => {
        const sensorTypeRepository = getRepository(SensorType);
        const sensorTypes = await sensorTypeRepository.find();
        res.send(sensorTypes);
    };

    static getOneById = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        const sensorTypeRepository = getRepository(SensorType);
        try {
            const sensorType = await sensorTypeRepository.findOneOrFail({ where: { id } });
            res.send(sensorType);
        } catch (error) {
            res.status(404).send("SensorType not found");
        }
    };

    static createSensorType = async (req: Request, res: Response) => {
        const { name, unit, isDigital } = req.body;
        const sensorType = new SensorType();
        sensorType.name = name;
        sensorType.unit = unit;
        sensorType.isDigital = isDigital;

        const sensorTypeRepository = getRepository(SensorType);
        try {
            await sensorTypeRepository.save(sensorType);
        } catch (e) {
            res.status(409).send("SensorType creation failed");
            return;
        }

        res.status(201).send("SensorType created");
    };

    static editSensorType = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { name, unit, isDigital } = req.body;

        const sensorTypeRepository = getRepository(SensorType);
        let sensorType;
        try {
            sensorType = await sensorTypeRepository.findOneOrFail({ where: { id } });
        } catch (error) {
            res.status(404).send("SensorType not found");
            return;
        }

        sensorType.name = name;
        sensorType.unit = unit;
        sensorType.isDigital = isDigital;
        try {
            await sensorTypeRepository.save(sensorType);
        } catch (e) {
            res.status(409).send("SensorType update failed");
            return;
        }

        res.status(204).send("SensorType updated");
    };

    static deleteSensorType = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const sensorTypeRepository = getRepository(SensorType);
        try {
            await sensorTypeRepository.findOneOrFail({ where: { id } });
        } catch (error) {
            res.status(404).send("SensorType not found");
            return;
        }
        sensorTypeRepository.delete(id);
        res.status(204).send("SensorType deleted");
    };
}
