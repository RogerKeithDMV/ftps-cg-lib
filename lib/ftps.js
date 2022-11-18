const Client = require('ftp')
const {constants, helpers} = require('utils-nxg-cg');
const {objectFTPSReq,objectFTPSOpt} = require('./objects');
const process = require('process');

module.exports.ftps = async (msg, cfg, test = false) => {
  try {
    const {data} = msg;

    let properties = {...objectFTPSReq};
    let extraProp = {...objectFTPSOpt};

    if (!test && !data) {throw new Error(`${constants.ERROR_PROPERTY} data`);}
      const valid = await helpers.validProperties(properties, data, cfg);

      if (valid) {
        await helpers.validProperties(extraProp, data, cfg, true);
        properties = {...properties, ...extraProp};

        let encoding = 'base64';
        if (properties.encoding) encoding = properties.encoding;
        let flag = properties.flag.toUpperCase();

        var clientConn = new Client();

        clientConn.connect({
          host: properties.host,
          port: properties.port,
          user: properties.username,
          password: properties.password,
          secure: properties.secure,
          secureOptions: { rejectUnauthorized: false }
        });

        if(flag=="GETLISTFILES"){
          return new Promise((resolve, reject)=>{
            clientConn.on('ready', function() {
              clientConn.list(properties.path, function(err, list) {
                if (err){ reject (err); }

                clientConn.end();
                if(!helpers.isObjectValid(list)){
                  throw Error(constants.ERROR_JSON_FORMAT);
                }
                else{
                  resolve ({"response":list, flag: properties.flag});
                }
              });
            }).on("error", function(err) {reject(err)})
          });
        }

        else if(flag=="SAVEFILE"){
          return new Promise((resolve, reject)=>{
            clientConn.on('ready', function() {
              clientConn.put(Buffer.from(properties.content, encoding), properties.file, function (err, resp) {
                if (err) reject (err);

                clientConn.end();
                resolve({"response":"File "+properties.file+" was created successfully.", flag: properties.flag});
              });
            }).on("error", function(err) {reject(err)})
          });
        }

        else if(flag=="GETFILE"){
          return new Promise((resolve, reject)=>{
            clientConn.on('ready', function() {
              clientConn.get(properties.file, function (err, myStream) {
                if (err) reject (err);;

                myStream.once('close', function() { clientConn.end(); });
                let bufs = [];
                myStream.on('data', function(d){ bufs.push(d); });

                myStream.on('end', function(){
                  let buf = Buffer.concat(bufs);
                  clientConn.end();
                  resolve({"response":buf.toString(encoding)+" was created successfully.", flag: properties.flag});
                });
              });
            }).on("error", function(err) {reject(err)})
          });
        }

        else if(flag=="RENAMEFILE"){
          return new Promise((resolve, reject)=>{
            clientConn.on('ready', function() {
              resultFTPS= clientConn.rename(properties.path+properties.oldName, properties.path+properties.newName, function(err, list) {
                if (err){ reject (err); }

                clientConn.end();
                resolve({"response":"File "+properties.oldName+" was successfully renamed to "+properties.newName+".", flag: properties.flag});
              });
            }).on("error", function(err) {reject(err)})
          });
        }

        else if(flag=="DELETEFILE"){
          return new Promise((resolve, reject)=>{
            clientConn.on('ready', function() {
              resultFTPS= clientConn.delete(properties.path+properties.file, function(err, list) {
                if (err){ reject (err); }

                clientConn.end();
                resolve({"response":"File "+properties.file+" was deleted successfully.", flag: properties.flag});
              });
            }).on("error", function(err) {reject(err)})
          });
        }

        else if(flag=="CREATEDIRECTORY"){
          return new Promise((resolve, reject)=>{
            clientConn.on('ready', function() {
              resultFTPS= clientConn.mkdir(properties.path, function(err, list) {
                if (err){ reject (err); }

                clientConn.end();
                resolve({"response":"Directory "+properties.path+" was created successfully.", flag: properties.flag});
              });
            }).on("error", function(err) {reject(err)})
          });
        }

        else if(flag=="DELETEDIRECTORY"){
          return new Promise((resolve, reject)=>{
            clientConn.on('ready', function() {
              clientConn.rmdir(properties.path, { recursive: true }, function (err, list) {
                if (err){ reject (err); }

                clientConn.end();
                resolve({"response":"Directory "+properties.path+" was deleted successfully.", flag: properties.flag});
              });
            }).on("error", function(err) {reject(err)});
          });
        }

        else{
          throw Error ('Invalid value for flag parameter.');
        }
      }
    }

    catch(e){
      throw Error (e.toString());
    }
};