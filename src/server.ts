
import mongoose from "mongoose";
import app from "./app";
import config from "./config";



async function main() {
    try {
        await mongoose.connect(config.db as string);
       
        
        app.listen(config.port, () => {
            console.log(`Parcel server is running ${config.port}`)
          })
    } catch (error:any) {
        throw new Error(error)
    }
  
   
  }


  main()