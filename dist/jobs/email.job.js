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
exports.addEmailJob = void 0;
const queue_1 = __importDefault(require("../utils/queue"));
const emailQueue = (0, queue_1.default)("emailQueue");
emailQueue.process((job) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`📧 Sending email to ${job.data.email}...`);
    // هنا تحط كود إرسال الإيميل الفعلي
}));
const addEmailJob = (email, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    yield emailQueue.add({ email, subject, message }, { attempts: 3 });
});
exports.addEmailJob = addEmailJob;
exports.default = emailQueue;
