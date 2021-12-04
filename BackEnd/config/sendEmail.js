import nodeMailer from 'nodemailer';


const sendEmail=async (options)=>{

    const trasporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port:465,
        service:"gmail",
        auth:{
            user:"yogeshmech9@gmail.com",
            pass:"Yogi@2610",
        }
    })

    const mailOptions ={
        from:"yogeshmech9@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message,
    }

   await trasporter.sendMail(mailOptions)

}

export default sendEmail