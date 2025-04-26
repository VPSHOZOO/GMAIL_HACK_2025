// hacked-emails-api.js
const axios = require('axios');
const HACKED_EMAILS_API_URI = "https://hacked-emails.com/api";
/**
 * @typedef {Object} Data
 * @property {string} source_url
 * @property {number} source_lines
 * @property {number} source_size
 * @property {string} source_network
 * @property {string} source_provider
 * @property {string} title
 * @property {string} author
 * @property {string} date_created
 * @property {string} date_leaked
 * @property {number} emails_count
 * @property {boolean} verified
 * @property {string} details
 */
/**
 * @typedef {Object} Response
 * @property {Data[]} data
 * @property {string} query
 * @property {string} status
 * @property {number} results
 */
/**
 * Checks if an email has been compromised in data breaches
 * @param {string} email - Email address to check
 * @returns {Promise<Response>} API response
 * @throws {Error} If the API request fails
 */
async function check(email) {
    try {
        const endpoint = `${HACKED_EMAILS_API_URI}?q=${encodeURIComponent(email)}`;
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        throw new Error(`API request failed: ${error.message}`);
    }
}
module.exports = {
    check
};
