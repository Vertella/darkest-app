import axios from 'axios';

// Replace with your actual JSONBin URL and API key
const locationBinUrl = 'https://api.jsonbin.io/v3/b/66e59b12e41b4d34e4301d66';
const apiKey = '$2a$10$C0f/kCvI8nye5HFp9t0WG.RCLgapwlIFX2k8/eyrdqurZWhh.fgM.';

// Function to fetch data from JSONBin
const fetchLocationData = async () => {
  try {
    const response = await axios.get(locationBinUrl, {
      headers: {
        'X-Access-Key': apiKey,
      },
    });
    return response.data.record.locations; // Adjust based on your data structure
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error for handling in the calling component
  }
};

export default fetchLocationData;
