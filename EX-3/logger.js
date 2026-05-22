export default function logger(req, res, next) {
    const method = req.method;
    const path = req.originalUrl || req.url;
    const query = req.query;
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${method} ${path} query=${JSON.stringify(query)}`);
    next();
}
