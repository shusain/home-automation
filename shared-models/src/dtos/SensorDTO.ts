// shared-models/dtos/sensor.dto.ts
export interface SensorDTO {
    id: number;
    name: string;
    deviceId: number;
    lastValue: string;
    valueType: string;
}