import mqtt from "mqtt";

const MQTT_SERVER_URL = "mqtt://192.168.0.11";
const client = mqtt.connect(MQTT_SERVER_URL);

client.on("connect", () => {
  console.log("Connected to MQTT server");
  // Subscribe to topics and handle messages
});

client.on("error", (error) => {
  console.log("MQTT client error:", error);
});

client.on("message", (topic, message) => {
  // Handle MQTT messages and update devices, sensors, actuators, or emit WebSocket events
});


export default client;
