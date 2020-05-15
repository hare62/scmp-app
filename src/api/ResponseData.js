class ResponseData {
  constructor() {
    this.jsonData = '';
    this.headers = '';
  }

  static async init(response) {
    if (!response) console.error("ResponseData - init : response is null");

    let responseData = new ResponseData();
    try {
      await response.json().then((json) => {
        responseData.jsonData = json;
      });
      responseData.headers = response.headers;
    }
    
    catch (error) {
      console.error(error);
    }

    return responseData;
  }
};

export default ResponseData;