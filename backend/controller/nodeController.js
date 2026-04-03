import { Node } from "../model/nodeModel.js";
import nodemailer from 'nodemailer'

export const nodeMailer = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //save database
        const mailData = await Node.create({
            name,
            email,
            message
        })

        // Nodemailer Setup
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        })

        //EMAIL CONTENT
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            replyTo: email,
            subject: "📩 New Blog Message",
            html: `
            <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
                <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
                    
                    <h2 style="color:#4f46e5; text-align:center;">🔔 New Contact Message</h2>
                    
                    <hr style="margin:20px 0;" />

                    <p><strong>👤 Name:</strong> ${name}</p>
                    <p><strong>📧 Email:</strong> ${email}</p>

                    <div style="margin-top:15px;">
                        <p><strong>💬 Message:</strong></p>
                        <p style="background:#f9fafb; padding:10px; border-radius:6px; line-height:1.6;">
                            ${message}
                        </p>
                    </div>

                    <hr style="margin:20px 0;" />

                    <p style="font-size:12px; color:gray; text-align:center;">
                        This message was sent from your website contact form 🚀
                    </p>
                </div>
            </div>
            `
        };
        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "Mail sent successfully",
            data: mailData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}