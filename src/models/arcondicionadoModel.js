var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


const createArcondicionado = async () =>{
    var raw = JSON.stringify({
  "id": "urn:ngsi-ld:AirConditioning:001",
  "type": "Device",
  "name": {
    "type": "Text",
    "value": "Spring"
  },
  "marca": {
    "type": "Text",
    "value": "Springer Midea"
  },
  "status": {
    "type": "Boolean",
    "value": "false",
  },
  "temperatura": {
    "type": "Number",
    "value": 0
  },
  "velocidadeventilador":{
    "type":"Integer",
    "value": 0
  }
});


var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  await fetch("http://localhost:1026/v2/entities", requestOptions)
    .then(response => response.text())
    .then(result => result)
    .catch(error => error);


}

module.exports = createArcondicionado;