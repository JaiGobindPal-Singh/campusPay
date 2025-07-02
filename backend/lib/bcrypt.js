import bcrypt from 'bcrypt';

export const verifyAccountantPassword = async (password, hash) => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch (error) {
        console.log('Error verifying password:', error);
    }
}


export const hashAccountantPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.log('Error hashing password:', error);
    }
}