const hostName = "http://localhost:8080";

const UrlApi = {
    AdsArea: hostName + "/adsareas",
    GetAdsAreaIdInfo: hostName + "/getadsAreasIdInfo",

    PriceFactor: hostName + "/pricefactors",
    ServicePrice: hostName + "/serviceprices",
    GetServicePriceIdInfo: hostName + "/getservicePricesIdInfo",

    PromotionManagement: hostName + "/promotionmanagements",
    PostCampaignManagement: hostName + "/postcampaignmanagements",
    UserManagement: hostName + "/users"
}

export default UrlApi;