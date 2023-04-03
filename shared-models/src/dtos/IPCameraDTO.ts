import { DeviceDTO } from "./DeviceDTO";

// shared-models/dtos/ipcamera.dto.ts
export interface IPCameraDTO {
    id: number;
    name: string;
    device?:DeviceDTO;
    deviceId?: number;
    rtspUrl: string;
}