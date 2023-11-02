const devices = async () => {
    let myHeaders = new Headers();
    myHeaders.append("fiware-service", "openiot");
    myHeaders.append("fiware-servicepath", "/");
    myHeaders.append("Cookie", "connect.sid=s%3AmdgXLUl4tCxdyU2QqB8QJGALuxjcTSPO.R9t9QCl%2FYz1glJCiPh07gncRPHHCpgLPVLQYLZFXLo4");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("http://localhost:4000/get-devices", requestOptions);
        const result = await response.json();
        return { success: true, message: result };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

const showErrorMessage = () => {
    const deviceContainer = document.getElementById('deviceContainer');
    deviceContainer.innerHTML = `<h1 class='title-error'>Infelizmente não existem dispositivos cadastrados</h1>`;
}

const updateDeviceInfo = (devices) => {
    const deviceContainer = document.getElementById('deviceContainer');

    devices.forEach(device => {
        const card = document.createElement('div');
        card.classList.add('box_iot');

        card.innerHTML = `
            <div class="content">
                <p id="device">Sensor: <span class="st-span">${device.id || device.TimeInstant}</span></p>
                <p id="type">Tipo: <span class="st-span">${device.type}</span></p>
                <p id="time">Tempo: <span class="st-span">${device.TimeInstant}</span></p>
                ${device.nitrogenLevel ? `<p id="level">Nível NO2: <span class="st-span">${device.nitrogenLevel}</span></p>` : '' }
                ${device.co2Level ? `<p id="level">Nível CO2: <span class="st-span">${device.co2Level}</span></p>` : '' }
                ${device.pm10Level ? `<p id="level">Nível PM10: <span class="st-span">${device.pm10Level}</span></p>` : '' }
                ${device.pm25Level ? `<p id="level">Nível PM25: <span class="st-span">${device.pm25Level}</span></p>` : '' }
                <p id="ref">Referência: <span class="st-span">${device.refAirConditioning}</span></p>
            </div>
        `;

        deviceContainer.appendChild(card);
    });
}

window.onload = async () => {
    const result = await devices();
    console.log(result,'resultado')
    if(result.message.devices.message.length <= 0){
        showErrorMessage();
    }
    if (result.success) {
        const devices = result.message.devices.message;
        updateDeviceInfo(devices);
    }
    else {
        console.error(result.message);
    }
}
