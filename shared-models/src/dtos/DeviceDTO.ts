import { ActuatorDTO } from "./ActuatorDTO";
import { IPCameraDTO } from "./IPCameraDTO";
import { SensorDTO } from "./SensorDTO";

  // shared-models/dtos/device.dto.ts
  export interface DeviceDTO {
    id: number;
    name: string;
    locationId: number;
    actuators: Array<ActuatorDTO>
    sensors: Array<SensorDTO>
    ipCameras: Array<IPCameraDTO>
  }