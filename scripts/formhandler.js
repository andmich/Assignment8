(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
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

            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
            });
            fn(data);
            this.reset();
        });
    };

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('setting input handler from form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.addOrderListener = function(fn) {
        this.$formElement.on('input', '[name="coffee"]', function(event) {
            var order = event.target.value;
            var strength = $('#strengthLevel').val();
            console.log(strength);
            var message = '';
            console.log(order, strength);
            if (fn(order, strength)) {
                event.target.setCustomValidity('');
            } else {
                message = 'strength must be below 20!';
                event.target.setCustomValidity(message);
            }
        });

        this.$formElement.on('input', '[name="strength"]', function(event) {
            var strength = event.target.value;
            var order = $('#coffeeOrder').val();
            var message = ' ';
            console.log(order, strength);
            if(fn(order, strength)) {
                document.getElementById('coffeeOrder').setCustomValidity('');
            } else {
                message = 'value cannot be greater than ' + 20;
                document.getElementById('coffeeOrder').setCustomValidity(message);
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
