import axios from "axios";

// GET api/logger
// GET api/logger
const fetchLogger = async () => {
  try {
    const apiUrl = process.env.API_URL;
    const response = await axios.get(`${apiUrl}/api/logger`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    if (response.data.code === 200) {
      return response.data;
    } else {
      console.error(`Error fetching logger: Received unexpected response code ${response.data.code}`);
      return null;
    }
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error(`Error fetching logger: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Error fetching logger: No response received from server");
    } else {
      // Something happened in setting up the request
      console.error(`Error fetching logger: ${error.message}`);
    }
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

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error deleting logger: Received unexpected response code ${response.status}`);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error(`Error deleting logger: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      console.error("Error deleting logger: No response received from server");
    } else {
      console.error(`Error deleting logger: ${error.message}`);
    }
    return null;
  }
};

// GET api/logger/talis
const fetchLoggerTalis = async () => {
  try {
    const apiUrl = process.env.API_URL;
    const response = await axios.get(`${apiUrl}/api/logger/talis`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    if (response.data.code === 200) {
      return response.data;
    } else {
      console.error(`Error fetching logger talis: Received unexpected response code ${response.data.code}`);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error(`Error fetching logger talis: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      console.error("Error fetching logger talis: No response received from server");
    } else {
      console.error(`Error fetching logger talis: ${error.message}`);
    }
    return null;
  }
};

// DELETE api/logger/talis/timestamp
const deleteLoggerTalis = async (timestamp) => {
  try {
    const apiUrl = process.env.API_URL;
    const response = await axios.delete(`${apiUrl}/api/logger/talis/${timestamp}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error deleting logger talis: Received unexpected response code ${response.status}`);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error(`Error deleting logger talis: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      console.error("Error deleting logger talis: No response received from server");
    } else {
      console.error(`Error deleting logger talis: ${error.message}`);
    }
    return null;
  }
};
export { fetchLogger, deleteLogger, fetchLoggerTalis, deleteLoggerTalis };
