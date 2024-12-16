$(function() {

    $('.navbar-toggle').click(function() {
        $(this).toggleClass('act');
            if($(this).hasClass('act')) {
                $('.main-menu').addClass('act');
            }
            else {
                $('.main-menu').removeClass('act');
            }
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.site-header',
        offset: 10
    });

	/* Progress bar */
    var $section = $('.section-skills');
    function loadDaBars() {
	    $('.progress .progress-bar').progressbar({
	        transition_delay: 500
	    });
    }
    
    $(document).bind('scroll', function(ev) {
        var scrollOffset = $(document).scrollTop();
        var containerOffset = $section.offset().top - window.innerHeight;
        if (scrollOffset > containerOffset) {
            loadDaBars();
            // unbind event not to load scrolsl again
            $(document).unbind('scroll');
        }
    });

    /* Counters  */
    if ($(".section-counters .start").length>0) {
        $(".section-counters .start").each(function() {
            var stat_item = $(this),
            offset = stat_item.offset().top;
            $(window).scroll(function() {
                if($(window).scrollTop() > (offset - 1000) && !(stat_item.hasClass('counting'))) {
                    stat_item.addClass('counting');
                    stat_item.countTo();
                }
            });
        });
    };

	// another custom callback for counting to infinity
	$('#infinity').data('countToOptions', {
		onComplete: function (value) {
		  count.call(this, {
		    from: value,
		    to: value + 1
		  });
		}
	});

	$('#infinity').each(count);

	function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

    // Navigation overlay
    var s = skrollr.init({
            forceHeight: false,
            smoothScrolling: false,
            mobileDeceleration: 0.004,
            mobileCheck: function() {
                //hack - forces mobile version to be off
                return false;
            }
    });
    
});

document.addEventListener("DOMContentLoaded", function() {
    // Inicializar EmailJS
    emailjs.init("b8IR9DF02_MTyusTY"); // Reemplaza con tu Public Key

    // Seleccionar el formulario
    const form = document.getElementById("contact-form");
    const statusMessage = document.getElementById("status-message");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar recargar la página

        const phoneInput = document.querySelector('[name="phone"]');

        // Verificar si el campo "phone" cumple con el patrón de 10 números
        if (!phoneInput.checkValidity()) {
            // Mostrar SweetAlert con el mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Número inválido',
                text: 'Por favor ingresa un número de teléfono válido con 10 dígitos.',
                footer: '<a href="#">¿Necesitas ayuda?</a>'
            });
        } else {
            // Obtener los datos del formulario
            const serviceID = "service_fmncvwh";
            const templateID = "template_kktul9j";

            emailjs.sendForm(serviceID, templateID, form)
                .then(() => {
                    // Mensaje de éxito con SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: '¡Mensaje enviado!',
                        text: 'Me pondré en contacto contigo pronto.',
                        confirmButtonText: 'Entendido',
                        background: '#AEC6CF', // No esta directamente soportado en la configuración
                        color: '#fff', // Establecer color de texto (funciona bien)
                        confirmButtonColor: '#f0a500', // Color del botón
                        confirmButtonText: '<strong>Entendido</strong>',
                        padding: '2em',
                        width: '400px',
                        customClass: {
                            popup: 'popup-brutalist',
                            title: 'title-brutalist',
                            icon: 'icon-brutalist',
                            confirmButton: 'swal2-confirm'
                        }
                    });
                    
                    form.reset(); // Limpiar el formulario
                })
                .catch((error) => {
                    // Mensaje de error con SweetAlert
                    console.error("Error al enviar el formulario:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al enviar el mensaje. Por favor, inténtalo de nuevo.',
                        footer: '<a href="#">¿Necesitas ayuda?</a>'
                    });
                });
        }
    });
});

document.getElementById('test-alert').addEventListener('click', function() {
    Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Tu mensaje fue enviado con éxito. Me pondré en contacto contigo pronto.',
        confirmButtonText: 'Entendido',
        background: '#AEC6CF', // No esta directamente soportado en la configuración
        color: '#fff', // Establecer color de texto (funciona bien)
        confirmButtonColor: '#f0a500', // Color del botón
        confirmButtonText: '<strong>Entendido</strong>',
        padding: '2em',
        width: '400px',
        customClass: {
            popup: 'popup-brutalist',
            title: 'title-brutalist',
            icon: 'icon-brutalist',
            confirmButton: 'swal2-confirm'
        }
    });
});

