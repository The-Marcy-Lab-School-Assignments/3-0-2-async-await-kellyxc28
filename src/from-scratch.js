export const fetchHandler = async (url, options = {}) => {
  try {
    /** FEEDBACK: Great job! You passed all test cases! */
    // const tuple = [data, { message: 'error!' }];
    const response = await fetch(url, options);

    if (!response.ok)
      throw new Error(
        `Fetch failed with status - ${response.status}, ${response.statusText}`
      );

    /*
    if there's nothing to parse: 
    Status codes like 204 or 404 
    headers won't have a Content-Type set to json 
    response.text() => return an empty string 
    response.json() => throw an error 

    get the headers from the response.headers
    short-circuiting used here
    */
    const isJson = (response.headers.get('content-type') || '').includes(
      'application/json'
    );

    /*
    not sure which one, so act accordingly

    want to be consistent. null tells anyone "This was intentional, there 
    is no error, we didn't simply miss it".
    */
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
