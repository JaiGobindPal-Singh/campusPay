import bcrypt from 'bcrypt';

export const verifyPassword = async (password, hash) => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch (error) {
        console.log('Error verifying password:', error);
        throw error;
    }
}
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.log('Error hashing password:', error);
        throw error;
    }
}