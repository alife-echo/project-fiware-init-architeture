let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("fiware-service", "openiot");
myHeaders.append("fiware-servicepath", "/");
myHeaders.append("Cookie", "connect.sid=s%3AmdgXLUl4tCxdyU2QqB8QJGALuxjcTSPO.R9t9QCl%2FYz1glJCiPh07gncRPHHCpgLPVLQYLZFXLo4");
const createDeviceSensor = async () => {
  //http://dummy-nitrogen-sensor:80/nitrogen
  //http://dummy-pm25-pm10-sensor:80/pm
  //http://dummy-no2-sensor:80/no2
  let sensors = JSON.stringify({
    "devices": [
      {
        "device_id": "nitrogen_sensor_001",
        "entity_name": "urn:ngsi-ld:NitrogenSensor:001",
        "entity_type": "Sensor",
        "transport": "HTTP",
        "attributes": [
          {
            "object_id": "nitrogenLevel",
            "name": "nitrogenLevel",
            "type": "Number"
          }
        ],
      
        "static_attributes": [
          {
            "name": "refAirConditioning",
            "type": "Relationship",
            "value": "urn:ngsi-ld:AirConditioning:001"
          }
        ]
      },
      {
        "device_id": "pm25_pm10_sensor_001",
        "entity_name": "urn:ngsi-ld:PM25PM10Sensor:001",
        "entity_type": "Sensor",
        "transport": "HTTP",
        "attributes": [
          {
            "object_id": "pm25Level",
            "name": "pm25Level",
            "type": "Number"
          },
          {
            "object_id": "pm10Level",
            "name": "pm10Level",
            "type": "Number"
          }
        ],
        
        "static_attributes": [
          {
            "name": "refAirConditioning",
            "type": "Relationship",
            "value": "urn:ngsi-ld:AirConditioning:001"
          }
        ]
      },
      {
        "device_id": "co2_sensor_001",
        "entity_name": "urn:ngsi-ld:CO2Sensor:001",
        "entity_type": "Sensor",
        "transport": "HTTP",
        "attributes": [
          {
            "object_id": "co2Level",
            "name": "co2Level",
            "type": "Number"
          }
        ],
       
        "static_attributes": [
          {
            "name": "refAirConditioning",
            "type": "Relationship",
            "value": "urn:ngsi-ld:AirConditioning:001"
          }
        ]
      }
    ]
  });
 //Store:001 
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: sensors,
    redirect: 'follow'
  };

  try {
    const response = await fetch("http://localhost:4041/iot/devices", requestOptions);
    const result = await response.text();
    return { success: true, message: result };
} catch (error) {
    return { success: false, message: error.message };
}
}

module.exports = createDeviceSensor







