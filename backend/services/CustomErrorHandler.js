
class CustomErrorHandler extends Error{
    constructor(status,message) {
        super();
        this.statusCode = status;
        this.message = message;
    }

    static alreadyExists(message){
        return new CustomErrorHandler(409,message);
    }

    static wrongCradential(message){
        return new CustomErrorHandler(401,message);
    }

    static unAuthorized(message = 'Unauthorized'){
        return new CustomErrorHandler(401,message);
    }

    static notFound(message = '404 not found'){
        return new CustomErrorHandler(404,message);
    }

    static serverError(message = 'Internel Server Error'){
        return new CustomErrorHandler(500,message);
    }
}
export default CustomErrorHandler;