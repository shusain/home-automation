// src/entity/SensorType.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Sensor } from './Sensor';
  
  @Entity()
  export class SensorType {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ nullable: true })
    unit: string;
  
    @Column()
    isDigital: boolean;
  
    @OneToMany(() => Sensor, (sensor) => sensor.sensorType)
    sensors: Sensor[];
  }
  