import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload {
    email: string;
    userType: string
}

export interface DecodedToken extends JwtPayload {
    email: string;
    userType: string
}

const generateToken = (email: string, userType: string): string => {
    const payload: TokenPayload = { email, userType };
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

export const verifyToken = (token: string | undefined) => {
    if (!token || typeof token !== "string") {
        console.error("No Token");
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        if (!decoded) {
            return
        }

        return decoded;
    } catch (error) {
        console.error("JWT verification error:", error);
        return;
    }
}

export default generateToken;