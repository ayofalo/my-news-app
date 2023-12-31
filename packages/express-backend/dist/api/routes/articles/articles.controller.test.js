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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../../server"));
//Testing the backend
//should return 200 and list of articles
//should return 401 if API key is missing
//should return 401 if API key is incorrect
//should pass the request if API key is correct
describe("Get Articles Controller", () => {
    it("should return 200 and list of articles", () => __awaiter(void 0, void 0, void 0, function* () {
        const apiKey = "5aa965eb8e501bff4bde01b13de411e5";
        const response = yield (0, supertest_1.default)(server_1.default).get("/").query({ apiKey });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("status", "success");
        expect(response.body).toHaveProperty("data");
    }));
    it("should return 401 if API key is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get("/");
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: "Invalid API key" });
    }));
    it("should return 401 if API key is incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get("/").query({ apiKey: "wrong_key" });
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: "Invalid API key" });
    }));
    it("should pass the request if API key is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        const apiKey = "5aa965eb8e501bff4bde01b13de411e5";
        const response = yield (0, supertest_1.default)(server_1.default).get("/").query({ apiKey });
        expect(response.status).toBe(200);
    }));
});
