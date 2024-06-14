"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const admin_1 = __importDefault(require("./routes/admin"));
const student_1 = __importDefault(require("./routes/student"));
const parent_1 = __importDefault(require("./routes/parent"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const DB_url = process.env.DB_URL;
console.log(DB_url);
mongoose_1.default
    .connect(DB_url)
    .then(() => {
    console.log("connected to database!!!");
})
    .catch((err) => {
    console.log("error:", err.message);
});
// set middlewares
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.json("welcome to new school api");
});
//admin routes
app.use("/api/admin", admin_1.default);
//student routes
app.use("/api/student", student_1.default);
//student routes
app.use("/api/parent", parent_1.default);
const port = process.env.PORT || 6500;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
