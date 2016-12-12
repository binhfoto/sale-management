const fs = require('fs');

let datas = [];

for ( let i = 1; i <= 100; i++){
    let item = `12/9/16,Merchant_${i},1\n`;
    fs.appendFileSync('merchants.csv', item);
}

// fs.writeFileSync('merchants.csv', datas);