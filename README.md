[![N|Solid](https://cloudgensys.com/cg-demo/wp-content/uploads/2019/05/CG-Logo-01.png)](https://www.cloudgensys.com/)

# ftps-cg-lib

https://github.com/CloudGenUser/ftps-component

## _1. Introduction_

This code has the objective to stablish connection with a ftps server and depending of the flag it will make an diferent action.

Possible flags and their actions:

CREATEDIRECTORY - Create a directory in an specific path.
DELETEDIRECTORY - Delete the directory and their content.
DELETEFILE - Delete a file in an specific path.
GETFILE - Get the content of a file, an specific enconding can be requested.
GETLISTFILES - Get the list of files and directgories inside a specific path.
RENAMEFILE - Rename a file inside a path.
SAVEFILE - Create a file inside the ftps server, the content of the file is a string that can have an specific encondig, you have to specify the enconding.

Any other flag will be consider as an invalid value and will return a message error.

As components are used in the NXGP flows regardless that the library should be added on component code, when the flow is running, an exchange and some queues are created using the ID flow (assigned from NXGP).

## _2.	Library usage

The library can be installed from npm page with the next:

**`npm install ftps-cg-lib`**, **`npm i ftps-cg-lib`** or **`yarn install ftps-cg-lib`**


### _2.1. CREATEDIRECTORY_

- **Args:** 
Needed:
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftps server.
username: The username that have grants to connect with the ftps server.
password: This parameter contains the password that can stablish connection with the ftps.
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE. The string is not case sensitive.
secure = Is aboolean value where we specify is the connection is secured or not.
path: The path wehere you will be working on.
Optionals:


- **Description:** This request will create a new directory inside the ftps server. Is posible to create a complete structure of directory in one request.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.
.
- **Sample of a request:**
{
	"host":"18.119.108.41",
    "port":"21",
    "username":"ftpsuser",
    "password":"Cloudgen@123",
    "secure":true,
    "flag":"CREATEDIRECTORY",
    "path":"/files/newDir"
}

```

Resultant sample:

"Directory /files/newDir was created successfully."

In case the directory exists or the path does not exist you will have this message:

"Error: Create directory operation failed."

```


### _2.2 DELETEDIRECTORY_

- **Args:** 
Needed:
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftps server.
username: The username that have grants to connect with the ftps server.
password: This parameter contains the password that can stablish connection with the ftps.
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE. The string is not case sensitive.
secure = Is aboolean value where we specify is the connection is secured or not.
path: The full path where you want to delete the directory.
Optionals:

- **Description:** This request will delete a directory with all the documents inside it.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request:**
{
	"host":"18.119.108.41",
    "port":"21",
    "username":"ftpsuser",
    "password":"Cloudgen@123",
    "secure":true,
    "flag":"DELETEDIRECTORY",
    "path":"/files/newDir"
}

```

Resultant sample:

"Directory /files/newDir was deleted successfully."

In case the directory does not exist you will have this message:

"Error: Remove directory operation failed."
```


### _2.3. DELETEFILE_

- **Args:** 
Needed:
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftps server.
username: The username that have grants to connect with the ftps server.
password: This parameter contains the password that can stablish connection with the ftps.
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE. The string is not case sensitive.
secure = Is aboolean value where we specify is the connection is secured or not.
path: The full path where you want to delete the file.
file: The name of the file you want to delete.

Optionals:


- **Description:** This request will delete a specific file in the ftps server.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request:**
{
	"host":"18.119.108.41",
    "port":"21",
    "username":"ftpsuser",
    "password":"Cloudgen@123",
    "secure":true,
    "flag":"DELETEFILE",
    "path":"/files/",
    "file":"regards.txt"
}

```

Resultant sample:

"File regards.txt was deleted successfully."

In case the file does not exist you will have this message:

"Error: Delete operation failed."
```


### _2.4. GETFILE_

- **Args:** 
Needed:
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftps server.
username: The username that have grants to connect with the ftps server.
password: This parameter contains the password that can stablish connection with the ftps.
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE. The string is not case sensitive.
secure = Is aboolean value where we specify is the connection is secured or not.
file: The name of the file you wanto to get with the full path and the extension of the file. If you don't use the parameter enconging you will get the file in base64 format.
Optionals:
encoding: The enconging that we want to use to get the file, if this parameter is not sended base64 will be taken as default.

- **Description:** This request will get the content of a file in a string.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request without encoding (the default countent will be get in base64):**
{
	"host":"18.119.108.41",
    "port":"21",
    "username":"ftpsuser",
    "password":"Cloudgen@123",
    "secure":true,
    "flag":"GETFILE",
    "file":"/files/regards.txt"
}

```

Resultant sample:

"Thisisatestmessagefortheftpslibraryandcomponens="
```


If you try to get a file that does no exist you will have this message:

"Error: Failed to open file."

```


### _2.5. GETLISTFILES_

- **Args:** 
Needed:
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftps server.
username: The username that have grants to connect with the ftps server.
password: This parameter contains the password that can stablish connection with the ftps.
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE. The string is not case sensitive.
secure = Is aboolean value where we specify is the connection is secured or not.
path: The path where we wanto to get the list of files and directories.
Optionals:


- **Description:** This request will get a string in json format with all the files and directories inside the path specified.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request:**
{
	"host":"18.119.108.41",
    "port":"21",
    "username":"ftpsuser",
    "password":"Cloudgen@123",
    "secure":true,
    "flag":"GETLISTFILES",
    "path":"/files/"
}

```

Resultant sample:

[
    {
        "type": "-",
        "name": "Ftps-test.file.txt",
        "sticky": false,
        "rights": {
            "user": "rw",
            "group": "r",
            "other": "r"
        },
        "acl": false,
        "owner": "1002",
        "group": "1002",
        "size": 0,
        "date": "2022-09-27T17:58:00.000Z"
    },
    {
        "type": "-",
        "name": "hello.txt",
        "sticky": false,
        "rights": {
            "user": "rw",
            "group": "r",
            "other": "r"
        },
        "acl": false,
        "owner": "1002",
        "group": "1002",
        "size": 0,
        "date": "2022-10-21T21:33:00.000Z"
    },
    {
        "type": "-",
        "name": "regards.txt",
        "sticky": false,
        "rights": {
            "user": "rw",
            "group": "r",
            "other": "r"
        },
        "acl": false,
        "owner": "1002",
        "group": "1002",
        "size": 35,
        "date": "2022-10-27T00:31:00.000Z"
    }
]

If you specify a path that does not exist you will have this answer:

[]
```


### _2.6. RENAMEFILE_

- **Args:** 
Needed:
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftps server.
username: The username that have grants to connect with the ftps server.
password: This parameter contains the password that can stablish connection with the ftps.
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE. The string is not case sensitive.
secure = Is aboolean value where we specify is the connection is secured or not.
path = The location of the file you want to rename.
oldName = The current name of the file.
newName = the new name of the file.

Optionals:



- **Description:** This request will rename a file inside the ftps.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request:**
{
	"host":"18.119.108.41",
    "port":"21",
    "username":"ftpsuser",
    "password":"Cloudgen@123",
    "secure":true,
    "flag":"RENAMEFILE",
    "path":"/files/",
    "oldName":"regards.txt",
    "newName":"regardsNewName.txt"
}

```

Resultant sample:

"File regards.txt was successfully renamed to regardsNewName.txt."

if the file you wanto to rename does not exist you will have this message:

"Error: RNFR command failed."
```


### _2.7. SAVEFILE_

- **Args:** 
Needed:
host: The host where you will connect, can be a url or ip.
port: The port where you will access to the ftps server.
username: The username that have grants to connect with the ftps server.
password: This parameter contains the password that can stablish connection with the ftps.
flag: The string that contains the actinon to execute, can be one of this: CREATEDIRECTORY, DELETEDIRECTORY, DELETEFILE, GETFILE, GETLISTFILES, RENAMEFILE, SAVEFILE. The string is not case sensitive.
secure = Is aboolean value where we specify is the connection is secured or not.
file: The path wehere you will be working on with the name of the file and the extension.
content: The text of the file or the base64 string of the file that will be builded.
Optionals:
encoding: The enconging that we want to use to get the file, if this parameter is not sended base64 will be taken as default.

- **Description:** This request will save a file inside the ftps, the string with the content could be in severals formats, the parameter encoding sloud be specified in case of a content different to base64.
Once the request is sended, the answear will be a string in a JSon format with the result of the excecution.

- **Sample of a request:**
{
	"host":"18.119.108.41",
    "port":"21",
    "username":"ftpsuser",
    "password":"Cloudgen@123",
    "secure":true,
    "flag":"SAVEFILE",
    "file":"/files/regards.txt",
    "content":"Hello world!!!",
    "enconding":"utf8"
}

```

Resultant sample:

"File /files/regards.txt was created successfully."
```