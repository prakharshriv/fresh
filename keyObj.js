const fs = require('fs')
let data = {};
let loc = __dirname + '/data/data.json';

module.exports = class service {
    constructor(location) {

        if (location)
            loc = location
        console.log(loc);
        fs.writeFileSync(loc, JSON.stringify(data, null, 0), function (err) {
            if (err) {
                console.log('error! could not create file')
                console.log(err);
            }
            else
                console.log('File instantiated at location:' + loc);

        })
    }

    create(parameters, callback) {
        var strkey = new String(parameters.key)
        if (strkey.length > 32) {
            console.log('key length exceeds 32 characterrs')
            callback(false)
        }
        else if (Buffer.from(JSON.stringify(parameters.value)).length / 1000 > 16) {
            console.log('value size exceeds 16KB')
            callback(false)
        }
        else {
            fs.stat(loc, (err, stats) => {
                if (err) {
                    console.log('some unexpected error occured in finding out the size of file');
                    console.log(err);
                    callback(false)
                }
                if ((stats.size + Buffer.from(JSON.stringify(parameters.value)).length) / (1024 * 1024 * 1024) > 1) {
                    console.log('cannot add this key-value as file size will exceed 1GB');
                    callback(false)

                }
                else {
                    fs.readFile(loc, function (err, readData) {
                        if (err) {
                            console.log('some unexpected error occured in reading file');
                            console.log(err);
                            callback(false)
                        }

                        data = JSON.parse(readData)

                        if (data.hasOwnProperty(strkey)) {
                            console.log('key already exists');
                            callback(false)
                        }
                        else {

                            let now = new Date()
                            if (parameters.time) {
                                data[strkey] = {
                                    value: parameters.value,
                                    time: parameters.time,
                                    created: now
                                }
                            }
                            else
                                data[strkey] = {
                                    value: parameters.value,
                                    time: -1,
                                }
                            fs.writeFile(loc, JSON.stringify(data, null, 0), function (err) {
                                if (err) {
                                    console.log('error! could not create file')
                                    console.log(err);
                                    callback(false)
                                }
                                else {
                                    console.log('Data added successfully!');
                                    callback(true)
                                }

                            })

                        }
                    })
                }
            })


        }

    }
    // create(key, value, callback) {
    //     key = new String(key)
    //     if (key.length > 32) {
    //         console.log('key length exceeds 32 characterrs')
    //         callback(false)
    //     }
    //     else if (Buffer.from(JSON.stringify(value)).length / 1024 > 16) {
    //         console.log('value size exceeds 16KB')
    //         callback(false)
    //     }
    //     else {
    //         fs.stat(loc, (err, stats) => {

    //             if (err) {
    //                 console.log('error in finding file size');
    //                 callback(false)
    //             }
    //             else if ((stats.size + Buffer.from(JSON.stringify(value)).length) / (1024 * 1024 * 1024) > 1) {
    //                 console.log('cannot add this key-value as file size will exceed 1GB');
    //                 callback(false)

    //             }
    //             else {

    //                 fs.readFile(loc,'utf-8', function(err, readData) {

    //                     if (err) {
    //                         console.log('some unexpected error occured in reading file');
    //                         console.log(err);
    //                         callback(false)
    //                     }

    //                     data = JSON.parse(readData)

    //                     if (data.hasOwnProperty(key)) {
    //                         console.log('key already exists');
    //                         callback(false)
    //                     }
    //                     else {
    //                         let now = new Date()
    //                         data[key] = {
    //                             value: value,
    //                             time: -1,

    //                         }
    //                         fs.writeFile(loc, JSON.stringify(data, null, 2), function (err) {
    //                             if (err) {
    //                                 console.log('error! could not create file')
    //                                 console.log(err);
    //                                 callback(false)
    //                             }
    //                             else {
    //                                 console.log('Data added successfully!');
    //                                 callback(true)
    //                             }

    //                         })
    //                     }
    //                 })

    //             }
    //         })


    //     }

    // }
    read(key, callback) {
        if (key.length > 32) {
            console.log('input key should contain less than 32 characters');
            callback({ success: false, data: {} })
        }
        else {
            fs.readFile(loc, (err, readData) => {
                if (err) {
                    console.log('some unexpected error occured in reading file');
                    console.log(err);
                    callback({ success: false, data: {} })
                }

                data = JSON.parse(readData)
                if (data.hasOwnProperty(key)) {
                    if (data[key].time && data[key].time != -1 && this.checkExpiry(data[key].created, data[key].time)) {
                        console.log('key has expired.please try some other key');

                        callback({ success: false, data: {} })

                    }
                    else {
                        callback({ success: true, data: data[key].value })
                    }
                }
                
            
                else {
                    console.log('element not found');
                    callback({ success: false, data: { } })
                }
            })
    }
}
delete (key, callback) {
    if (key.length > 32) {
        console.log('input key should contain less than 32 characters');
        callback({ success: false, })
    }
    else {
        fs.readFile(loc,  (err, readData)=> {
            if (err) {
                console.log('some unexpected error occured in reading file');
                console.log(err);
                callback({ success: false, })
            }

            data = JSON.parse(readData)
            if (data.hasOwnProperty(key)) {
                if (data[key].time && data[key].time != -1 && this.checkExpiry(data[key].created, data[key].time)) {
                    console.log('key has expired.please try some other key');

                    callback({ success: false, data: {} })

                }
                else if (delete data[key]) {
                    
                    fs.writeFile(loc, JSON.stringify(data, null, 0), function (err) {
                        if (err) {
                            console.log('error! could not write to file')
                            console.log(err);
                            callback({ success: false })
                        }
                        else {
                            console.log('Data deleted successfully!');
                            callback({ success: true })
                        }

                    })
                }
                else {
                    console.log('could  not delete key');
                    callback({ success: false })
                }
            }
            else {
                console.log('key does not exist');
                callback({ success: false })
            }
        })
    }
}
checkExpiry(created, time){
    var now = new Date()
    var limit = new Date(created)

    limit.setSeconds(limit.getSeconds() + time)
    if (now.getTime() > limit.getTime()) {
        // console.log('key has expired.please try some other key');
        return true
    }
    else
        return false
}
}

