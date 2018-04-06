const HOST = "localhost";
const PORT = "8080";

const UrlApi = {
    Base: `http://${HOST}:${PORT}`,
    AdsArea: "http://localhost:8080/adsareas",
    PriceFactor: "http://localhost:8080/pricefactors",
    ServicePrice: "http://localhost:8080/serviceprices",
    PromotionManagement: "http://localhost:8080/promotionmanagements",
    PostCampaignManagement: "http://localhost:8080/postcampaignmanagements",
    PostManagement: `http://${HOST}:${PORT}/postmanagement`,
    Upload: `http://${HOST}:${PORT}/postmanagement/upload`
}

export default UrlApi;