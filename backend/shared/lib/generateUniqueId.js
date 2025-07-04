import crypto from 'crypto';
function generateUniqueId(length = 16) {
    // Get timestamp component
    const timestamp = Date.now().toString(36);
    
    // Generate random bytes with crypto
    const randomBytesLength = Math.ceil((length - timestamp.length) * 0.75); // 3 bytes = 4 base64 chars
    const randomBytes = crypto.randomBytes(randomBytesLength);
    
    // Convert to base64 and remove non-alphanumeric characters
    const randomStr = randomBytes.toString('base64')
        .replace(/[+/=]/g, '')
        .slice(0, length - timestamp.length);
    
    // Combine timestamp and random part
    return (timestamp + randomStr).slice(0, length);
}

export default generateUniqueId;