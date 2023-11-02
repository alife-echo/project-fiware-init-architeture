let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("fiware-service", "openiot");
myHeaders.append("fiware-servicepath", "/");

const createServiceIot = async () => {
    let raw = JSON.stringify({
        "services": [
          {
            /*  "apikey": "4jggokgpepnvsb2uv4s40d59ov",
            "cbroker": "http://orion:1026",
            "entity_type": "Device",
            "resource": "/iot/json"*/
            "apikey":      "4jggokgpepnvsb2uv4s40d59ov",
            "cbroker":     "http://orion:1026",
            "entity_type": "Motion",
            "resource":    "/iot/d"
          }
        ]
      });
      
      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
    return await  fetch("http://localhost:4041/iot/services", requestOptions)
        .then(response => response.text())
        .then(result => result)
        .catch(error => error);
}

module.exports = createServiceIot
