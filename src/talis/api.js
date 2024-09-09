import axios from "axios";

// GET api/logger/talis
const fetchLoggerTalis = async () => {
  try {
    const apiUrl = process.env.API_URL;
    const response = await axios.get(`${apiUrl}/api/logger/talis`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching logger talis:", error);
    return null;
  }
};

// DELETE api/logger/talis/timestamp
const deleteLoggerTalis = async (timestamp) => {
  try {
    const apiUrl = process.env.API_URL;
    const response = await axios.delete(`${apiUrl}/api/logger/talis/${timestamp}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting logger talis:", error);
    return null;
  }
};

export { fetchLoggerTalis, deleteLoggerTalis };