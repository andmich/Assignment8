(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        $('#strengthLabel').text('Caffeine Rating ' + 30);

        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        console.log(this.$formElement);

        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            if ($('#flavorShot').val() != 'none' && $('input[name=size]:checked').val() == 'zilla' && $('#strengthLevel').val() == 100) {
                if(!$('#pUp').is(':visible')) {
                    $('#myModal').modal('show');
                    $('#useAchievement').on('click', function() {
                        $('#pUp').css('display', 'block');
                    });
                    return;
                }
            }

            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data);

            this.reset();
        });
    };

    FormHandler.prototype.addSliderHandler = function() {
        $('#strengthLevel').change(function(event) {
            event.preventDefault();
            var s = $('#strengthLevel').val();
            var color = {};
            if (s <= 33) {
                color = 'green';
            }
            else if (s > 33 && s < 66) {
                color = 'orange';
            }
            else if (s >= 66) {
                color = 'red';
            }
            $('#strengthLabel').text('Caffeine Rating ' + s);
            $('#strengthLabel').css('color', color);
        });
    };

    FormHandler.prototype.addResetHandler = function() {
        this.$formElement.on('reset', function() {
            $('#strengthLabel').css('color', 'green');
            $('#strengthLabel').text('Caffeine Rating ' + 30);
            this.elements[0].focus();
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
