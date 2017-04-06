(function(window){
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    var Validation = {
        isCompanyEmail: function(email){
            return /.+@bignerdranch\.com$/.test(email);
        },
        isValid: function(isdecaf, strength){
            return !(/\bdecaf\b/.test(isdecaf) && strength > 20);
        },
        isExistingEmail: function(db) {
            var cb = function(serverResponse) {
                var email = $('#emailInput');
                if (serverResponse == null) {
                    console.log('no response');
                    email.get(0).setCustomValidity('');
                } else {
                    email.get(0).setCustomValidity(email.val()+ ' Already has an order Pending');
                }
            };

            $('#emailInput').on('input', function(event) {
                var email = event.target.value;
                db.get(email, cb);
            });
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);
