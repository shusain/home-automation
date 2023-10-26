// src/controller/ActuatorTypeController.ts

import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ActuatorType } from "../entity/ActuatorType";

export class ActuatorTypeController {
    static listAll = async (req: Request, res: Response) => {
        const actuatorTypeRepository = getRepository(ActuatorType);
        const actuatorTypes = await actuatorTypeRepository.find();
        res.send(actuatorTypes);
    };

    static getOneById = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        const actuatorTypeRepository = getRepository(ActuatorType);
        try {
            const actuatorType = await actuatorTypeRepository.findOneOrFail({ where: { id } });
            res.send(actuatorType);
        } catch (error) {
            res.status(404).send("ActuatorType not found");
        }
    };

    static createActuatorType = async (req: Request, res: Response) => {
        const { name, controlType, minValue, maxValue } = req.body;
        const actuatorType = new ActuatorType();
        actuatorType.name = name;
        actuatorType.controlType = controlType;
        actuatorType.minValue = minValue;
        actuatorType.maxValue = maxValue;

        const actuatorTypeRepository = getRepository(ActuatorType);
        try {
            await actuatorTypeRepository.save(actuatorType);
        } catch (e) {
            res.status(409).send("ActuatorType creation failed");
            return;
        }

        res.status(201).send("ActuatorType created");
    };

    static editActuatorType = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { name, controlType, minValue, maxValue } = req.body;

        const actuatorTypeRepository = getRepository(ActuatorType);
        let actuatorType;
        try {
            actuatorType = await actuatorTypeRepository.findOneOrFail({ where: { id } });
        } catch (error) {
            res.status(404).send("ActuatorType not found");
            return;
        }

        actuatorType.name = name;
        actuatorType.controlType = controlType;
        actuatorType.minValue = minValue;
        actuatorType.maxValue = maxValue;
        try {
            await actuatorTypeRepository.save(actuatorType);
        } catch (e) {
            res.status(409).send("ActuatorType update failed");
            return;
        }

        res.status(204).send("ActuatorType updated");
    };

    static deleteActuatorType = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const actuatorTypeRepository = getRepository(ActuatorType);
        try {
            await actuatorTypeRepository.findOneOrFail({ where: { id } });
        } catch (error) {
            res.status(404).send("ActuatorType not found");
            return;
        }
        actuatorTypeRepository.delete(id);
        res.status(204).send("ActuatorType deleted");
    };
}
