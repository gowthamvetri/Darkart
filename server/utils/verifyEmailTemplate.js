const verifyEmailTemplate = ({name,url})=>{
    return `
    <p>Hello ${name}</p>
    <p>Thank you for Registering through Darkcart</p>
    <a href=${url} style = "color:white;background : blue;margin-top:10px">
    Verify Email
    </a>
    `
}

export default verifyEmailTemplate