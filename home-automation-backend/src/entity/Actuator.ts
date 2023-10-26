import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { ActuatorType } from "./ActuatorType";
import { Device } from "./Device";

@Entity()
export class Actuator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column("float")
  setValue: number;

  @ManyToOne(() => Device, (device) => device.actuators)
  device: Device;

  @ManyToOne(() => ActuatorType, (actuatorType) => actuatorType.actuators)
  actuatorType: ActuatorType;
}
