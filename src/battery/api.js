import axios from "axios";

// GET api/logger
const fetchLogger = async () => {
  try {
    const apiUrl = process.env.API_URL;
    const response = await axios.get(`${apiUrl}/api/logger`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching logger:", error);
    return null;
  }
};

// DELETE api/logger/timestamp
const deleteLogger = async (timestamp) => {
  try {
    const apiUrl = process.env.API_URL;
    const response = await axios.delete(`${apiUrl}/api/logger/${timestamp}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting logger:", error);
    return null;
  }
};

export { fetchLogger, deleteLogger };
