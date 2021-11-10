
/**
 * FUNCIONES CLIENTE
 */

function formularioClientes() {
    $.ajax({
        action: $('#divTablaDisfraz').hide(),
        action: $('#divRegMensajes').hide(),
        action: $('#divRegClientes').show(),
        action: $('#divRegCategorias').hide(),
        action: $('#divRegReservaciones').hide(),
    }
    );
}

function limpiarCeldasC(){
    var client;
    client = {
        id: $("#idCliente").val(""),
        name:  $("#NameCliente").val(""),
        email: $("#Email").val(""),
        password: $("#passClient").val(""),
        age: $("#Edad").val(""),
    }
    datosEnvio = JSON.stringify(client);
}

function consultarClientes() {
    $.ajax({
        url: "http://144.22.239.17:8080/api/Client/all",
        type: "GET",
        dataType: "json",
        success: function (items) {
            $("#idDivConsultaClientes").empty();
            $("#idDivConsultaClientes").append("<table>");
            $("#idDivConsultaClientes").append("<tr><th>NOMBRE</th><th>EMAIL</th><th>EDAD</th><th>DETALLE</th></tr>");
            for (i = 0; i < items.length; i++) {
                $("#idDivConsultaClientes").append("<tr>");
                $("#idDivConsultaClientes").append("<td hidden>"+items[i].idClient+"</td>");
                $("#idDivConsultaClientes").append("<td>"+items[i].name+"</td>");
                $("#idDivConsultaClientes").append("<td>"+items[i].email+"</td>");
                $("#idDivConsultaClientes").append("<td>"+items[i].age+"</td>");
                $("#idDivConsultaClientes").append('<td><button onclick="cargarCliente(' + items[i].idClient + ')">Cargar</button></td>');
                $("#idDivConsultaClientes").append("</tr>");
            }
            $("#idDivConsultaClientes").append("</table>");
        },
        error: function (xhr, status) {
            console.log(xhr);
        }
    });
}

function cargarCliente(idItem) {
    $.ajax({
        dataType: 'json',
        url: "http://144.22.239.17:8080/api/Client/" + idItem,
        type: 'GET',
        success: function (response) {
            var item = response[0];
            $("#idCliente").val(idItem);
            $("#NameCliente").val(response.name);
            $("#Email").val(response.email);
            $("#Edad").val(response.age);
        },
        error: function (xhr, status) {
            console.log(xhr);
        }
    }
    );
}

function crearCliente() {
    var client;
    client = {  name: $("#NameCliente").val(), 
                email: $("#Email").val(), 
                password: $("#passClient").val(), 
                age: $("#Edad").val() };
    var dataToSend=JSON.stringify(client);
    $.ajax({
        url: "http://144.22.239.17:8080/api/Client/save",
        type: "POST",
        data: dataToSend,
        contentType:'application/json',
        success: function (response) {
            console.log(response);
            alert("Cliente creado exitosamente");
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Cliente no pudo ser creado");
        }
    });
    consultarClientes();
    limpiarCeldasC();
}

function actualizarCliente() {
    var client;
    client = {
        idClient: $("#idCliente").val(),
        name:  $("#NameCliente").val(),
        password:  $("#PassClient").val(),
        email: $("#Email").val(),
        age: $("#Edad").val(),
    }
    datosEnvio = JSON.stringify(client);
    $.ajax({
        url: "http://144.22.239.17:8080/api/Client/update",
        type: "PUT",
        data: datosEnvio,
        contentType: "application/json",
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Cliente no pudo ser actualizado");
        }
    });
    consultarClientes();
    limpiarCeldasC();
}

function eliminarCliente() {
    var client, datosEnvio;
    client = { idClient:$("#idCliente").val()};
    datosEnvio = JSON.stringify(client);
    $.ajax({
        url: "http://144.22.239.17:8080/api/Client/" + client.idClient,
        type: "DELETE",
        data: datosEnvio,
        contentType: "application/json",
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Cliente no pudo ser eliminado");
        }
    });
    consultarClientes();
    limpiarCeldasC();
}