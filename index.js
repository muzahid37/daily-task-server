const express = require('express');
const cors=require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT||5000;
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://daily_task_admin:55L7VQez!eCr4Lq@cluster0.0glbt.mongodb.net/?retryWrites=true&w=majority";
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
        await client.connect();
        const taskCollection = client.db("daily_task").collection("tasks");
        app.get("/task", async (req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
          });
          app.post("/task", async (req, res) => {
            const task = req.body;
            console.log(task)
            const result = await taskCollection.insertOne(task);
            res.send(result);
          });
        //   app.put('/task', async (req, res) => {
        //     const _id = req.params._id;
        //     const taskState=await taskCollection.findOne({_id});
        //     if(taskState.role==="complited"){
        //      const filter = { _id: _id };
             
        //      const updateDoc = {
        //        $set:{role:'complited'},
        //      };
        //     const result = await usersCollection.updateOne(filter, updateDoc);
           
        //     res.send(result);
        //     }
            
        //   });
        app.get("/task/:id", async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: ObjectId(id) };
            const purchase = await taskCollection.findOne(query);
            res.send(purchase);
          });
       
        app.patch("/task/:id",async (res,req)=>{
          try{
            const id=req.params._id
            console.log(id);
            const edit=req.body
            const result=await taskCollection.findOneAndUpdate(id,edit,);
            res.result(result);
          }catch(error){
            console.log(error.message)
          }
           
        })
    }
    finally{

    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from daily task')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// daily_task_admin
// 55L7VQez!eCr4Lq