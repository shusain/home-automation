import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
  } from "typeorm";
  import { Device } from "./Device";
  
  @Entity()
  export class IPCamera {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    rtspUrl: string;
  
    @ManyToOne(() => Device, (device) => device.ipCameras)
    device: Device;
  }
  