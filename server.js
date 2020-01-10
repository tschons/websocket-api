const WebSocket = require('ws');
const moment = require('moment');
const configuracoes = require("./configuracoes");
const randomstring = require("randomstring");

const casoDeUso = parseInt(process.argv[2]) - 1;
const mensagemAleatoria = parseInt(process.argv[3]) - 1;
let msgEnviadas = 0;
let msgRecebidas = 0;

const wss = new WebSocket.Server({
    port: 8080,
    perMessageDeflate: configuracoes[casoDeUso].compressao
});

setInterval(() => {
    console.log(moment().format('H:mm:ss'));
    console.log(`Enviadas: ${msgEnviadas}`);
    console.log(`Recebidas: ${msgRecebidas}`);
}, 1000);

wss.on('connection', function connection(ws) {
    console.log('Conexão estabelecida');

    ws.on('message', function incoming(mensagem) {
        // console.log('Mensagem recebida de %s bytes', mensagem);
        msgRecebidas++;
    });

    setInterval(() => {

        let message = '';
        if (mensagemAleatoria == 1) {
            let message = randomstring.generate(configuracoes[casoDeUso].tamanhoMensagem);
        } else {
            let messageIndex = Math.floor(Math.random() * 10);
            message = configuracoes[casoDeUso].mensagens[messageIndex];
        }
        // console.log('Enviando mensagem de %s bytes', message);

        ws.send(message);
        msgEnviadas++;
    }, configuracoes[casoDeUso].intervalo);
});
