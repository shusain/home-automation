import { DeviceDTO } from "./DeviceDTO";

// shared-models/dtos/location.dto.ts
export interface LocationDTO {
    id: number;
    name: string;
    devices: Array<DeviceDTO>
}