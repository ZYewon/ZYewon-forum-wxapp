import { wsUrl, wsPort } from "./index";
class Ws {
  constructor(config = {}, onMessage = () => {}) {
    const defaultConfig = {
      host: "ws",
      url: wsUrl,
      port: wsPort,
    };
    this.finalConfig = { ...defaultConfig, ...config };
    this.interval = null;
    this.time = 31 * 1000;
    this.onMessage = onMessage;
  }
  // 建立连接
  connet() {
    const { host, url, port } = this.finalConfig;
    this.ws = wx.connectSocket({
      url: `${host}://${url}:${port}`,
      header: {
        "content-type": "application/json",
      },
      protocols: ["protocol1"],
    });
    this.ws.onOpen(this.onopen.bind(this));
    this.ws.onError(this.onerror.bind(this));
    this.ws.onMessage(this.onmessage.bind(this));
    this.ws.onClose(this.onclose.bind(this));
  }
  reConnect() {
    this.ws.close();
    setTimeout(() => {
      this.connet();
    }, 2000);
  }
  // 心跳检测
  checkServer() {
    if (this.interval) clearInterval(this.interval);
    // 如果这个定时器执行了，代表服务器那边心跳检测没回复，需要重连
    this.interval = setInterval(() => {
      this.reConnect();
    }, this.time);
  }
  // 连接成功后，发送鉴权消息
  onopen() {
    const auth = {
      event: "auth",
      message: "Bearer " + (wx.getStorageSync("token") || ""),
    };
    this.send(auth);
    // 开启心跳检测
    this.checkServer();
  }
  // 报错将无线重试断线重连
  onerror() {
    this.reConnect();
  }
  onmessage(msg) {
    const data = JSON.parse(msg.data);
    switch (data.event) {
      case "noauth":
        this.ws.close(); // 代表鉴权没通过，则直接断开 ws 链接
        break;
      case "heartbeat": // 代表示心跳检测
        this.checkServer();
        this.send({
          event: "heartbeat",
          message: "pong",
        });
        break;
      // 其他的就交给外面传来的函数处理
      default:
        this.onMessage(data);
        break;
    }
  }
  onclose() {
    this.interval && clearInterval(this.interval);
  }
  send(msg) {
    this.ws.send({
      data: JSON.stringify(msg),
    });
  }
}

export default Ws;
