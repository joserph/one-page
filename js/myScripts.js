$(document).ready(function()
{
	/*
	 * ******************** ADD. ********************
	 */
	// Fechas
	var formFecha = $('.add-fecha');
	formFecha.on('submit', function()
	{
		$.ajax({
			type: formFecha.attr('method'),
			url: formFecha.attr('action'),
			data: formFecha.serialize(),
			success: function(data)
			{
				$('.error').html('');
				$('.success').hide().html('');
				if(data.success == false)
				{
					var errors = '';
						errors += '<div class="alert alert-warning">';
						errors += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
						errors += '<h4><i class="fa fa-exclamation-triangle fa-fw"></i> Por favor corrige los siguentes errores:</h4>';
					for(datos in data.errors)
					{
						errors += '<li>' + data.errors[datos] + '</li>'
					}
						errors += '</div>';
					$('.error').html(errors);
				}else{
					var successMessage = '';
						successMessage += '<div class="alert alert-success">';
						successMessage += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
						successMessage += '<p><i class="fa fa-check fa-fw"></i>' + data.message + '</p>';
						successMessage += '</div>';
					$(formFecha)[0].reset();
					ListFechas();										
					$('#myModal').modal('hide');
					$('.success').show().html(successMessage).fadeOut(4000);
				}
			},
			error: function(errors)
			{
				$('.error').html(errors);
			}
		});
		return false;
	});
	
	ListFechas();
	$('.deleteFecha').hide();
	// End fechas
	// Predicadores
	var formPredicador = $('.add-predicador');
	formPredicador.on('submit', function()
	{
		$.ajax({
			type: formPredicador.attr('method'),
			url: formPredicador.attr('action'),
			data: formPredicador.serialize(),
			success: function(data)
			{
				$('.error').html('');
				$('.success').hide().html('');
				if(data.success == false)
				{
					var errors = '';
						errors += '<div class="alert alert-warning">';
						errors += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
						errors += '<h4><i class="fa fa-exclamation-triangle fa-fw"></i> Por favor corrige los siguentes errores:</h4>';
					for(datos in data.errors)
					{
						errors += '<li>' + data.errors[datos] + '</li>'
					}
						errors += '</div>';
					$('.error').html(errors);
				}else{
					var successMessage = '';
						successMessage += '<div class="alert alert-success">';
						successMessage += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
						successMessage += '<p><i class="fa fa-check fa-fw"></i>' + data.message + '</p>';
						successMessage += '</div>';
					$(formPredicador)[0].reset();
					ListPredicador();									
					$('#myModal').modal('hide');
					$('.success').show().html(successMessage).fadeOut(4000);
				}
			},
			error: function()
			{
				$('.error').html(errors);
			}
		});
		return false;
	});
	ListPredicador();
	$('.deletePredicador').hide();
	// End predicadores
	// Comment
	var formComment = $('.add-comment');
	formComment.on('submit', function()
	{
		$.ajax({
			type: formComment.attr('method'),
			url: formComment.attr('action'),
			data: formComment.serialize(),
			success: function(data)
			{
				$('.error').html('');
				$('.success').hide().html('');
				if(data.success == false)
				{
					var errors = '';
						errors += '<div class="alert alert-warning">';
						errors += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
						errors += '<h4><i class="fa fa-exclamation-triangle fa-fw"></i> Por favor corrige los siguentes errores:</h4>';
					for(datos in data.errors)
					{
						errors += '<li>' + data.errors[datos] + '</li>'
					}
						errors += '</div>';
					$('.error').html(errors);
				}else{
					var successMessage = '';
						successMessage += '<div class="alert alert-success">';
						successMessage += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
						successMessage += '<p><i class="fa fa-check fa-fw"></i>' + data.message + '</p>';
						successMessage += '</div>';
					$(formComment)[0].reset();
					ListComments();
					$('.success').show().html(successMessage);
				}
			},
			error: function()
			{
				$('.error').html(errors);
			}
		});
		return false;
	});
	ListComments();
	// End comment
});


/*
 * ******************** LIST ********************
 */
 // Fechas
function ListFechas()
{	
	var trDatos = $('#tr-fecha');
	var route = 'http://lcdlg2.dev/date';
	$('#tr-fecha').empty();
	$.get(route, function(respuesta)
	{
		$(respuesta).each(function(key, value)
		{
			trDatos.append('<tr><td class="text-center">'+ value.fecha +'</td><td class="text-center">'+ value.tipo +'</td><td class="text-center"><button value='+ value.id +' onclick="ShowFecha(this);" data-toggle="modal" data-target="#myModal2" class="btn btn-warning btn-xs"><i class="fa fa-edit fa-fw"></i> Editar</button> <button value='+ value.id +' onclick="DeleteFecha(this);" class="btn btn-danger btn-xs"><i class="fa fa-trash fa-fw"></i> Eliminar</button></td></tr>')
		});
	});	
}
function ShowFecha(boton)
{
	var route = 'http://lcdlg2.dev/dates/'+ boton.value +'/edit';
	$.get(route, function(respuesta)
	{
		$('#fechaEdit').val(respuesta.fecha);
		$('#tipoEdit').val(respuesta.tipo);
		$('#id').val(respuesta.id);
	});
}
// End fechas
// Predicadores
function ListPredicador()
{
	var trDatos = $('#tr-predicador');
	var route = 'http://lcdlg2.dev/preacher';
	$('#tr-predicador').empty();
	$.get(route, function(respuesta)
	{
		$(respuesta).each(function(key, value)
		{
			trDatos.append('<tr><td class="text-center">'+ value.nombre +'</td><td class="text-center"><button value='+ value.id +' onclick="ShowPredicador(this);" data-toggle="modal" data-target="#myModal3" class="btn btn-warning btn-xs"><i class="fa fa-edit fa-fw"></i> Editar</button> <button value='+ value.id +' onclick="DeletePredicador(this);" class="btn btn-danger btn-xs"><i class="fa fa-trash fa-fw"></i> Eliminar</button></td></tr>')
		});
	});
}

