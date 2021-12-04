import crypto from "crypto";

function getresetpasswprdtoken(){

    const resettoken=crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resettoken).digest("hex")

this.resetPasswordExpire=Date.now()+15*60*1000;

return resettoken;
}

export default getresetpasswprdtoken