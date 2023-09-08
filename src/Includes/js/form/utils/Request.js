const request = async (data) => {
  if (!data.body || !data.endpoint) {
    return null;
  }

  const requestMetadata = {
    method: data.method ? data.method : "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.body),
  };

  try {
    const response = await fetch(data.endpoint, requestMetadata);
    return await response.json();
  } catch (error) {
    return error;
  }
};

export default request;
