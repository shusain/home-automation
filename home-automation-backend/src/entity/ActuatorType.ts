// src/entity/ActuatorType.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Actuator } from './Actuator';
  
  @Entity()
  export class ActuatorType {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column('float')
    minValue: number;
  
    @Column('float')
    maxValue: number;
  
    @Column()
    controlType: string;
  
    @OneToMany(() => Actuator, (actuator) => actuator.actuatorType)
    actuators: Actuator[];
  }
  