function ShowPredicador(boton)
{
	var route = 'http://lcdlg2.dev/preachers/'+ boton.value +'/edit';
	$.get(route, function(respuesta)
	{
		$('#nombreEdit').val(respuesta.nombre);
		$('#id').val(respuesta.id);
	});
}
// End Predicadores
// Comment
function ListComments()
{
	var trDatos = $('#comments');
	var route = 'http://lcdlg2.dev/comment';
	var idSermon = $('#id_sermon').val();
	$('#comments').empty();
	$.get(route, function(respuesta)
	{
		$(respuesta).each(function(key, value)
		{
			if(idSermon == value.id_article)
			{
				trDatos.append('<p class="text-capitalize" style="color:'+ value.color +'"><strong><em>'+ value.nombre +'</em></strong> - '+ value.date +'</p><p class="text-capitalize text-justify">'+ value.comentario +'</p><hr>');
			}			
		});
	});
}


/*
 * ******************** EDIT. ********************
 */
// Fechas
$('#edit-fecha').click(function()
{
	var value = $('#id').val();
	var fecha = $('#fechaEdit').val();
	var tipo = $('#tipoEdit').val();
	var updateUser = $('#updateUser').val();
	var route = 'http://lcdlg2.dev/dates/'+value+'';
	var token = $("#token").val();

	$.ajax({
		url: route,
		headers: {'X-CSRF-TOKEN': token},
		type: 'PUT',
		dataType: 'json',
		data: {fecha: fecha, tipo: tipo, update_user: updateUser},
		success: function(data)
		{
			if(data.success == false)
			{

			}else{
				var successMessage = '';
				successMessage += '<div class="alert alert-warning">';
				successMessage += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
				successMessage += '<p><i class="fa fa-check fa-fw"></i>' + data.message + '</p>';
				successMessage += '</div>';
				ListFechas();
				$('#myModal2').modal('hide');
				$('.success').show().html(successMessage).fadeOut(4000);
			}
			
		}
	});
});
// End fechas
// Predicadores
$('#edit-predicador').click(function()
{
	var id = $('#id').val();
	var nombre = $('#nombreEdit').val();
	var updateUser = $('#updateUser').val();
	var route = 'http://lcdlg2.dev/preachers/'+id+'';
	var token = $('#token').val();

	$.ajax({
		url: route,
		headers: {'X-CSRF-TOKEN': token},
		type: 'PUT',
		dataType: 'json',
		data: {nombre: nombre, update_user: updateUser},
		success: function(data)
		{
			if(data.success == false)
			{
			
			}else{
				var successMessage = '';
				successMessage += '<div class="alert alert-warning">';
				successMessage += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
				successMessage += '<p><i class="fa fa-check fa-fw"></i>' + data.message + '</p>';
				successMessage += '</div>';
				ListPredicador();
				$('#myModal3').modal('hide');
				$('.success').show().html(successMessage).fadeOut(4000);
			}
		}
	});
});
// End predicadores



/*
 * ******************** DELETE. ********************
 */
 // Fechas
function DeleteFecha(boton)
{
	var route = 'http://lcdlg2.dev/dates/'+boton.value+'';
	var token = $("#token").val();
	var action = confirm("¿Seguro de eliminar fecha?");
	if(action)
	{
		$.ajax({
			url: route,
			headers: {'X-CSRF-TOKEN': token},
			type: 'DELETE',
			dataType: 'json',
			success: function()
			{
				ListFechas();
				$('.deleteFecha').show().fadeOut(4000);		
			}
		});
	}	
}
// End Fechas
// Predicadores
function DeletePredicador(boton)
{
	var route = 'http://lcdlg2.dev/preachers/'+boton.value+'';
	var token = $('#token').val();
	var action = confirm("¿Seguro de eliminar fecha?");
	if(action)
	{
		$.ajax({
			url: route,
			headers: {'X-CSRF-TOKEN': token},
			type: 'DELETE',
			dataType: 'json',
			success: function()
			{
				ListPredicador();
				$('.deletePredicador').show().fadeOut(4000);
			}
		});
	}
}
// End predicadores