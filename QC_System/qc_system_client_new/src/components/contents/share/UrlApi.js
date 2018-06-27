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
    PriceFactorWithoutTimeSlots: hostNameServer + "/priceFactorsWithoutTimeSlots",

    PriceFactorCalculateTotalAffectValue: hostNameServer + "/priceFactorCalculateTotalAffectValue",

    ServicePrice: hostNameServer + "/serviceprices",
    ReadA_ServicePrice: hostNameServer + "/serviceprices/check",
    GetServicePriceIdInfo: hostNameServer + "/getservicePricesIdInfo",
    GetServicePriceByAreaIdAndDisplayMode: hostNameServer + "/getServicePriceByAreaIdAndDisplayMode",

    PromotionManagement: hostNameServer + "/promotionmanagements",
    GetPromotionIdInfos: hostNameServer + "/getPromotionsIdInfo",
    ReadA_Promotion: hostNameServer + "/promotionmanagements/check",
    GetPromotionByPromotionIdAndUsername: hostNameServer + "/GetPromotionByPromotionIdAndUsername",

    PostCampaignManagement: hostNameServer + "/postcampaignmanagements",
    PostCampaignforXsystem: hostNameServer + "/PostCampaignforXsystem",
    GetAvailableTimeSlots: hostNameServer + "/GetAvailableTimeSlot",

    XsystemPages: hostNameServer + "/xsystemPages",
    ReadA_Xsystem_Page: hostNameServer + "/xsystemPages/check",

    XsystemPostTypes: hostNameServer + "/xsystemPostTypes",
    ReadA_Xsystem_PostType: hostNameServer + "/xsystemPostTypes/check",

    XsystemDomainUrls: hostNameServer + "/XsystemDomainUrls",
    Read_A_Xsystem_DomainUrl: hostNameServer + "/XsystemDomainUrls/check",
    XsystemDomainUrlsCreateManyItem: hostNameServer + "/XsystemDomainUrlsCreateManyDomain",
    
    XsystemApiUrls: hostNameServer + "/XsystemApiUrls",
    Read_A_Xsystem_ApiUrl: hostNameServer + "/XsystemApiUrls/check",
    XsystemApiUrlsCreateManyItem: hostNameServer + "/XsystemApiUrlsCreateManyApiUrl",

    UserManagement: hostNameServer + "/users",
    UserAuthen: hostNameServer + "/users/me",
    UserLogin: hostNameServer + "/users/login",
    UserLogout: hostNameServer + "/users/me/token",

    UploadFile: hostNameServer + "/uploads",

    PostManagement: `http://${HOST}:${PORT}/postmanagement`,
    Upload: `http://${HOST}:${PORT}/uploads`,

    Payment: `http://${HOST}:${PORT}/payment/checkout`
}

export const UrlRedirect = {
    Users : '/users',
    UserCreator: '/users/create',
    UserEditor: '/users/edit',
    CreateUser: '/users/create',
    EditUser: '/users/edit',
    UserLogin: '/login',
    UserRegister: '/register',
    UserTokenMe: '/users/me/token',
    UserProfile: '/profile',

    AdsArea: '/ads-areas',
    AdsAreaCreator: '/ads-areas/create',
    AdsAreaEditor: '/ads-areas/edit',

    ServicePrices: '/service-prices',
    ServicePriceCreator: '/service-prices/create',
    ServicePriceEditor: '/service-prices/edit',

    PriceFactors: '/price-factors',
    PriceFactorCreator: '/price-factors/create',
    PriceFactorEditor: '/price-factors/edit',

    Promotions: '/promotions',
    PromotionCreator: '/promotions/create',
    PromotionEditor: '/promotions/edit',

    AdsPages: '/ads-pages',
    AdsPageCreator: '/ads-pages/create',
    AdsPageEditor: '/ads-pages/edit',

    PostTypes: '/post-types',
    PostTypeCreator: '/post-types/create',
    PostTypeEditor: '/post-types/edit',

    PostCampaign: '/post-campaign',

    XsystemDomainUrls: '/domains',
    XsystemUpdateDomainUrl: '/domains/update',

    XsystemApiUrls: '/api-urls',
    XsystemUpdateApiUrl: '/api-urls/update'
}

export default UrlApi;