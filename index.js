function unaDir() {
    $("#ip2").empty();
}

function dosDir() {
    $("#ip2").empty();
    $("#ip2").html('<input id="dir2" type="text" class="validate"><label for="dir2">IP #2</label>');
}

function comprobar() {
    var ip1 = document.getElementById("dir1");
    var ip2 = document.getElementById("dir2");
    var mascara = document.getElementById("mascara");
    if(!comprobarMascara(mascara)) return  window.alert(`La máscara ${mascara.value} no es válida`);

    if (!ip2) {
        subMask = hallarSubMask(mascara.value);
        ipRed = obtenerRed(ip1.value,subMask.length)
        ipBC = obtenerBroadcast(ip1.value, subMask.length)
        mostraResult(ipRed, ipBC, subMask.length);
        
    } else {
        subMask = hallarSubMask(mascara.value);
        ipRed1 = obtenerRed(ip1.value,subMask.length)
        ipRed2 = obtenerRed(ip2.value,subMask.length)
        if(ipRed1 != ipRed2) {return window.alert(`Las redes no pertenecen a la misma red`)}
        else{
            ipBC = obtenerBroadcast(ip1.value, subMask.length)
            mostraResult(ipRed1, ipBC, subMask.length);
        }
    }

}

function hallarSubMask(mascara) {

    cero = /0/g

    var subMask = mascara.split('.').map(function(x) { //Pasar a lista
        return parseInt(x, 10);                         //Pasar a int
    }).map(function(y){                                 //Pasar a binario
        return y.toString(2)
    }).join('').replace(cero,'')                        //Devolver str con los unos

    return subMask;

}

function obtenerRed(ip,subMask) {
    i = parseInt(subMask/8)
    ipList = ip.split('.')
    ipRed = ipList.fill("0",i+1,4)
    
    ipBin = parseInt(ipRed[i],10).toString(2)

    while(ipBin.length < 8) ipBin = "0"+ipBin

    ipBin = ipBin.split("").fill("0",subMask-8*(i),9).join("")

    ipRed[i] = parseInt(ipBin,2).toString(10)

    return ipRed.join(".")

}

function obtenerBroadcast(ip, subMask){
    i = parseInt(subMask/8)
    ipList = ip.split('.')
    ipBC = ipList.fill("255",i+1,4)

    ipBin = parseInt(ipBC[i],10).toString(2)
    
    while(ipBin.length < 8) ipBin = "0"+ipBin

    ipBin = ipBin.split("").fill("1",subMask-8*(i),9).join("")

    ipBC[i] = parseInt(ipBin,2).toString(10)

    return ipBC.join(".")
}

function comprobarMascara(mascara) {
    mascValidas = [
        "255.255.255.255",
        "255.255.255.254",
        "255.255.255.252",
        "255.255.255.248",
        "255.255.255.240",
        "255.255.255.224",
        "255.255.255.192",
        "255.255.255.128",
        "255.255.255.0",
        "255.255.254.0",
        "255.255.252.0",
        "255.255.248.0",
        "255.255.240.0",
        "255.255.224.0",
        "255.255.192.0",
        "255.255.128.0",
        "255.255.0.0",
        "255.254.0.0",
        "255.252.0.0",
        "255.248.0.0",
        "255.240.0.0",
        "255.224.0.0",
        "255.192.0.0",
        "255.128.0.0",
        "255.0.0.0",
        "254.0.0.0",
        "252.0.0.0",
        "248.0.0.0",
        "240.0.0.0",
        "224.0.0.0",
        "192.0.0.0",
        "128.0.0.0"
    ]

    return mascValidas.includes(mascara.value)
}

function mostraResult(ip,bc,subMask) {
    $("#resultados").empty();
    $("#resultados").html(`
    <table>
        <tbody>
            <tr>
                <td>Dirección de red: </td>
                <td>${ip}/${subMask}</td>
            </tr>
            <tr>
                <td>Dirección de broadcast: </td>
                <td>${bc}</td>
            </tr>
            <tr>
                <td>Max usuarios que se pueden conectar: </td>
                <td>${Math.pow(2,32-subMask)-2}</td>
            </tr>
        </body>
    </table>
    `);

}