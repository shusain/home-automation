import { Component, OnInit, OnDestroy } from '@angular/core';
import { MqttService } from '../services/mqtt.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-mqtt-monitor',
  templateUrl: './mqtt-monitor.component.html',
  styleUrls: ['./mqtt-monitor.component.scss']
})
export class MqttMonitorComponent implements OnInit, OnDestroy {
  mqttSubscription!: Subscription;
  receivedMessages: { topic: string; message: string }[] = [];
  mqttForm: FormGroup;

  constructor(private mqttService: MqttService) {
    this.mqttForm = new FormGroup({
      publishTopic: new FormControl(''),
      publishMessage: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.subscribeToMqtt();
  }

  ngOnDestroy(): void {
    if (this.mqttSubscription) {
      this.mqttSubscription.unsubscribe();
    }
  }

  subscribeToMqtt(): void {
    this.mqttSubscription = this.mqttService.subscribeTo('#').subscribe(({ topic, message }) => {
      this.receivedMessages.push({ topic, message: message.toString() });
    });
  }

  publishMqttMessage(): void {
    const { publishTopic, publishMessage } = this.mqttForm.value;
    this.mqttService.publish(publishTopic, publishMessage);
  }
}
