//server creation

//1 import express
const express=require('express')

//import dataService
const dataService=require('./Services/data.service')

//import cors
const cors=require('cors')



//2 creating an appliccation for express
const app=express()

//to parse json from request body
app.use(express.json())//type conversion

//Give command to share data via cors

app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:8080']
}))

//3 Create port number
app.listen(3000,()=>{
    console.log('listening on port number 3000');
})
const jwt=require('jsonwebtoken')
//Application specific middleware
const appMiddleware=(req,res,next)=>{
    console.log('Application specific middleware');
    next();
}
app.use(appMiddleware)

//Router specific middleware
const jwtMiddleware=(req,res,next)=>{
    console.log('Router specific middleware');
    const token=req.headers['x-access-token']//tdfdeegedeygeggygdegge
    //verify token-verify()
    const data=jwt.verify(token,'superkey2001')
    console.log(data);
    next();
}
//resolving http request
// app.get('/',(req,res)=>{
//     res.send('hello world');
// })

// app.post('/',(req,res)=>{
//     res.send('post httprequest');
// })

// app.delete('/',(req,res)=>{
//     res.send('delete http request');
// })

// app.put('/',(req,res)=>{
//     res.send('put http request');
// })

// app.patch('/',(req,res)=>{
//     res.send('patch http request');
// })



//API call
//Registration request
app.post('/register',(req,res)=>{
    console.log(req.body);
dataService.register(req.body.acno,req.body.username,req.body.password)//data
.then(result=>{
    res.status(result.statusCode).json(result)
})//access
   
})

//login request
app.post('/login',(req,res)=>{
    console.log(req.body);
   dataService.login(req.body.acno,req.body.password)//access
   .then(result=>{
    res.status(result.statusCode).json(result)
   })
   
})

//deposit request
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
   dataService.deposit(req.body.acno,req.body.password,req.body.amount)//access
   .then(result=>{
    res.status(result.statusCode).json(result)
   })
   
})
//withdraw request
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.acno,req.body.password,req.body.amount)//access
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})
//transaction request
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
 dataService.getTransaction(req.body.acno)//access
 .then(result=>{
    res.status(result.statusCode).json(result)
 })
    
})
//delete request
app.delete('/deleteAcc/:acno',(req,res)=>{
 dataService.deleteAcc(req.params.acno)//access
 .then(result=>{
    res.status(result.statusCode).json(result)
 })
    
})
