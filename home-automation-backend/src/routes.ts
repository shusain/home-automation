import { ActuatorController } from "./controllers/ActuatorController";
import { DeviceController } from "./controllers/DeviceController";
import { IPCameraController } from "./controllers/IPCameraController";
import { LocationController } from "./controllers/LocationController";
import { SensorController } from "./controllers/SensorController";

const locController = new LocationController()

export const AppRoutes = [
  // Location routes
  {
    path: "/locations",
    method: "get",
    action: LocationController.listAll,
  },
  {
    path: "/locations/:id",
    method: "get",
    action: LocationController.getOneById,
  },
  {
    path: "/locations",
    method: "post",
    action: LocationController.createLocation,
  },
  {
    path: "/locations/:id",
    method: "put",
    action: LocationController.editLocation,
  },
  {
    path: "/locations/:id",
    method: "delete",
    action: LocationController.deleteLocation,
  },
  // Other routes...
  {
    path: "/devices",
    method: "get",
    action: DeviceController.listAll,
  },
  {
    path: "/devices/:id",
    method: "get",
    action: DeviceController.getOneById,
  },
  {
    path: "/devices",
    method: "post",
    action: DeviceController.createDevice,
  },
  {
    path: "/devices/:id",
    method: "put",
    action: DeviceController.editDevice,
  },
  {
    path: "/devices/:id",
    method: "delete",
    action: DeviceController.deleteDevice,
  },
  // Sensor routes
  {
    path: "/sensors",
    method: "get",
    action: SensorController.listAll,
  },
  {
    path: "/sensors/:id",
    method: "get",
    action: SensorController.getOneById,
  },
  {
    path: "/sensors",
    method: "post",
    action: SensorController.createSensor,
  },
  {
    path: "/sensors/:id",
    method: "put",
    action: SensorController.editSensor,
  },
  {
    path: "/sensors/:id",
    method: "delete",
    action: SensorController.deleteSensor,
  },


  // Actuator routes
  {
    path: "/actuators",
    method: "get",
    action: ActuatorController.listAll,
  },
  {
    path: "/actuators/:id",
    method: "get",
    action: ActuatorController.getOneById,
  },
  {
    path: "/actuators",
    method: "post",
    action: ActuatorController.createActuator,
  },
  {
    path: "/actuators/:id",
    method: "put",
    action: ActuatorController.editActuator,
  },
  {
    path: "/actuators/:id",
    method: "delete",
    action: ActuatorController.deleteActuator,
  },


  // IPCamera routes
  {
    path: "/ipcameras",
    method: "get",
    action: IPCameraController.listAll,
  },
  {
    path: "/ipcameras/:id",
    method: "get",
    action: IPCameraController.getOneById,
  },
  {
    path: "/ipcameras",
    method: "post",
    action: IPCameraController.createIPCamera,
  },
  {
    path: "/ipcameras/:id",
    method: "put",
    action: IPCameraController.editIPCamera,
  },
  {
    path: "/ipcameras/:id",
    method: "delete",
    action: IPCameraController.deleteIPCamera,
  },
  // Other routes (Location routes, Device routes, Sensor routes, Actuator routes)...

];
