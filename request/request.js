const host = location.host
const network = host.substring(0, host.indexOf('.')).toLowerCase()
console.log('connection network: ', network)

window.onload = () => {
    getJsonRPC()
    document.getElementById('network').innerHTML = network
    document.getElementById('copyUrl').onclick = copyToClipboard
    document.getElementById('submit').onclick = rpcCall
    $('#copyUrl').popover()
}

const getJsonRPC = async () => {
    const res = await fetch('../rpc.json')
    const jsonRPCList = (await res.json())['json-rpc']
    let methods = document.getElementById('methods')
    jsonRPCList.forEach((rpc, index) => {
        let option = document.createElement('option')
        option.value = rpc
        option.selected = index == 0 ? true : false
        option.innerText = rpc
        methods.appendChild(option)
    })
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

const rpcCall = async () => {
    let method = document.getElementById('methods').value
    let pStr = document.getElementById('params').value
    let params = pStr === '' ? '[]' : JSON.stringify(pStr).replace(/\\n/g, '')
    try {
        const res = await fetch('/v1', {
            method: 'POST', 
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'jsonrpc': '2.0',
                'method': method,
                'params': params,
                'id': 1
            })
        })
        document.getElementById('result').innerHTML = await res.text()
        $('#resultModal').modal('show')
    } catch (err) {
        document.getElementById('result').innerHTML = err
        $('#resultModal').modal('show')
    }
    
}