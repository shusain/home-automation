// shared-models/dtos/actuator.dto.ts
export interface ActuatorDTO {
    id: number;
    name: string;
    deviceId: number;
    setValue: string;
    valueType: string;
}