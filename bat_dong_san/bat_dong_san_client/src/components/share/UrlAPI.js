const HOST_NAME_SERVER = "http://localhost:8082";
const QCSystem = "http://localhost:3000";
const QcSystemServer = "http://localhost:8080";

export const URL_API = {
    UserRegister: HOST_NAME_SERVER + "/users",
    UserLogin: HOST_NAME_SERVER + "/users/login",

    PostManagement: HOST_NAME_SERVER + "/posts",

    UploadFile: HOST_NAME_SERVER + "/uploads",

    GetAdvertisement: HOST_NAME_SERVER + "/getPostsBasicOnAppliedPage",
};

export const QCSytemUrl = {
    Post_Campaign: QCSystem + "/post-campaign",

    get_posts_basicOn_DisplayPage: QcSystemServer + "/getPostsBasicOnServiceTypeAndXAdminUsername"
};