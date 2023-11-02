let myHeaders = new Headers();
myHeaders.append("fiware-service", "openiot");
myHeaders.append("fiware-servicepath", "/");
myHeaders.append("Cookie", "connect.sid=s%3AmdgXLUl4tCxdyU2QqB8QJGALuxjcTSPO.R9t9QCl%2FYz1glJCiPh07gncRPHHCpgLPVLQYLZFXLo4");

const devices =  async () => {
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
 return   await  fetch("http://localhost:1026/v2/entities?options=keyValues&type=Motion", requestOptions)
        .then(response => response.text())
        .then(result => result)
        .catch(error => error);
}
module.exports = devices