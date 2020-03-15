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

    if (!ip2) {
        window.alert(`Se ingresó solo una
        ip: ${ip1.value} 
        máscara: ${mascara.value}`);
        mostraResult();
    } else {
        window.alert(`Se ingresaron dos ips   
        ip1: ${ip1.value} 
        ip2: ${ip2.value} 
        mascara: ${mascara.value}`);
        mostraResult();
    }

}

function mostraResult() {
    $("#resultados").empty();
    $("#resultados").html(`
    <table>
        <tbody>
            <tr>
                <td>Dirección de red: </td>
                <td>${'ip de red'}</td>
            </tr>
            <tr>
                <td>Dirección de broadcast: </td>
                <td>${'ip de broadcast'}</td>
            </tr>
            <tr>
                <td>Max usuarios que se pueden conectar: </td>
                <td>${'num max usuarios'}</td>
            </tr>
        </body>
    </table>
    `); 

}