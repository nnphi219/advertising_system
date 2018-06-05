const HOST_NAME_SERVER = "http://localhost:8082";

export const URL_API = {
    UserRegister: HOST_NAME_SERVER + "/users",
    UserLogin: HOST_NAME_SERVER + "/users/login"
};

export const POST_TYPES = {
    keys: ['tin_ban_nha', 'tin_cho_thue'],
    values: ['Tin bán nhà', 'Tin cho thuê']
}