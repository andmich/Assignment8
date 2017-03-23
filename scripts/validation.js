(function(window){
    'use strict';
    var App = window.App || {};
    var Validation = {
        isCompanyEmail: function(email){
            return /.+@bignerdranch\.com$/.test(email);
        },
        isValid: function(isdecaf, strength){
            return !(/\bdecaf\b/.test(isdecaf) && strength > 20);
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);
