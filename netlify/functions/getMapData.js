const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY; // Securely access the API key from environment variables
    const address = event.queryStringParameters.address;
    if (!address) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Address is required' }),
      };
    }
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
