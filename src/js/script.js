$(document).ready(function(){
    // скрипт для карусели
    $('.carousel__inner').slick({
        speed: 1500,
        adaptiveHeight: true,
        // autoplay: true,
        // autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    dots: false,
                    arrows: false
                }
            },
        ]
    });
    // скрипт для табов
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    // скрипт для кнопки "подробнее" в табах
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // modal windows
    // выводим окно консультации при нажатии на кнопки с дата-аттрибутом consultation
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    // код для закрытия окон при нажатии на крестик
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    // открываем окно заказа после нажатия на кнопку покупки. выводится название выбраного товара
    $('.button_mini').each(function(i) {
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    // валидация форм jquery

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlenght: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlenght: jQuery.validator.format("Введите не менее {0} символов!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен почтовый адрес"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');
    // маска ввода номера (шаблон)
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // отправка почты с сайта, файлы мейлера на пхп, там написать свой логин и пароль почты а так же в строке setForm
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn(slow);
            $('form').trigger('reset');
        });
        return false;
    });
});