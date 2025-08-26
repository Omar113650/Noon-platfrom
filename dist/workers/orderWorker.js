"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = __importDefault(require("../utils/queue"));
const emailServices_1 = require("../utils/emailServices");
// Worker يعالج كل Job في الـ Queue
queue_1.default.process((job) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, userEmail } = job.data;
    try {
        yield (0, emailServices_1.sendEmail)({
            to: userEmail,
            subject: "تم استلام طلبك - Noon",
            text: `مرحباً ${userEmail}, لقد تم استلام طلبك رقم ${orderId}`,
            html: `<p>مرحباً <strong>${userEmail}</strong>، لقد استلمنا طلبك رقم <strong>${orderId}</strong>.</p>`,
        });
        return Promise.resolve();
    }
    catch (error) {
        console.error("Error sending email for order:", orderId, error);
        throw error;
    }
}));
// import orderQueue from "../utils/queue";
// import { sendEmail } from "../utils/emailServices";
// console.log("✅ Order worker is running...");
// orderQueue.process(async (job) => {
//   const { orderId, userEmail } = job.data;
//   console.log("Processing job:", job.data);
//   try {
//     await sendEmail({
//       to: userEmail,
//       subject: "تم استلام طلبك - Noon",
//       text: `مرحباً ${userEmail}, لقد تم استلام طلبك رقم ${orderId}`,
//       html: `<p>مرحباً <strong>${userEmail}</strong>، لقد استلمنا طلبك رقم <strong>${orderId}</strong>.</p>`,
//     });
//     console.log(`Email sent for order ${orderId}`);
//     return Promise.resolve();
//   } catch (error) {
//     console.error("Error sending email for order:", orderId, error);
//     throw error;
//   }
//   ,{
//     // هذا الخيار يحذف الـ job بعد اكتمال التنفيذ
//   removeOnComplete: true,
//   removeOnFail: true,
//   }
// });
