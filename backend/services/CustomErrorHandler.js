
class CustomErrorHandler extends Error{
    constructor(status,msg) {
        this.msg = msg;
        this.status = status;
    }

    static alreadyExists(msg){
        return new CustomErrorHandler(409,msg);
    }
}
export default CustomErrorHandler;