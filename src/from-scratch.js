export const fetchHandler = async (url, options = {}) => {
  try {
    // const tuple = [data, { message: 'error!' }];
    const response = await fetch(url, options);

    if (!response.ok)
      throw new Error(
        `Fetch failed with status - ${response.status}, ${response.statusText}`
      );

    // get the headers from the response.headers
    const isJson = (response.headers.get('content-type') || '').includes(
      'application/json'
    );

    if (isJson) {
      const jsonData = await response.json();
      return [jsonData, null];
    } else {
      const textData = await response.text();
      return [textData, null];
    }

    // return [{}, null];
  } catch (error) {
    console.warn(error);
    return [null, error];
  }
};
