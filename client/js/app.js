
class EventManager {
    constructor() {
        this.urlBase = "diary/"
        this.validateSession()
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
        this.logout()
    }

    obtenerDataInicial() {
        let session = JSON.parse(window.localStorage.getItem('session'))
        let url = this.urlBase + "events/all/" + session.user
        $.get(url, (response) => {
            this.inicializarCalendario(response)
        })
    }

    eliminarEvento(evento) {
        let eventId = evento.id
        let url = this.urlBase + "events/delete/" + eventId
        $.post(url, {id: eventId}, (response) => {
            console.log(response)
        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let nombre = $('#titulo').val(),
            start = $('#start_date').val(),
            title = $('#titulo').val(),
            end = '',
            start_hour = '',
            end_hour = '';

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }
            let url = this.urlBase + "events/saveEvent"
            if (title != "" && start != "") {
                var owner = JSON.parse(window.localStorage.getItem('session'))
                let ev = {
                    title: title,
                    start: start,
                    end: end,
                    owner: owner.user
                }
                $.post(url, ev, (response) => {
                    if(response.code == 200) {
                        $('.calendario').fullCalendar('renderEvent', ev)
                        alert(response.message)
                    }else {
                        alert(response.message)
                    }
                })
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    actualizarEvento(evento) {
        let eventId = evento.id
        let start = evento.start.toISOString()
        let url = this.urlBase + "events/update/" + eventId
        $.post(url, {id: eventId, start: start}, (response) => {
            alert(response.message)
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    inicializarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2020-05-27',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: eventos,
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "img/trash-open.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents', event._id);
                }
                $('.delete').find('img').attr('src', "img/delete.png");
            }

        })
    }

    logout() {
        $('#logout').on('click', (ev) => {
            ev.preventDefault()
            window.localStorage.clear();
            window.location.href = "http://localhost:3000/"
        })
    }

    validateSession() {
        let session = window.localStorage.getItem('session')
        if(!session) {
            window.location.href = "http://localhost:3000/"
        }
    }
}

const Manager = new EventManager()
