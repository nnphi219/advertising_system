const HOST = "localhost";
const PORT = "8080";
const hostName = "http://localhost:8080";
const hostNameXSystem = "http://localhost:8081";

export const XsystemUrlApi = {
    GetPages: hostNameXSystem + "getPages",
    GetPostTypes: hostNameXSystem + "getPostTypes"
}

const UrlApi = {
    AdsArea: hostName + "/adsareas",
    ReadA_AdsArea: hostName + "/adsareas/check",
    GetAdsAreaInfo: hostName + "/getadsAreasInfo",

    PriceFactor: hostName + "/pricefactors",
    ReadA_PriceFactor: hostName + "/pricefactors/check",

    ServicePrice: hostName + "/serviceprices",
    ReadA_ServicePrice: hostName + "/serviceprices/check",
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