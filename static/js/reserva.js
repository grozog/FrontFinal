/**
 * FUNCIONES RESERVA
 */

function formularioReservaciones() {
	$.ajax({
		action: $("#divRegClientes").hide(),
		action: $("#divTablaDisfraz").hide(),
		action: $("#divRegMensajes").hide(),
		action: $("#divRegCategorias").hide(),
		action: $("#divRegReservaciones").show(),
	});
}

function limpiarCeldasR() {
	var data;
	message = {
		idReservation: $("#idReservation").val(""),
		startDate: $("#startDate").val(""),
		devolutionDate: $("#devolutionDate").val(""),
	};
	datosEnvio = JSON.stringify(data);
}

function consultarReservaciones() {
	$.ajax({
		url: "http://144.22.239.17:8080/api/Reservation/all",
		type: "GET",
		dataType: "json",
		success: function (items) {
			$("#idDivConsultaReservaciones").empty();
			$("#idDivConsultaReservaciones").append("<table>");
			$("#idDivConsultaReservaciones").append(
				"<tr><th>FECHA DE INICIO</th><th>FECHA DE DEVOLUCION</th></tr>"
			);
			for (i = 0; i < items.length; i++) {
				$("#idDivConsultaReservaciones").append("<tr>");
				$("#idDivConsultaReservaciones").append(
					"<td hidde>" + items[i].idReservation + "</td>"
				);
				$("#idDivConsultaReservaciones").append(
					"<td>" + items[i].startDate + "</td>"
				);
				$("#idDivConsultaReservaciones").append(
					"<td>" + items[i].devolutionDate + "</td>"
				);
				$("#idDivConsultaReservaciones").append(
					'<td><button onclick="cargarReservaciones(' +
						items[i].idReservation +
						')">Cargar</button></td>'
				);
				$("#idDivConsultaReservaciones").append("</tr>");
			}
			$("#idDivConsultaReservaciones").append("</table>");
		},
		error: function (xhr, status) {
			console.log(xhr);
		},
	});
}

function cargarReservaciones(idItem) {
	$.ajax({
		dataType: "json",
		url: "http://144.22.239.17:8080/api/Reservation/" + idItem,
		type: "GET",
		success: function (response) {
			$("#idReservation").val(response.idReservation);
			$("#startDate").val(response.startDate);
			$("#devolutionDate").val(response.devolutionDate);
		},
		error: function (xhr, status) {
			console.log(xhr);
		},
	});
}

function crearReservacion() {
	var data;
	data = {
		startDate: $("#startDate").val(),
		devolutionDate: $("#devolutionDate").val(),
	};
	var dataToSend = JSON.stringify(data);
	$.ajax({
		url: "http://144.22.239.17:8080/api/Reservation/save",
		type: "POST",
		data: dataToSend,
		contentType: "application/json",
		success: function (response) {
			console.log(response);
			alert("Reserva creado exitosamente");
		},
		error: function (xhr, status) {
			console.log(xhr);
			alert("Reserva no pudo ser creado");
		},
	});
	limpiarCeldasR();
}

function actualizarReservacion() {
	var data;
	data = {
		idReservation: $("#idReservation").val(),
		devolutionDate: $("#devolutionDate").val(),
	};
	datosEnvio = JSON.stringify(data);
	$.ajax({
		url: "http://144.22.239.17:8080/api/Reservation/update",
		type: "PUT",
		data: datosEnvio,
		contentType: "application/json",
		success: function (response) {
			console.log(response);
		},
		error: function (xhr, status) {
			console.log(xhr);
			alert("Reserva no pudo ser actualizado");
		},
	});
	consultarReservas();
	limpiarCeldasR();
}

function eliminarReservacion() {
	var dato, datosEnvio;
	dato = { idReservation: $("#idReservation").val() };
	datosEnvio = JSON.stringify(dato);
	$.ajax({
		url: "http://144.22.239.17:8080/api/Reservation/" + dato.idReservation,
		type: "DELETE",
		data: datosEnvio,
		contentType: "application/json",
		success: function (response) {
			console.log(response);
		},
		error: function (xhr, status) {
			console.log(xhr);
			alert("Reserva no pudo ser eliminado");
		},
	});
	consultarReservas();
	limpiarCeldasR();
}
