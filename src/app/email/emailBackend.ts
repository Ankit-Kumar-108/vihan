"use server"

import nodemailer from "nodemailer"
import { render } from "@react-email/render"


export async function handleRegisteration(formData:FormData){

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const roll = formData.get('enroll')

}