"use server"

import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import Error from "next/error"


export async function handleRegisteration(formData:FormData){

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const roll = formData.get('enrollment') as string
    const year = new Date().getFullYear()

    const transporter = nodemailer.createTransport({
       service:'gmail',
       auth:{
        user: process.env.Vihaan_Email,
        pass: process.env.Vihaan_Pass
       }
    })
    
    try {
        // const emailHtml = await render(welcomeEmail({name}))

        await transporter.sendMail({
            from:`" Vihan team " <${process.env.Vihaan_Email}>`,
            to:email,
            subject:`Welcome to Vihan!.Registeration for Vihan ${year} is successfull`,
            // html:emailHtml
        });

        return {success:true};

    } catch (error) {
     console.error("Email error :",error);
     return {success:false} 
    }
}