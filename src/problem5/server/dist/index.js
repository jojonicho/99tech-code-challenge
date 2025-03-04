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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const constants_1 = require("./constants");
const datasource_1 = require("./datasource");
const helloRouter_1 = require("./router/helloRouter");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.set('trust proxy', 1);
    datasource_1.appDataSource
        .initialize()
        .then(() => {
        console.log('Data Source has been initialized!');
    })
        .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
    app.use('/hello', helloRouter_1.helloRouter);
    const httpServer = (0, http_1.createServer)(app);
    httpServer.listen(constants_1.PORT, () => {
        console.log(`🚀 Server ready at ${constants_1.BACKEND_URL}:${constants_1.PORT}`);
    });
}))();
//# sourceMappingURL=index.js.map