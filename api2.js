const { check } = require('./hacked-emails-api');
async function main() {
    try {
        const response = await check('test@example.com');
        console.log('Query:', response.query);
        console.log('Status:', response.status);
        console.log('Results:', response.results);
        console.log('Breaches:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}
main();
