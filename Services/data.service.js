//import JWT token
const jwt=require('jsonwebtoken');

//database
userDetails={
    1000:{acno:1000,username:'Sreerag',password:1000,balance:1000,transaction:[]},
    1001:{acno:1001,username:'Dipin',password:1001,balance:2000,transaction:[]},
    1002:{acno:1002,username:'Jerit',password:1002,balance:900,transaction:[]},
    1003:{acno:1003,username:'Anand',password:1003,balance:3000,transaction:[]},
    1004:{acno:1004,username:'Akash',password:1004,balance:6000,transaction:[]},
    1005:{acno:1005,username:'Adwaith',password:1005,balance:4000,transaction:[]},
    1006:{acno:1006,username:'Vishnu',password:1006,balance:900,transaction:[]},
    
  }
register=(acno,username,password)=>{
  
    if(acno in userDetails){
      return {
        status:false,
        statusCode:400,
        message:'User already registered'
      }
    }
    else{
      userDetails[acno]={
        acno:acno,
        username:username,
        password:password,
        balance:0,
        transaction:[]
      }
      console.log(userDetails);
    
      return{
        status:true,
        statusCode:200,
        message:'Register successfull'
      }
    }
  }
  login=(acno,pswd)=>{
    
    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        currentUser=userDetails[acno]['username']
        currentAcno=userDetails[acno]['acno']
        //To generate token
        try{
          const token=jwt.sign({currentAcno:acno},'superkey2001')
          return {
            status:true,
            statusCode:200,
            message:'login successful',
            token:token
          }
        }
       catch{
        res.status(422).json({
          statusCode:422,
          status:false,
          message:'login failed........Please login again',
        })
       }
      }
      else{
        return{
          status:false,
          statusCode:400,
          message:'password incorrect'
        }
      }
    }
    else{
      return {
        status:false,
        statusCode:400,
        message:'Invalid userdetails'
      }
    }
  }
  deposit=(acno,pswd,amt)=>{
    var amount=parseInt(amt)
    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        userDetails[acno]['balance']+=amount;
       userDetails[acno]['transaction'].push({
          Type:'Credit',
          Amount:amount
        })
        console.log(userDetails);
        return {
          status:true,
          statusCode:200,
          message:`${amount} is credited Balance: ${userDetails[acno]['balance']}`
        }
      }
      else{
        // alert('password incorrect');
        return {
          status:false,
          statusCode:400,
          message:'password incorrect'
        }
      }
    }
    else{
      // alert('invalid userDetails');
      return {
        status:false,
        statusCode:400,
        message:'Invalid userdetails'
      }
    }
  }
  withdraw=(acno,pswd,amt)=>{
    var amount=parseInt(amt)
    if(acno in userDetails){
      if(userDetails[acno]['password']){
        if(userDetails[acno]['balance']>=amount){
          userDetails[acno]['balance']-=amount;
          userDetails[acno]['transaction'].push({
            Type:'Debit',
            Amount:amount
          })
          console.log(userDetails);
          return {
            status:true,
            statusCode:200,
            message:`${amount} is debited Balance: ${userDetails[acno]['balance']}`
          }
        }
        else{
          // alert('Insufficient funds')
          return {
            status:false,
            statusCode:400,
            message:'Insufficient funds'
          }
        }
      }
      else{
        // alert('password incorrect')
        return {
          status:false,
          statusCode:400,
          message:'password incorrect'
        }
      }
    }
    else{
      // alert('invalid userDetails')
      return {
        status:false,
        statusCode:400,
        message:'invalid userDetails'
      }
    }
  }
  getTransaction=(acno)=>{
    return {
      status:true,
        statusCode:200,
      transaction:userDetails[acno]['transaction']
    }
  }
  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction
  }