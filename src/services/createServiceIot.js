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
            "entity_type": "Sensor",
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
      
      try {
        const response = await fetch("http://localhost:4041/iot/services", requestOptions);
        const result = await response.text();
        return { success: true, message: result };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

module.exports = createServiceIot
