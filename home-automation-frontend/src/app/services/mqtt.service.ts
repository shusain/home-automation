import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MqttService {
  private mqttWebSocket: WebSocketSubject<any>;
  private mqttSubject: Subject<{ topic: string; message: Buffer }>;

  constructor() {
    this.mqttWebSocket = webSocket('ws://localhost:3000/mqtt'); // Change this to your WebSocket URL
    this.mqttSubject = new Subject<{ topic: string; message: Buffer }>();

    this.mqttWebSocket.subscribe((data) => {
      this.mqttSubject.next(data);
    });
  }

  subscribeTo(topic: string): Observable<{ topic: string; message: Buffer }> {
    this.mqttWebSocket.next({ type: 'subscribe', topic });
    return this.mqttSubject.asObservable();
  }

  publish(topic: string, message: string): void {
    this.mqttWebSocket.next({ type: 'publish', topic, message });
  }
}
