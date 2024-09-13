// Configuración de la librería FullCalendar
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView : 'timeGridWeek',
        editable : true,
        events : [],
        eventClick : function(info) {
            var eventObj = info.event;
            document.getElementById('professorName').value = eventObj.title;
            document.getElementById('subjectName').value = eventObj.extendedProps.subject;
            document.getElementById('classTime').value = eventObj.start.toLocaleTimeString();
            var modal = new bootstrap.Modal(document.getElementById('editModal'));
            modal.show();
        }
    });
    calendar.render();

    // Importar el archivo de Excel
    document.getElementById('importBtn').addEventListener('click', function() {
        var fileInput = document.getElementById('excelFile');
        if (fileInput.isDefaultNamespace.length === 0) {
            alert("Por favor, seleccione un archivo de Excel.");
            return;
        }
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = new Uint8Array(e.target.result); // Obtener los datos de la hoja de calculo
            var workbook = XLSX.read(data, {type: 'array'}); // Cargar los datos de la hoja de calculo
            var firstSheet = workbook.Sheets[workbook.SheetNames[0]]; // Obtener la primera hoja de calculo
            var rows = XLSX.utils.sheet_to_json(firstSheet, {header: 1}); // Convertir la hoja de calculo en un arreglo

            // Dividir los datos de la hoja de calculo
            rows.forEach(function(row, index) {
                if (index === 0) return;
                var profesor = row
                var materia = row[1];
                var fechaInicio = new Date(row[2]);
                var fechaFin = new Date(row[3]);

                calendar.addEvent({
                    title: profesor,
                    start: fechaInicio,
                    end: fechaFin,
                    extendedProps: {
                        subject: materia
                    }
                });
            });
        };
        reader.readAsArrayBuffer(file);
    });
});