
const getAllDevicesAir = async () => {
  let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    try {
      const response = await fetch("http://localhost:1026/v2/entities?options=keyValues&type=Device", requestOptions)
      const result = await response.text();
      return { success: true, message:JSON.parse(result)};
  } catch (error) {
      return { success: false, message: error.message };
  }
}

module.exports = getAllDevicesAir