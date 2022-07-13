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
const config_1 = __importDefault(require("./config"));
const router_1 = require("./router");
const server_1 = __importDefault(require("./server"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield loader(server_1.default);
        server_1.default.listen(config_1.default.port, () => {
            console.log(`Server is running and listening at http://localhost:${config_1.default.port}`);
        });
    });
}
const loader = (app) => __awaiter(void 0, void 0, void 0, function* () {
    router_1.loadRoutes(app);
    console.log("Routes loaded");
});
startServer().catch((error) => {
    console.error(`Failed to start server on port: ${config_1.default.port}`, error);
    process.exit(1);
});
