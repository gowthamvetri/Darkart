import { Resend } from 'resend';
import dotenv from 'dotenv'
dotenv.config()


const resend = new Resend(process.env.RESEND_API);

const sendEmail = async({sendTo,subject,html})=>{
    try {
        const { data, error } = await resend.emails.send({
            from: 'Darkart <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
          });
        return data;
        
    } catch (error) {
        console.log(error)
    }
}

export default sendEmail;