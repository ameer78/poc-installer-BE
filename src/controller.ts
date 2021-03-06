import * as Joi from 'joi'
import { promises as fs } from 'fs';
import Pusher from "pusher";

interface UserInfo {
    email: string;
    firstName: string;
    lastName: string;
    OS: string;
    company: string;
}

const pusher = new Pusher({
    appId: "1355399",
    key: "a6bf9c4971a0d7431a7b",
    secret: "45298973656f0232d01b",
    cluster: "ap2",
});

const getValidationSchema =  (payload: UserInfo) => {
    const querySchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        OS: Joi.string().required(),
        company:Joi.string().required(),
    })
    return querySchema.validate(payload);
}
const timeout = (ms:number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const writeToFile = async(payload: UserInfo) => {
    let percent = 0;
    const msgs = [
        'Environment was created successfully',
        'Moving files from src to destination folder',
        'Creating Profile in the app data',
        'Profile was created',
        'Installing Drivers',
        'Drivers successfully installed',
        'Create History and logs',
        'Logs Created',
        'Creating shortcuts',
        'Congrats! Installation finished successfully'
    ]
    for(let i =0 ; i < 10; i++){
        await timeout(2000);
        percent += 10;
        console.log(percent + "%")
        pusher.trigger('install', 'progress', {
            percent,
            message: msgs[i]
        });
    }

    const d = new Date();

    await fs.writeFile(`test${d.getFullYear()+d.getMonth()+d.getTime()}.txt`, JSON.stringify(payload));
}

export const install = async (req: any, res: any, next: any) => {
    try{
        const validOrNot = getValidationSchema(req.body);
        if(validOrNot.error){
           return res.status(403).json({
                error: validOrNot.error
            })
        }

        await writeToFile(req.body); // Desktop Operation...


        return res.status(200).json({
            status:"success",
            message:"file was created successfully"
        })
    }catch(err){
        return res.status(500).json({
            error: "server error",
            message: err.message
        });
    }

};

