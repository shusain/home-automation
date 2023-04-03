import Stream from 'node-rtsp-stream';

export class RtspProxy {
  private stream: Stream | null = null;

  constructor(private rtspUrl: string, private websocketPort: number) {}

  start() {
    this.stream = new Stream({
      name: 'rtspProxy',
      streamUrl: this.rtspUrl,
      wsPort: this.websocketPort,
      ffmpegOptions: [
        '-stats',
        '-r 30'
      ]
    });
  }

  stop() {
    if (this.stream) {
      this.stream.wsServer.close();
      this.stream = null;
    }
  }
}
