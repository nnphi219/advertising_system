const HOST = "localhost";
const PORT = "8080";
const hostName = "http://localhost:8080";

const UrlApi = {
    AdsArea: hostName + "/adsareas",
    GetAdsAreaIdInfo: hostName + "/getadsAreasIdInfo",

    PriceFactor: hostName + "/pricefactors",

    ServicePrice: hostName + "/serviceprices",
    GetServicePriceIdInfo: hostName + "/getservicePricesIdInfo",

    PromotionManagement: hostName + "/promotionmanagements",
    GetPromotionIdInfos: hostName + "/getPromotionsIdInfo",

    PostCampaignManagement: hostName + "/postcampaignmanagements",
    UserManagement: hostName + "/users",
    PostManagement: `http://${HOST}:${PORT}/postmanagement`,
    Upload: `http://${HOST}:${PORT}/postmanagement/upload`
}

export default UrlApi;