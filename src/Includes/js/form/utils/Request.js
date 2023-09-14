const request = async (data) => {
  if (!data.endpoint) {
    return null;
  }

  const method = data.method ? data.method.toUpperCase() : "POST";

  const requestMetadata = {
    method: method,
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data._wpnonce) {
    requestMetadata.headers["X-WP-Nonce"] = data._wpnonce;
  }

  if (data.body && method !== "GET") {
    requestMetadata.body = JSON.stringify(data.body);
  }

  try {
    const response = await fetch(data.endpoint, requestMetadata);
    return await response.json();
  } catch (error) {
    return error;
  }
};

export default request;
