const hostNameServer = "http://localhost:8081";
const QCSystem = "http://localhost:3000";
const QcSystemServer = "http://localhost:8080";

export const UrlApi = {
    UserManagement: hostNameServer + "/users",
    UserAuthen: hostNameServer + "/users/me",
    UserLogin: hostNameServer + "/users/login",
    UserLogout: hostNameServer + "/users/me/token",

    PostManagement: hostNameServer + "/posts",
    Post: hostNameServer + '/post',
    Marketing: hostNameServer + "/marketing",
    GetPostsByPostIds: hostNameServer + "/GetPostsByPostIds",

    Pages: hostNameServer + "/pages",
    ReadAPage: hostNameServer + '/pages/check',

    PostTypes: hostNameServer + "/posttypes",
    ReadAPostType: hostNameServer + "/posttypes/check",

    GetAdvertisement: hostNameServer + "/getPostsBasicOnAppliedPage_seeddata",

    UploadFile: hostNameServer + "/uploads"
};

export const UrlRedirect = {
    Users : '/users',
    CreateUser: '/users/create',
    EditUser: '/users/edit',
    UserLogin: '/login',
    UserRegister: '/register',
    UserTokenMe: '/users/me/token',

    Posts: '/posts',
    CreatePost: '/posts/create',
    EditPost: '/posts/edit',
    
    Pages: '/pages',
    CreatePage: '/pages/create',
    EditPage: '/pages/edit',

    PostTypes: '/posttypes',
    CreatePostType: '/posttypes/create',
    EditPostType: '/posttypes/edit',

    NotFound: '/notfound'
};

export const QCSytemUrl = {
    Post_Campaign: QCSystem + "/post-campaign",

    get_posts_basicOn_DisplayPage: QcSystemServer + "/getPostsBasicOnServiceTypeAndXAdminUsername"
};