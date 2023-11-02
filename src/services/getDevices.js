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
      try {
        const response = await  fetch("http://localhost:1026/v2/entities?options=keyValues&type=Sensor", requestOptions)
        const result = await response.text();
        return { success: true, message: JSON.parse(result)};
    } catch (error) {
        return { success: false, message: error.message };
    }
}
module.exports = devices