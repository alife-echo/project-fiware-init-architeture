
const getAllDevicesAir = async () => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
     return  await fetch("http://localhost:1026/v2/entities?options=keyValues&type=Device", requestOptions)
        .then(response => response.text())
        .then(result => result )
        .catch(error => error);
}

module.exports = getAllDevicesAir