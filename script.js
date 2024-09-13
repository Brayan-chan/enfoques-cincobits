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
            
        }
    })
})