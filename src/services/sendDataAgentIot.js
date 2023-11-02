let myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Cookie", "connect.sid=s%3AmdgXLUl4tCxdyU2QqB8QJGALuxjcTSPO.R9t9QCl%2FYz1glJCiPh07gncRPHHCpgLPVLQYLZFXLo4");

const sendDataAgent = async (targetDevice,object) => {
//4jggokgpepnvsb2uv4s40d59ov
    let raw = object
      
      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      try {
        const response = await fetch(`http://localhost:7896/iot/d?k=4jggokgpepnvsb2uv4s40d59ov&i=${targetDevice}`, requestOptions)
        const result = await response.text();
        return { success: true, message: result };
    } catch (error) {
        return { success: false, message: error.message };
    }

}

module.exports = sendDataAgent

