const host = location.host
const network = host.substring(0, host.indexOf('.')).toLowerCase()
console.log('connection network: ', network)

window.onload = () => {
    document.getElementById('network').innerHTML = network
    document.getElementById('network-selector').onchange = changeNetwork
    document.querySelector(`option[value=${network}]`).setAttribute('selected', 'selected')
    document.getElementById('copyUrl').onclick = copyToClipboard
    netStatusCheck('healthy')

    $('#copyUrl').popover()
}

const changeNetwork = ( { target: { value } } ) => {
    location.host = host.replace(network, value)
}

const copyToClipboard = () => {
    let tmpTag = document.createElement('textarea')
    document.body.appendChild(tmpTag)
    tmpTag.value = `https://${network}.gncloud.io/v1`
    tmpTag.select()
    document.execCommand('copy')
    document.body.removeChild(tmpTag)
    copyPopover()
}

const copyPopover = () => {
    setTimeout(() => {
        $('#copyUrl').popover('hide')
    }, 1000)
}

const truffleModal = () => {
    $('#truffleModal').modal('show')
}

const netStatusCheck = async (status) => {
    try {
        let res = await fetch('v1', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":2})
        })
        let body = await res.json()
        status = 'healthy'
    } catch(e) {
        console.log(e)
        status = 'unHealthy'
    }
    
    let ms = 0
    let statusTag = document.getElementsByClassName('net-status')[0]
    if (status === 'healthy') {
        statusTag.innerHTML = '&#9679; 상태정상';
        statusTag.classList.add('text-success')
        statusTag.classList.remove('text-warning')
        ms = 60000
    } else {
        statusTag.innerHTML = '&#9679; 상태불량';
        statusTag.classList.add('text-warning')
        statusTag.classList.remove('text-success')
        ms = 5000
    }
    
    setTimeout(() => {
        netStatusCheck(status)
    }, ms)
}