import nodeMailer from 'nodemailer';


const sendEmail=async (options)=>{

    const trasporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port:465,
        service:"gmail",
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_password,
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mailOptions={
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    }

   await trasporter.sendMail(mailOptions)

}

export default sendEmail