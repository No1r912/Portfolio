/** Portfolio backend. Run with: node backend/server.js */
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const PORT = Number(process.env.PORT) || 3000;
const FRONTEND_DIRECTORY = path.resolve(__dirname, "..", "frontend");
const DATA_DIRECTORY = path.resolve(__dirname, "..", "data");
const MESSAGES_FILE = path.join(DATA_DIRECTORY, "messages.json");
const MAX_BODY_SIZE = 10 * 1024;
const MIME_TYPES = { ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp" };

function sendJson(response, statusCode, payload) {
    response.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    });
    response.end(JSON.stringify(payload));
}

function readRequestBody(request) {
    return new Promise((resolve, reject) => {
        let body = "";
        request.on("data", (chunk) => {
            body += chunk;
            if (Buffer.byteLength(body) > MAX_BODY_SIZE) {
                reject(new Error("Request body is too large."));
                request.destroy();
            }
        });
        request.on("end", () => resolve(body));
        request.on("error", reject);
    });
}

function cleanText(value) { return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : ""; }

function validateMessage(input) {
    const name = cleanText(input.name);
    const email = cleanText(input.email).toLowerCase();
    const message = typeof input.message === "string" ? input.message.trim() : "";
    if (name.length < 2 || name.length > 80) return "Please enter a name between 2 and 80 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return "Please enter a valid email address.";
    if (message.length < 10 || message.length > 2000) return "Your message must be between 10 and 2,000 characters.";
    return { name, email, message };
}

function saveMessage(message) {
    fs.mkdirSync(DATA_DIRECTORY, { recursive: true });
    let messages = [];
    if (fs.existsSync(MESSAGES_FILE)) {
        try { messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf8")); } catch { messages = []; }
    }
    messages.push({ id: crypto.randomUUID(), receivedAt: new Date().toISOString(), ...message });
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf8");
}

async function handleContact(request, response) {
    try {
        if (!(request.headers["content-type"] || "").includes("application/json")) return sendJson(response, 415, { error: "Use application/json for this request." });
        const result = validateMessage(JSON.parse(await readRequestBody(request)));
        if (typeof result === "string") return sendJson(response, 400, { error: result });
        saveMessage(result);
        return sendJson(response, 201, { message: "Message received. Thank you for getting in touch!" });
    } catch (error) {
        return sendJson(response, error instanceof SyntaxError ? 400 : 500, { error: error instanceof SyntaxError ? "Invalid request data." : "Unable to save your message right now." });
    }
}

function serveStatic(request, response) {
    const requestedPath = request.url === "/" ? "/index.html" : decodeURIComponent(request.url.split("?")[0]);
    const filePath = path.resolve(FRONTEND_DIRECTORY, `.${requestedPath}`);
    if (!filePath.startsWith(FRONTEND_DIRECTORY + path.sep) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        return response.end("Not found");
    }
    response.writeHead(200, { "Content-Type": MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream", "X-Content-Type-Options": "nosniff" });
    fs.createReadStream(filePath).pipe(response);
}

http.createServer((request, response) => {
    if (request.method === "OPTIONS" && request.url === "/api/contact") {
        response.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        });
        return response.end();
    }
    if (request.method === "POST" && request.url === "/api/contact") return handleContact(request, response);
    if (request.method === "GET" || request.method === "HEAD") return serveStatic(request, response);
    return sendJson(response, 405, { error: "Method not allowed." });
}).listen(PORT, () => console.log(`Portfolio is running at http://localhost:${PORT}`));
