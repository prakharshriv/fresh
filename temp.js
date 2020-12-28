const fs=require('fs')
let loc='./data.json'
let data={'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa': 1,
'baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa': 2
}
fs.writeFile(loc,JSON.stringify(data,null,2),function(err){
    // console.log(result);  
    console.log(err);
    fs.readFile(loc,function(err,d){
        console.log(err);
        console.log(JSON.parse(d));
    })
})
console.log(Buffer.from(JSON.stringify(data)).length/1000 )


