
/**
 * FUNCIONES CATEGORIA
 */

function formularioCategorias() {
    $.ajax({
        action: $('#divRegClientes').hide(),
        action: $('#divTablaDisfraz').hide(),
        action: $('#divRegMensajes').hide(),
        action: $('#divRegCategorias').show(),
        action: $('#divRegReservaciones').hide(),
    }
    );
}

function limpiarCeldasC(){
    var data;
    message = {
        id: $("#idCategoria").val(""),
        name:  $("#nameCategoria").val(""),
        description:  $("#descCategoria").val(""),
    }
    datosEnvio = JSON.stringify(data);
}

function consultarCategorias() {
    $.ajax({
        url: "http://144.22.239.17:8080/api/Category/all",
        type: "GET",
        dataType: "json",
        success: function (items) {
            $("#idDivConsultaCategorias").empty();
            $("#idDivConsultaCategorias").append("<table>");
            $("#idDivConsultaCategorias").append("<tr><th>NOMBRE</th><th>DESCRIPCION</th></tr>");
            for (i = 0; i < items.length; i++) {
                $("#idDivConsultaCategorias").append("<tr>");
                $("#idDivConsultaCategorias").append("<td hidde>"+items[i].id+"</td>");
                $("#idDivConsultaCategorias").append("<td>"+items[i].name+"</td>");
                $("#idDivConsultaCategorias").append("<td>"+items[i].description+"</td>");
                $("#idDivConsultaCategorias").append('<td><button onclick="cargarCategoria(' + items[i].id + ')">Cargar</button></td>');
                $("#idDivConsultaCategorias").append("</tr>");
            }
            $("#idDivConsultaCategorias").append("</table>");
        },
        error: function (xhr, status) {
            console.log(xhr);
        }
    });
}

function cargarCategoria(idItem) {
    $.ajax({
        dataType: 'json',
        url: "http://144.22.239.17:8080/api/Category/" + idItem,
        type: 'GET',
        success: function (response) {
            $("#idCategoria").val(response.id);
            $("#nameCategoria").val(response.name);
            $("#descCategoria").val(response.description);
        },
        error: function (xhr, status) {
            console.log(xhr);
        }
    }
    );
}

function crearCategoria() {
    var data;
    data = { name: $("#nameCategoria").val(),
    description: $("#descCategoria").val(), };
    var dataToSend=JSON.stringify(data);
    $.ajax({
        url: "http://144.22.239.17:8080/api/Category/save",
        type: "POST",
        data: dataToSend,
        contentType:'application/json',
        success: function (response) {
            console.log(response);
            alert("Categoria creado exitosamente");
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Categoria no pudo ser creado");
        }
    });
    limpiarCeldasC();
}

function actualizarCategoria() {
    var data;
    data = {
        id: $("#idCategoria").val(),
        description: $("#descCategoria").val()
    }
    datosEnvio = JSON.stringify(data);
    $.ajax({
        url: "http://144.22.239.17:8080/api/Category/update",
        type: "PUT",
        data: datosEnvio,
        contentType: "application/json",
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Categoria no pudo ser actualizado");
        }
    });
    consultarCategorias();
    limpiarCeldasC();
}

function eliminarCategoria() {
    var dato, datosEnvio;
    dato = { id:$("#idCategoria").val()};
    datosEnvio = JSON.stringify(dato);
    $.ajax({
        url: "http://144.22.239.17:8080/api/Category/" + dato.id,
        type: "DELETE",
        data: datosEnvio,
        contentType: "application/json",
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(xhr);
            alert("Categoria no pudo ser eliminado");
        }
    });
    consultarCategorias();
    limpiarCeldasC();
}