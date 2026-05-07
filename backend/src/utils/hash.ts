import bcrypt from "bcryptjs";

// Hash the password using bcrypt
export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, 10);
};

// Compare the provided password with the hashed password
export const comparePassword = async (
    password: string,
    hashedPassword: string,
) => {
    return bcrypt.compare(password, hashedPassword);
};
