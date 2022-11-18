/**
 * Object who contains the required properties of the sftp component.
 */
 const objectFTPSReq = {
    host:null,
    port:null,
    username:null,
    password:null,
    secure:null,
    flag:null
};

/**
 * Object who contains the optionals properties of the sftp component.
 */

const objectFTPSOpt = {
    path:null,
    file:null,
    content:null,
    encoding:null,
    newName:null,
    oldName:null
};

module.exports = {
    objectFTPSReq,
    objectFTPSOpt
}