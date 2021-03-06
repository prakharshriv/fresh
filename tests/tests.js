var assert=require('assert')
var service=require('../keyObj')
var fs=require('fs')
var obj;
describe('1)instantiate a file at default location',()=>{
    it("new data.json creation at default location", () => { 
        obj=new service()
        assert.strictEqual(fs.existsSync('../data/data.json'),true)

      }); 
})
describe('2)instantiate a file at custom location',()=>{
    it("new data.json creation at custom location", () => { 
        obj=new service('../data.json')
        assert.strictEqual(fs.existsSync('../data.json'),true)

      }); 
})
describe('3)create key of size less that 32 characters',()=>{
    it("key added successfully", (done) => { 
        obj=new service()
        obj.create({key:'abc',value:{1:2}},function(status){
            
            assert.strictEqual(status,true)
            done()
        })

      }); 
})

describe('4)create key of size less that 32 characters and time limit 1 second',()=>{
    it("key added successfully", (done) => { 
        obj=new service()
        obj.create({key:'abcd',value:{1:2},time:1},function(status){
            
            assert.strictEqual(status,true)
            done()
        })

      }); 
})
describe('5)create key of size greater that 32 characters',()=>{
    it("key rejected successfully", (done) => { 
        obj=new service()
        obj.create({key:'abcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',value:{1:2}},function(status){
            
            assert.strictEqual(status,false)
            done()
        })

      }); 
})

describe('6)create key which already exists',()=>{
    it("key rejected successfully", (done) => { 
        obj=new service()
        obj.create({key:'abc',value:{1:2}},function(status){
            
            assert.strictEqual(status,false)
            done()
        })

      }); 
})

describe('7)read key which already exists',()=>{
    it("key rejected successfully", (done) => { 
        obj=new service()
        obj.read('abc',function(status){
            console.log(status.data);
            assert.strictEqual(status.success,true)
            done()
        })

      }); 
})

describe('8)read key which does not exist',()=>{
    it("key rejected successfully", (done) => { 
        obj=new service()
        obj.read('abac',function(status){
            console.log(status.data);
            assert.strictEqual(status.success,false)
            done()
        })

      }); 
})

describe('9)create key of size less that 32 characters that has expired',()=>{
    it("key added successfully", (done) => { 
        obj=new service()
        obj.create({key:'exp',value:{1:2},time:-10},function(status){
            
            assert.strictEqual(status,true)
            done()
        })

      }); 
})

describe('10)read key which has expired',()=>{
    it("key rejected successfully", (done) => { 
        obj=new service()
        obj.read('exp',function(status){
            console.log(status.data);
            assert.strictEqual(status.success,false)
            done()
        })

      }); 
})
describe('11)delete key which has expired',()=>{
    it("key rejected successfully", (done) => { 
        obj=new service()
        obj.delete('exp',function(status){
            console.log(status.data);
            assert.strictEqual(status.success,false)
            done()
        })

      }); 
})
describe('12)delete key which has not expired',()=>{
    it("key deleted successfully", (done) => { 
        obj=new service()
        obj.delete('abc',function(status){
            // console.log(status.data);
            assert.strictEqual(status.success,true)
            done()
        })

      }); 
})