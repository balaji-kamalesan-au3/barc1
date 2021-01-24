import express, { Request, Response } from "express";
import { get, put, post } from 'request-promise';
import Instamojo  from 'instamojo-payment-nodejs';
var request= require('request');


Instamojo.isSandboxMode(true);
Instamojo.setKeys("4aa23ac03493e6e3ea1f3a2605a4c2f9", "a8f60b249ff08f162d1fee779494319a");
export const paymentRouter =express.Router();

paymentRouter.get("/",(req: Request, res: Response) => {
    console.log("Request Recieved");
})

paymentRouter.get("/request/:amount",(req:Request,res :Response) => {
    let amount = req.params.amount
    
    var headers = { 'X-Api-Key': '4aa23ac03493e6e3ea1f3a2605a4c2f9', 'X-Auth-Token': 'a8f60b249ff08f162d1fee779494319a'}
    var payload = {
    purpose: 'FIFA 16',
    amount: '2500',
    phone: '9999999999',
    buyer_name: 'John Doe',
    redirect_url: 'http://www.example.com/redirect/',
    send_email: true,
    webhook: 'http://www.example.com/webhook/',
    send_sms: true,
    email: 'foo@example.com',
    allow_repeated_payments: false}

    request.post('https://www.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
    if(!error && response.statusCode == 201){
        console.log(body);
    }
    if(error) {
        console.log(error)
    }
})
})
   



