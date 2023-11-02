const express = require('express');
const bodyParser = require('body-parser');
const listDevices = require('./services/showFindManyDevices')
const app = express();
const porta = 4000;
const createArcondicionado = require('./models/arcondicionadoModel')
const createServiceIot = require('./services/createServiceIot')
const createDevices = require('./models/sensorModel')
const submitDataAgent = require('./services/sendDataAgentIot')
const randomDataSensor = require('./helpers/randomGenerateDataSensor')
const devices = require('./services/getDevices')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let enviandoDados = false;
let intervalo = 5000;

app.post('/comando', (req, res) => {
  const { comando, valor } = req.body;

  if (comando === 'alternar') {
    enviandoDados = !enviandoDados;
    const status = enviandoDados ? 'Iniciando o envio de dados' : 'Parando o envio de dados';
    res.json({ status: 'OK', info: status });
  } else if (comando === 'intervalo') {
    const novoIntervalo = parseInt(valor);
    if (!isNaN(novoIntervalo) && novoIntervalo >= 0) {
      intervalo = novoIntervalo;
      res.json({ status: 'OK', info: `Intervalo definido para ${intervalo} milissegundos` });
    } else {
      res.status(400).json({ erro: 'Valor de intervalo inválido' });
    }
  } else {
    res.status(400).json({ erro: 'Comando desconhecido' });
  }
});
app.post('/createDevice', async (req, res) => {
  let createDevice = await createArcondicionado().then(result => result).catch(error => error)
  res.json({ok:createDevice }).status(201)
})
app.get('/list-air-conditioning',  async (req,res) =>  {
    let allDevicesAir =  await listDevices().then(result =>  result).catch(error =>  error)
    res.json({devices: JSON.parse(allDevicesAir)}).status(200)
})

app.post('/create-service-iot',async(req,res) => {
  let createService = await createServiceIot().then(result => result).catch(error => error)
  res.json({ok:createService}).status(201)
})

app.post('/provider-devices',async(req,res)=> {
  let devices = await  createDevices().then(result => result).catch(error => error)
  res.json({ok:devices}).status(201)
})

app.post('/send-data-device-iot', async (req,res)=>{
  const datasSensors = randomDataSensor()
  const nitrogen =  await submitDataAgent('nitrogen_sensor_001',`nitrogenLevel|${datasSensors[1]}`).then(result => result).catch(error => error)
  const pm25_pm10_sensor_001 = await submitDataAgent('pm25_pm10_sensor_001',`pm25Level|${datasSensors[2]}|pm10Level|${datasSensors[3]}`).then(result => result).catch(error => error)
  const co2 = await submitDataAgent('co2_sensor_001',`co2Level|${datasSensors[0]}`).then(result => result).catch(error => error)
  res.json({
    NO2:nitrogen,
    PM25_PM10_SENSOR_001:pm25_pm10_sensor_001,
    CO2:co2
  }).status(200)
})

app.get('/get-devices',async(req,res)=>{
   res.json({devices: JSON.parse(await devices().then(result => result).catch(error => error))})
})

setInterval(() => {
  if (enviandoDados) {
    const temperatura = (Math.random() * 30 + 10).toFixed(2);
    const umidade = (Math.random() * 100).toFixed(2);
    console.log(`t|${temperatura}`);
    console.log(`rh|${umidade}`);
  }
}, intervalo);

app.listen(porta, () => {
  console.log(`O servidor está em execução na porta ${porta}`);
});

