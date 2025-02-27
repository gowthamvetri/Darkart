import jwt from 'jsonwebtoken'

export const generatedAccessToken = async(userId)=>{
    const token = await jwt.sign(
        {id: userId},
        process.env.SECRET_KEY_ACCESS_TOKEN,
        {expiresIn:'6h'}
    )

    return token
}
export default generatedAccessToken