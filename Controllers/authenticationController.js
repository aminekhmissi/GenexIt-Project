const Customer = require("../Models/Customer");
const User = require("../Models/User");
const Owner = require("../Models/Owner");
const bcrypt = require("bcrypt");
const { randomBytes } = require("crypto");
const { join } = require("path");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const DOMAIN = process.env.APP_DOMAIN;
const SECRET = process.env.APP_SECRET;

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d9ca72c3cda801",
    pass: "5990b50fd44d7f",
  },
});
var tokenList = {};

module.exports = {
  async registerAdmin(req, res) {
    try {
      const password = bcrypt.hashSync(req.body.password, 10);
      const admin = new User({
        ...req.body,
        password,
        role: "Admin",
        verified: true,
      });
      await admin.save();
      res.status(200).json({
        status: 200,
        message: "Admin created !",
        data: admin,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        msg: "failed to create Admin",
        error: error.message,
      });
    }
  },

  async registerCustomer(req, res) {
    var { errors, isValid } = validateUser(req.body)
    try {
      req.body["photo"] = req.file.filename;
      const password = bcrypt.hashSync(req.body.password, 10); //cryptage 10 fois
      const newCustomer = new Customer({
        ...req.body,
        password,
        role: "Customer",
        verificationCode: randomBytes(6).toString("hex"), // 6 bits hexadecimal
      });
      if (!isValid) {
        res.status(404).json(errors)
      } else {
        await newCustomer.save();
        res.status(200).json({
          message: "Customer created !! check your email to be verified!!",
        });
        await transport.sendMail(
          {
            to: newCustomer.email, //receivers
            subject: "welcome :" + newCustomer.fullname,
            text: "bonjour !",
            html: `
                      <!DOCTYPE html>
                          <html lang="en">
                          <head>
                              <meta charset="UTF-8">
                              <meta http-equiv="X-UA-Compatible" content="IE=edge">
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <title>Document</title>
                          </head>
                          <body>
                              

                              <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tr>
        <td bgcolor="#FFA73B" align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                        <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome ${newCustomer.fullname}!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;">${newCustomer.email},We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" align="left">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                    <table border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="${DOMAIN}verifyAccount/${newCustomer.verificationCode}"  target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">
                                            Confirm Account</a></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr> <!-- COPY -->
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                    </td>
                </tr> <!-- COPY -->
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;"><a href="${DOMAIN}verifyAccount/${newCustomer.verificationCode}"  target="_blank" style="color: #FFA73B;">href="${DOMAIN}verifyAccount/${newCustomer.verificationCode}" </a></p>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;">Cheers,<br>GoSnippets Team</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                        <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                        <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
                             </table>
                          </body>
                          </html>`,
          },
          (err, sent) => {
            if (err) {
              console.log(err.message + " not sent ");
            } else {
              console.log("email sent");
            }
          }
        )
      };
    } catch (error) {
      res.status(404).json({
        msg: "failed to create a customer !!",
        error: error.message,
      });
    }
  },
  async registerOwner(req, res) {
    try {
      req.body["photo"] = req.file.filename;
      const password = bcrypt.hashSync(req.body.password, 10); //cryptage 10 fois
      const newOwner = new Owner({
        ...req.body,
        password,
        role: "Owner",
        verificationCode: randomBytes(6).toString("hex"), // 6 bits hexadecimal
      });
      await newOwner.save();
      res.status(200).json({
        message: "Owner created !! check your email to be verified!!",
      });
      await transport.sendMail(
        {
          to: newOwner.email, //receivers
          subject: "welcome :" + newOwner.fullname,
          text: "bonjour !",
          html: `
                      <!DOCTYPE html>
                          <html lang="en">
                          <head>
                              <meta charset="UTF-8">
                              <meta http-equiv="X-UA-Compatible" content="IE=edge">
                              <meta name="viewport" content="width=device-width, initial-scale=1.0">
                              <title>Document</title>
                          </head>
                          <body>
                              

                              <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <!-- LOGO -->
                           <tr>
        <td bgcolor="#FFA73B" align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                        <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome ${newOwner.fullname}!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;">${newOwner.email},We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" align="left">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                    <table border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="${DOMAIN}verifyAccount/${newOwner.verificationCode}"  target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">
                                            Confirm Account</a></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr> <!-- COPY -->
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                    </td>
                </tr> <!-- COPY -->
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;"><a href="${DOMAIN}verifyAccount/${newOwner.verificationCode}"  target="_blank" style="color: #FFA73B;">href="${DOMAIN}verifyAccount/${newOwner.verificationCode}" </a></p>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0;">Cheers,<br>GoSnippets Team</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                        <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                        <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
                              </table>
                          </body>
                          </html>`,
        },
        (err, sent) => {
          if (err) {
            console.log(err.message + " not sent ");
          } else {
            console.log("email sent");
          }
        }
      );
    } catch (error) {
      res.status(404).json({
        msg: "failed to create an owner !!",
        error: error.message,
      });
    }
  },
  //user email verification method
  async verifyEmail(req, res) {
    try {
      const user = await User.findOne({
        verificationCode: req.params.verifyCode,
      });
      user.verified = true;
      user.verificationCode = undefined;
      user.save();
      res.sendFile(join(__dirname, "../Templates/success.html"));
    } catch (error) {
      res.sendFile(join(__dirname, "../Templates/error.html"));
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(404).json({
          message: "not logged",
        });
      } //if user exists or not
      if (user.verified === true) {
        //checking account verification
        const passwordCompare = bcrypt.compareSync(
          req.body.password,
          user.password
          //comparison between the hashed password and the entered password
        );
        if (!passwordCompare) {
          res.status(404).json({
            message: "password incorrect",
          });
        }
        //create a token:
        const token = jwt.sign({ user: user, id: user._id }, SECRET, {
          expiresIn: "24h",
        });
        //create a refresh token:
        const refreshtoken = jwt.sign({ user: user, id: user._id }, SECRET, {
          expiresIn: "48h",
        });
        tokenList[refreshtoken] = token;
        const result = {
          email: user.email,
          user: user,
          token: token,
          refreshtoken: refreshtoken,
        };
        res.status(200).json({
          message: "logged",
          ...result,
        });
      } else {
        res.status(404).json({
          message: "user not verified",
        });
      }
    } catch (error) {
      res.status(404).json({
        msg: "error to logged !!",
        error: error.message,
      });
    }
  },
  async logout(req, res) {
    try {
      var refreshtoken = req.body.refreshtoken;
      if (refreshtoken in tokenList) {
        delete tokenList[refreshtoken];
      }
      res.status(200).json({
        status: 200,
        message: "Logout account success",
        data: tokenList,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        error: error.message,
        message: "Logout account failed",
        data: tokenList,
      });
    }
  },
  async profile(req, res) {
    try {
      const user = req.user;
      res.status(200).json({
        status: 200,
        message: "checking profile successfully",
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: "user not found",
        error: error.message,
      });
    }
  },
  async updateProfile(req, res) {
    try {
      await User.findByIdAndUpdate({ _id: req.user._id }, req.body);
      res.status(200).json({
        status: 200,
        message: "profile updated successfully!!",
        data: await User.findById({ _id: req.user._id }),
      });
    } catch (error) {
      res.status(404).json({
        message: "update profile failed ",
        error: error.message,
      });
    }
  },
  async forgetPassword(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(404).json({
          status: 404,
          message: "email not found",
        });
      } else {
        if (user.verified === true) {
          const token = jwt.sign({ user: user, id: user._id }, SECRET, {
            expiresIn: "24h",
          });
          user.verificationPassword = token;
          user.save();
          res.status(200).json({
            message: "check out your email please !",
            data: user,
          });
          transport.sendMail(
            {
              to: user.email, //receivers
              subject: "welcome " + user.fullname,
              text: "bonjour  !",
              html: `
                    <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                        </head>
                        <body>
                            <h2>hello ${user.fullname} </h2>
                            <p>${user.email}  </p>
                            <a href="http://localhost:4200/resetpassword/${token}">click to reset your password </a>
                       
                        </body>
                        </html>`,
            },
            (err, sent) => {
              if (err) {
                console.log(err.message + " not sent ");
              } else {
                console.log("forgetPassword:email sent");
              }
            }
          );
        } else {
          res.status(404).json({
            message: "email not verified",
          });
        }
      }
    } catch (error) {
      res.status(404).json({
        message: "forget password failed !!",
        error: error.message,
      });
    }
  },
  async resetPassword(req, res) {
    try {
      const resetPasswordToken = req.params.token;
      if (resetPasswordToken) {
        jwt.verify(resetPasswordToken, SECRET, async (err) => {
          if (err) {
            return res.json({ error: "incorrect token or it is expired" });
          }
          const user = await User.findOne({
            verificationPassword: resetPasswordToken,
          });
          user.password = bcrypt.hashSync(req.body.password, 10);
          user.verificationPassword = undefined;
          user.save();
          return res.status(200).json({
            status: 200,
            message: "password has been changed",
          });
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "reset password failed",
        error: error.message,
      });
    }
  },
};
