//* this function generates the unique id 
function generateUniqueId() {
    try{
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let uniqueId = '';
        // Generate 32 random characters from the chars string
        for (let i = 0; i < 32; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            uniqueId += chars.charAt(randomIndex);
        }
        return uniqueId;
    }catch(err) {
        console.log('Error generating unique ID:', err);
        throw new Error('Failed to generate unique ID',err);
    }
}
export default generateUniqueId;