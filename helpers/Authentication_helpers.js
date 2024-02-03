import jwt from "jsonwebtoken";

function verifyToken(req) {
    const { cookies } = req;
    const token = cookies.token;

    if (!token) {
        // Token is missing, return null or throw an error
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return decoded;
    } catch (error) {
        // Token is invalid, return null or throw an error
        return null;
    }
}

export { verifyToken };
