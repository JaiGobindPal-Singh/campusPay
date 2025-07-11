//* this function generates the unique id 
function generateUniqueId() {
    try{
        const chars = '0123456789';
        let uniqueId = '';
        // Generate 32 random characters from the chars string
        for (let i = 0; i < 32; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            uniqueId += chars.charAt(randomIndex);
        }
        return uniqueId;
    }catch(err) {
        process.env.NODE_ENV == "development" && console.log('Error generating unique ID:', err);
        throw new Error('Failed to generate unique ID',err);
    }
}
export default generateUniqueId;