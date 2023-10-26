import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { Device } from "./Device";
import { SensorType } from "./SensorType";

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column("float")
  lastValue: number;

  @ManyToOne(() => Device, (device) => device.sensors)
  device: Device;

  @ManyToOne(() => SensorType, (sensorType) => sensorType.sensors)
  sensorType: SensorType;
}
