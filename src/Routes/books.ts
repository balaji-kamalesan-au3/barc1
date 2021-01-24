import express, { Request, Response } from "express";
import { get, put, post } from 'request-promise';

export const bookRouter =express.Router();

let bookData = [];
let bookImageData = [];
let combinedData = [];

let serverReady = false;

const combineBookandImage = (imageJson,book) => {
    let newBook = {...book};
    newBook.Image = imageJson.Image;
    return newBook;
}

export let fetchData = function(){
    get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json")
        .then(data => bookData = JSON.parse(data))
        .then(() => {
            get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/bookimage816b123.json")
                .then((data) => bookImageData = JSON.parse(data))
                .then(() => {
                    combinedData = bookData.map(book => {
                        let bookImage = bookImageData[Math.floor(Math.random() * Math.floor(10))];
                        return combineBookandImage(bookImage,book);
                    })                    
                })
                .then(() => serverReady = true)
                .catch(err => {
                    console.log("Error",err);
                })
        })
        .catch(err => console.log("Fetch Failed"))
}

interface Book {

        bookID : Number,
        title : string,
        authors : string,
        average_rating : number,
        isbn : number,
        language_code : string,
        price : number,
        ratings_count : number
      
}

bookRouter.get("/getAllBooks", (req : Request, res : Response) => {
    if(serverReady){
        res.json(combinedData);
    }
    else{
        res.json({
            statusCode :503,
            message : "Server Busy try again after sometime"
        })
    }   
})