const hostName = "http://localhost:8081";

export const UrlApi = {
    UserManagement: hostName + "/users",
    UserAuthen: hostName + "/users/me",
    UserLogin: hostName + "/users/login",
    UserLogout: hostName + "/users/me/token"
}

export const UrlRedirect = {
    Users : '/users',
    CreateUser: '/users/create',
    EditUser: 'users/edit'
}