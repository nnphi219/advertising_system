const hostNameServer = "http://localhost:8081";

export const UrlApi = {
    UserManagement: hostNameServer + "/users",
    UserAuthen: hostNameServer + "/users/me",
    UserLogin: hostNameServer + "/users/login",
    UserLogout: hostNameServer + "/users/me/token",

    PostManagement: hostNameServer + "/posts"
}

export const UrlRedirect = {
    Users : '/users',
    CreateUser: '/users/create',
    EditUser: '/users/edit',
    UserLogin: '/users/login',
    UserTokenMe: '/users/me/token',

    Posts: '/posts',
    CreatePost: '/posts/create',
    EditPost: '/posts/edit',
}