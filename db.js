const {MongoClient,ServerApiVersion}=require('mongodb')
const URI=process.env.URI
const client=new MongoClient(URI,{
    serverApi:{
        deprecationErrors:true,
        strict:true,
        version:ServerApiVersion.v1
    }
})

async function run() {
    try{
        await client.connect()
        await client.db("admin").command({ping:1})
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    }finally{
        // await client.close()
    }
}
const db=client.db('community')
module.exports={run,db}
