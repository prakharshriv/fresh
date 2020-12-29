const fs=require('fs')
let loc='./data.json'
var service=require('./keyObj')
console.log('obj');
var obj=new service()
// obj.create('abc',{1:2},(status)=>{
//     console.log(status);
// })