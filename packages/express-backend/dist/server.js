"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const winston_1 = __importDefault(require("winston"));
const apiKeyValidation_1 = __importDefault(require("./middleware/apiKeyValidation"));
const articles_router_1 = __importDefault(require("./api/routes/articles/articles.router"));
const swagger_1 = __importDefault(require("./swagger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Setup Swagger
(0, swagger_1.default)(app);
app.use((0, cors_1.default)()); // Allowing all origins by default.
app.use(express_1.default.json()); // Parses incoming JSON requests.
app.use("/", apiKeyValidation_1.default, articles_router_1.default);
// Logger configuration
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.simple(),
    transports: [new winston_1.default.transports.Console()],
});
// Defined a route to handle requests that don't match any other routes.
app.use((req, res, next) => {
    const error = new Error("Not Found");
    //error.status = 404;
    next(error);
});
// Error handling middleware.
app.use((err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(err.status || 500).json({ error: err.message });
});
// Start the server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}...`);
});
// Handle termination signal (SIGINT) to gracefully exit
process.on("SIGINT", () => {
    logger.info("Server is shutting down...");
    // Perform any cleanup or necessary actions here before exiting
    server.close(() => {
        logger.info("Server has been terminated.");
        process.exit(0);
    });
});
exports.default = app;
