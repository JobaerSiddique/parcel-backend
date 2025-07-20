import z from "zod";


const createLogin  = z.object({
    body:z.object({
        email:z.string({message:"email is Required"}).email({message:"Invaild Email Format"}),
        password:z.string({message:"Password Must be required"})
    })
})


export const AuthZod = {
    createLogin
}