"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeDelete = exports.nodeGet = exports.nodeSet = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default();
const nodeSet = (key, value, ttl = 600) => {
    return cache.set(key, value, ttl);
};
exports.nodeSet = nodeSet;
const nodeGet = (key) => {
    return cache.get(key);
};
exports.nodeGet = nodeGet;
const nodeDelete = (key) => {
    return cache.del(key);
};
exports.nodeDelete = nodeDelete;
