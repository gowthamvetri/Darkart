export const baseURL = 'http://localhost:8080';

const SummaryApi = {
    register:{
        url: "/api/user/register",
        method: 'post'
    },
    login :{
        url: "/api/user/login",
        method: 'post'
    },
    forgetPassword :{
        url: "/api/user/forgot-password",
        method: 'put'
    },
    forgetPasswordVerify :{
        url: "/api/user/verify-forgot-password-otp",
        method: 'put'
    },
    resetPassword :{
        url: "/api/user/reset-password",
        method: 'put'
    },
    refreshToken :{
        url: "/api/user/refresh-token",
        method: 'post'
    },
    userDetails :{
        url: "/api/user/user-details",
        method: 'get'
    },
    userLogOut:{
        url : '/api/user/logout',
        method : 'get',
    },
    uploadAvatar:{
        url:"/api/user/upload-avatar",
        method:"put"
    },
    UpdateUser:{
        url:"api/user/update-user",
        method:"put"
    }
}

export default SummaryApi;