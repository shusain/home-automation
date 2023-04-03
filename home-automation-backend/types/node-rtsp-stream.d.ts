// types/node-rtsp-stream.d.ts

declare module 'node-rtsp-stream' {
  import { Server } from 'ws';

  export default class Stream {
    constructor(options: StreamOptions);
    wsServer: Server;
  }

  export interface StreamOptions {
    name: string;
    streamUrl: string;
    wsPort: number;
    ffmpegOptions?: string[];
  }
}
