import 'dotenv/config'; 
import mongoose from 'mongoose';

async function connectToDB() {
    try{
        await mongoose.connect(process.env.DBURL);
        console.log("DB is connected");
    }catch(err){
        console.log(`error in db connection ${err}`);
    }
}

export{connectToDB};