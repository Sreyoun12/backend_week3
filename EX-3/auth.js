const VALID_TOKEN = 'xyz123';

export default function auth(req, res, next) {
    const token = req.query.token;

    if (!token || token !== VALID_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized: invalid or missing token' });
    }

    next();
}
