'use strict'

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const http = require('http');

async function getProduct() {
    const { data } = await axios.get('https://dummyjson.com/products/1');
    console.log("Get product");
    return data;
}

function updateProductFile(data) {
    data = JSON.stringify(data);
    fs.writeFile(path.resolve(__dirname, 'product.txt'), data, 'utf-8', (err, res) => {
        if (err) {
            throw err;
        }
        console.log("File had updated");
    })
}

http.createServer(async (request, response) => {
    console.log("Server run");
    if (request.url !== '/') {
        response.write("Wrong URL");
        response.end();
    } else {
        response.setHeader("Content-type", "text/html; charset=utf-8;");

        const data = await getProduct();
        updateProductFile(data);

        fs.readFile(path.resolve(__dirname, 'product.txt'), 'utf-8', (err, res) => {
            if (err) {
                throw err;
            }
            
            response.write(res, 'utf-8');
            response.end();
        })
    }

    // response.write("OK", 'utf8', () => { 
    //     console.log("Writing data..."); 
    // })
    // response.end(); 
}).listen(3000);