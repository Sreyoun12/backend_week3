export default function validateQuery(req, res, next) {
    const { minCredits, maxCredits } = req.query;

    if (minCredits !== undefined) {
        const minValue = Number(minCredits);
        if (!Number.isInteger(minValue) || String(minValue) !== minCredits) {
            return res.status(400).json({ error: 'minCredits must be a valid integer' });
        }
    }

    if (maxCredits !== undefined) {
        const maxValue = Number(maxCredits);
        if (!Number.isInteger(maxValue) || String(maxValue) !== maxCredits) {
            return res.status(400).json({ error: 'maxCredits must be a valid integer' });
        }
    }

    if (minCredits !== undefined && maxCredits !== undefined) {
        const minValue = Number(minCredits);
        const maxValue = Number(maxCredits);
        if (minValue > maxValue) {
            return res.status(400).json({ error: 'Invalid credit range: minCredits cannot be greater than maxCredits' });
        }
    }

    next();
}
