import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany
} from "typeorm";
import { Location } from "./Location";
import { Sensor } from "./Sensor";
import { Actuator } from "./Actuator";
import { IPCamera } from "./IPCamera";

@Entity()
export class Device {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Location, (location) => location.devices)
    location: Location;

    @OneToMany(() => Sensor, (sensor) => sensor.device)
    sensors: Sensor[];

    @OneToMany(() => Actuator, (actuator) => actuator.device)
    actuators: Actuator[];

    @OneToMany(() => IPCamera, (ipCamera) => ipCamera.device)
    ipCameras: IPCamera[];
}
