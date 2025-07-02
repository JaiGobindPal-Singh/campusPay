import jwt from 'jsonwebtoken';

export const generateTokenForStudent = async (student) => {
    try{
        const JWT_SECRET = process.env.JWT_SECRET
        const token = jwt.sign({
            rollNo:student.rollNo,
            mobile:student.mobile
        },JWT_SECRET,{
            expiresIn: '12h'
        })
        return token;
    }catch(err){
        console.log('error in generating token for student', err);
        return null;
    }
}
export const generateTokenForAccountant = (user) => {
    try{
        const JWT_SECRET = process.env.JWT_SECRET
        const token = jwt.sign(user,JWT_SECRET,{
            expiresIn: '24h'
        })
        return token;
    }catch(err){
        console.log('error in generating token for accountant', err);
        return null;
    }
}

export const verifyToken = (token) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null; // or handle the error as needed
    }
}