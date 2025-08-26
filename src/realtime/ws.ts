import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "http";

type WSClient = WebSocket & { userId?: string };

// حافظ على اتصال المستخدمين (room = userId)
const rooms = new Map<string, Set<WSClient>>();

export function initWebSocket(httpServer: Server) {
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

  wss.on("connection", (socket: WSClient, req) => {
    // استخرج userId من كويري سترنج ?userId=123 (بديل بسيط لـ Auth)
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const userId = url.searchParams.get("userId") || "guest";

    socket.userId = userId;

    if (!rooms.has(userId)) rooms.set(userId, new Set());
    rooms.get(userId)!.add(socket);

    // رسائل ترحيب
    socket.send(JSON.stringify({ type: "welcome", userId }));

    // heartbeat لتفادي تسكير البروكسي
    socket.on("pong", () => {
      // يمكن حفظ آخر وقت نبض هنا
    });

    socket.on("message", (raw) => {
      // لو حبيت تدعم رسائل من العميل
      try {
        const msg = JSON.parse(String(raw));
        // console.log("client message:", msg);
      } catch { /* ignore */ }
    });

    socket.on("close", () => {
      const set = rooms.get(userId);
      if (set) {
        set.delete(socket);
        if (set.size === 0) rooms.delete(userId);
      }
    });
  });

  // ping لكل العملاء كل 30 ثانية
  const iv = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) ws.ping();
    });
  }, 30_000);

  wss.on("close", () => clearInterval(iv));

  return { wss };
}

// دالة تبعت نوتيفيكেশন لمستخدم واحد
export function notifyUser(userId: string | number, payload: unknown) {
  const set = rooms.get(String(userId));
  if (!set) return false;
  const data = JSON.stringify(payload);
  set.forEach((ws) => ws.readyState === WebSocket.OPEN && ws.send(data));
  return true;
}

// دالة تبعت برودكاست (لكل العملاء)
export function broadcast(payload: unknown) {
  const data = JSON.stringify(payload);
  rooms.forEach((set) => {
    set.forEach((ws) => ws.readyState === WebSocket.OPEN && ws.send(data));
  });
}
