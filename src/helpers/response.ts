class SuccessResponse {
    static instance: SuccessResponse;
    constructor() {}
  
    static get(): SuccessResponse {
      if (!SuccessResponse.instance) {
        SuccessResponse.instance = new SuccessResponse();
      }
      return SuccessResponse.instance;
    }
  
    async send({ message, data, count }: { message: string; data?: Partial<any>; count?: number }) {
      return {
        message,
        data,
        count,
      };
    }
  }
  
  const successResponse = SuccessResponse.get();
  
  export { successResponse as SuccessResponse };
      