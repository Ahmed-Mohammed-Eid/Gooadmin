// import nodeMAILER
const nodemailer = require("nodemailer");

// initialize node mailer with my sendinblue data
const transporter = nodemailer.createTransport({
    host: process.env.SENDINBLUE_SMTP_SERVER,
    port: process.env.SENDINBLUE_SMTP_PORT,
    auth: {
        user: process.env.SENDINBLUE_SMTP_KEY_NAME,
        pass: process.env.SENDINBLUE_SMTP_KEY_VALUE,
    },
});

const SendAMB_Email = function (email, firstName, lastName, code) {
    const Template = `<body width="100%"
    style="margin: 0 auto !important;padding: 0 !important;mso-line-height-rule: exactly;background-color: #f1f1f1;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #f1f1f1;font-family: 'Lato', sans-serif;font-weight: 400;font-size: 15px;line-height: 1.8;color: rgba(0, 0, 0, .4);height: 100% !important;width: 100% !important;">
    <center style="width: 100%;background-color: #f1f1f1;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        <div
            style="display: none;font-size: 1px;max-height: 0px;max-width: 0px;opacity: 0;overflow: hidden;mso-hide: all;font-family: sans-serif;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        </div>
        <div style="max-width: 600px;margin: 0 auto;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%; border-radius: 10px; padding-top: 50px"
            class="email-container">
            <table style="box-shadow: 0 0 4px rgb(0 0 0 / 16%); margin-top: 30px;" align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                style="margin: auto;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;">
                <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <td valign="top" class="bg_white"
                        style="padding: 1em 2.5em 0 2.5em;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #ffffff;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
                            style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <td class="logo"
                                    style="text-align: center;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                    <h1
                                        style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Lato', sans-serif;color: #000000;margin-top: 0;font-weight: 400;margin: 0;">
                                        <a href="#"
                                            style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-decoration: none;color: #c742f0;font-size: 24px;font-weight: 700;font-family: 'Lato', sans-serif;">GOOADMIN</a>
                                    </h1>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <td valign="middle" class="hero bg_white"
                        style="padding: 2em 0 4em 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #ffffff;position: relative;z-index: 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                        <table
                            style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <td
                                    style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                    <div class="text"
                                        style="padding: 0 2.5em;text-align: center;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: rgba(0, 0, 0, .3);">
                                        <h2
                                            style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Lato', sans-serif;color: #000;margin-top: 0;font-weight: 400;font-size: 40px;margin-bottom: 0;line-height: 1;">
                                            Please verify your email</h2>
                                        <h3
                                            style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Lato', sans-serif;color: #000000;margin-top: 0;font-weight: 300;font-size: 24px;">
                                            Your Verification code is:</h3>
                                        <h2
                                            style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Lato', sans-serif;color: #000;margin-top: 0;font-weight: 400;font-size: 40px;margin-bottom: 0;line-height: 1.4;">
                                            <span
                                                style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-weight: 600;color: #c742f0;"><a href="${(code && code.includes('http') ? code : '#')}">${code}</a></span>
                                        </h2>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>`;

    // Mail Options
    const mailOptions = {
        from: {
            name: "GOOADMIN",
            address: "Admin@gooadmin.com",
        },
        to: {
            name: `${firstName} ${lastName}`,
            address: email,
        },
        subject: "Confirmation Code",
        text: `Thank you for joining our family, ${firstName} ${lastName}. your confirmation code is: ${code}`,
        html: Template,
    };

    // Send the mail
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log("Error Occurs", err);
        } else {
            // console.log(data)
        }
    });
};

const SendAMB_Reset_Link = function (email, firstName, lastName, link) {
    const Template = `<body width="100%"
    style="margin: 0 auto !important;padding: 0 !important;mso-line-height-rule: exactly;background-color: #f1f1f1;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #f1f1f1;font-family: 'Lato', sans-serif;font-weight: 400;font-size: 15px;line-height: 1.8;color: rgba(0, 0, 0, .4);height: 100% !important;width: 100% !important;">
    <center style="width: 100%;background-color: #f1f1f1;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        <div
            style="display: none;font-size: 1px;max-height: 0px;max-width: 0px;opacity: 0;overflow: hidden;mso-hide: all;font-family: sans-serif;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        </div>
        <div style="max-width: 600px;margin: 0 auto;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%; border-radius: 10px; padding-top: 50px"
            class="email-container">
            <table style="box-shadow: 0 0 4px rgb(0 0 0 / 16%); margin-top: 30px;" align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                style="margin: auto;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;">
                <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <td valign="top" class="bg_white"
                        style="padding: 1em 2.5em 0 2.5em;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #ffffff;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
                            style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <td class="logo"
                                    style="text-align: left;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                    <h1
                                        style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Lato', sans-serif;color: #000000;margin-top: 0;font-weight: 400;margin: 0;">
                                        <a href="#"
                                            style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-decoration: none;color: #c742f0;font-size: 24px;font-weight: 700;font-family: 'Lato', sans-serif;">GOOADMIN</a>
                                    </h1>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <td valign="middle" class="hero bg_white"
                        style="padding: 2em 0 4em 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #ffffff;position: relative;z-index: 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                        <table
                            style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <td
                                    style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                    <div class="text"
                                        style="padding: 0 2.5em;text-align: left;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: rgba(0, 0, 0, .3);">
                                        <h2
                                            style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Lato', sans-serif;color: #000;margin-top: 0;font-weight: 400;font-size: 20px;margin-bottom: 0;line-height: 1;">
                                            Please verify your email</h2>
                                        <h3
                                            style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Lato', sans-serif;color: #000000;margin-top: 0;font-weight: 300;font-size: 24px;">
                                            Your Password Reset Link:</h3>
                                        <h2
                                            style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Lato', sans-serif;color: #000;margin-top: 0;font-weight: 400;font-size: 40px;margin-bottom: 0;line-height: 1;">
                                            <span
                                                style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size: 16px;font-weight: 600;color: #c742f0;">${link}</span>
                                        </h2>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>`;

    // Mail Options
    const mailOptions = {
        from: {
            name: "GOOADMIN",
            address: "Admin@gooadmin.com",
        },
        to: {
            name: `${firstName} ${lastName}`,
            address: email,
        },
        subject: "Confirmation Message",
        text: `Thank you for joining our family, ${firstName} ${lastName}. your reset link is ${link}`,
        html: Template,
    };

    // Send the mail
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log("Error Occurs", err);
        } else {
            console.log("Email sent!!!");
        }
    });
};

export {SendAMB_Reset_Link};
export default SendAMB_Email;


