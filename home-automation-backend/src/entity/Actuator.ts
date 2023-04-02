import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
  } from "typeorm";
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
  }
  