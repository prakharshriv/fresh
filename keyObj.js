const fs = require('fs')
let data;
let loc = './data.json';
class service {
    constructor() {
        fs.writeFile(loc, JSON.stringify(data, null, 2), function (err) {
            if (err) {
                console.log('error! could not create file')
                console.log(err);
            }
            else
                console.log('File instantiated at default location');

        })
    }
    constructor(location) {
        loc = location
        fs.writeFile(loc, JSON.stringify(data, null, 2), function (err) {
            if (err) {
                console.log('error! could not create file')
                console.log(err);
            }
            else
                console.log('File instantiated at provided location');

        })
    }

    create(key, value, time, callback) {
        key = new String(key)
        if (key.length > 32) {
            console.log('key length exceeds 32 characterrs')
            callback(false)
        }
        else if (Buffer.from(JSON.stringify(data)).length / 1000 > 16) {
            console.log('value size exceeds 16KB')
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

                if (data.hasOwnProperty(key)) {
                    console.log('key already exists');
                    callback(false)
                }
                else {
                    let now = new Date()
                    data[key] = {
                        value: value,
                        time: time,
                        created: now
                    }
                    fs.writeFile(loc, JSON.stringify(data, null, 2), function (err) {
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

    }
    
    read(key) {

    }
    delete(key) {

    }
}