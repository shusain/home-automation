import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
  } from "typeorm";
  import { Device } from "./Device";
  
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
  }
  