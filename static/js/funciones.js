
// ------- FUNCIONES DE MENSAJES -------



function consultarMensajes() {
    $.ajax({
        url: "http://129.151.110.196:8080/ords/admin/message/message",
        type: "GET",
        dataType: "json",
        success: function (json) {
            $("#idDivConsultaMensajes").empty();
            $("#idDivConsultaMensajes").append("<table>");
            $("#idDivConsultaMensajes").append("<tr><th>ID</th><th>MENSAJE</th><th>DETALLE</th></tr>");
            for (i = 0; i < json.items.length; i++) {
                $("#idDivConsultaMensajes").append("<tr>");
                $("#idDivConsultaMensajes").append("<td>"+json.items[i].id+"</td>");
                $("#idDivConsultaMensajes").append("<td>"+json.items[i].messagetext+"</td>");
                $("#idDivConsultaMensajes").append('<td><button onclick="cargarMensaje(' + json.items[i].id + ')">Cargar</button></td>');
                $("#idDivConsultaMensajes").append("</tr>");
            }
            $("#idDivConsultaMensajes").append("</table>");
        },
        error: function (xhr, status) {
            console.log(xhr);
        }
    });
}



function cargarMensaje(idItem) {
    $.ajax({
        dataType: 'json',
        url: "http://129.151.110.196:8080/ords/admin/message/message/" + idItem,
        type: 'GET',
        success: function (response) {
            var item = response.items[0];
            $("#idMessage").val(item.id);
            $("#MessageText").val(item.messagetext);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    }
    );
}

function crearMensaje() {
    var message;
    message = {
        id: $("#idMessage").val(),
        messagetext: $("#MessageText").val() };
    $.ajax({
        url: "http://129.151.110.196:8080/ords/admin/message/message",
        type: "POST",
        data: message,
        success: function (response) {
            console.log(response);
            alert("Mensaje creado exitosamente");
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Mensaje no pudo ser creado");
        }
    });
    consultarMensajes();
    limpiarCeldasM();
}

function actualizarMensaje() {
    var message;
    message = {
        id: $("#idMessage").val(),
        messagetext:  $("#MessageText").val(),
    }
    datosEnvio = JSON.stringify(message);
    $.ajax({
        url: "http://129.151.110.196:8080/ords/admin/message/message",
        type: "PUT",
        data: datosEnvio,
        contentType: "application/json",
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Mensaje no pudo ser actualizado");
        }
    });
    consultarMensajes();
    limpiarCeldasM();
}

function eliminarMensaje() {
    var message, datosEnvio;
    message = { id:$("#idMessage").val()};
    datosEnvio = JSON.stringify(message);
    $.ajax({
        url: "http://129.151.110.196:8080/ords/admin/message/message",
        type: "DELETE",
        data: datosEnvio,
        contentType: "application/json",
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Mensaje no pudo ser eliminado");
        }
    });
    limpiarCeldasM();
    consultarMensajes();
}

//-------FIN-----

function consultarId() {
    var codigo = $("#idDisfraz").val();
    $.ajax(
        { //al link le agregamos / y + el codigo
            url: "http://129.151.110.196:8080/ords/admin/costume/costume/" + codigo,
            type: "GET",
            dataType: "json",
            success: function (json) {
                $("#idDivConsulta").empty();
                for (i = 0; i < json.items.length; i++) {
                    $("#idDivConsulta").append(json.items[i].id + json.items[i].brand + " ");
                }
                console.log(json); //asi imprimimos en consola
            },
            error: function (xhr, status) {
                console.log(xhr);
            }
        });
}