const successData = (data, code = 200) => {
  return {
    statusCode: code,
    status: "success",
    data: data,
  };
};

const errorData = (data, code = 400) => {
  return {
    statusCode: code,
    status: "success",
    data: data,
  };
};

const successMessage = (message, code = 200) => {
  return {
    statusCode: code,
    status: "success",
    message: message,
  };
};

const errorMessage = (message, code = 400) => {
  return {
    statusCode: code,
    status: "error",
    message: message,
  };
};

export { successData, errorData, successMessage, errorMessage };
