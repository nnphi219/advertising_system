// import { hostname } from "os";

const HOST = "localhost";
const PORT = "8080";
const hostNameServer = "http://localhost:8080";
const hostNameXSystemServer = "http://localhost:8081";

export const XsystemUrlApi = {
    GetPages: hostNameXSystemServer + "/getPages",
    GetPostTypes: hostNameXSystemServer + "/getPostTypes",
    GetPostByUserToken: hostNameXSystemServer + "/getPostByUserToken"
}

const UrlApi = {
    AdsArea: hostNameServer + "/adsareas",
    ReadA_AdsArea: hostNameServer + "/adsareas/check",
    GetAdsAreaInfo: hostNameServer + "/getadsAreasInfo",
    GetAdsAreaInfoByUsername: hostNameServer + "/getadsAreaInfoByUserName",
    GetInfosByUserName: hostNameServer + "/getInfosByUserName",

    PriceFactor: hostNameServer + "/pricefactors",
    ReadA_PriceFactor: hostNameServer + "/pricefactors/check",

    PriceFactorCalculateTotalAffectValue: hostNameServer + "/priceFactorCalculateTotalAffectValue",

    ServicePrice: hostNameServer + "/serviceprices",
    ReadA_ServicePrice: hostNameServer + "/serviceprices/check",
    GetServicePriceIdInfo: hostNameServer + "/getservicePricesIdInfo",
    GetServicePriceByAreaIdAndDisplayMode: hostNameServer + "/getServicePriceByAreaIdAndDisplayMode",

    PromotionManagement: hostNameServer + "/promotionmanagements",
    GetPromotionIdInfos: hostNameServer + "/getPromotionsIdInfo",
    ReadA_Promotion: hostNameServer + "/promotionmanagements/check",
    GetPromotionByPromotionCodeAndUsername: hostNameServer + "/GetPromotionByPromotionCodeAndUsername",

    PostCampaignManagement: hostNameServer + "/postcampaignmanagements",
    PostCampaignforXsystem: hostNameServer + "/PostCampaignforXsystem",

    UserManagement: hostNameServer + "/users",
    UserAuthen: hostNameServer + "/users/me",
    UserLogin: hostNameServer + "/users/login",
    UserLogout: hostNameServer + "/users/me/token",

    UploadFile: hostNameServer + "/uploads",

    PostManagement: `http://${HOST}:${PORT}/postmanagement`,
    Upload: `http://${HOST}:${PORT}/uploads`
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