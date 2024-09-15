// src/utils/fetcher.js
import axios from 'axios';

const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/66bcbc63ad19ca34f8961013'; // Replace with your JSONBin URL
const ACCESS_KEY = '$2a$10$C0f/kCvI8nye5HFp9t0WG.RCLgapwlIFX2k8/eyrdqurZWhh.fgM.'; // Replace with your Access Key

export const fetchAdventurers = async () => {
  try {
    const response = await axios.get(JSONBIN_URL, {
      headers: {
        'X-Access-Key': ACCESS_KEY
      },
    });
    console.log('Fetched data:', response.data)
    return response.data.record.adventurers; // Adjust based on your JSON structure
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
