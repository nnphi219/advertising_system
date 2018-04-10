const HOST = "localhost";
const PORT = "8080";
const hostName = "http://localhost:8080";

const UrlApi = {
    AdsArea: hostName + "/adsareas",
    GetAdsAreaInfo: hostName + "/getadsAreasInfo",

    PriceFactor: hostName + "/pricefactors",

    ServicePrice: hostName + "/serviceprices",
    GetServicePriceIdInfo: hostName + "/getservicePricesIdInfo",

    PromotionManagement: hostName + "/promotionmanagements",
    GetPromotionIdInfos: hostName + "/getPromotionsIdInfo",

    PostCampaignManagement: hostName + "/postcampaignmanagements",

    UserManagement: hostName + "/users",
    UserAuthen: hostName + "/users/me",
    UserLogin: hostName + "/users/login",
    UserLogout: hostName + "/users/me/token",

    PostManagement: `http://${HOST}:${PORT}/postmanagement`,
    Upload: `http://${HOST}:${PORT}/postmanagement/upload`
}

export const UrlRedirect = {
    Users : '/users',
    CreateUser: '/users/create',
    EditUser: '/users/edit',
    UserLogin: '/login',
    UserRegister: '/register',
    UserTokenMe: '/users/me/token'
}

export default UrlApi;