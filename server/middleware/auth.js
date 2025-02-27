import jwt from 'jsonwebtoken'

export const auth = async(req,res,next)=>{
    try {
        
        const token = req.cookies.accessToken || req?.header?.authorization?.split(" ")[1]

        if(!token){
            res.status(401).json({
                message: "Provide a valid access token",
                error : true,
                success :false
            })
        }

        const decode = jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)

        if(!decode){
            return res.status(401).json({
                message : "Provided token expired",
                error : true,
                success : false
            })
        }

        req.userId = decode.id
        next()

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}