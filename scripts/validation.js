(function(window){
    'use strict';
    var App = window.App || {};
    var Validation = {
        isCompanyEmail: function(email){
            return /.+@bignerdranch\.com$/.test(email);
        },
        isValid: function(decaf, strength){
            if (decaf == 'decaf' && strength > 20) {
                return false;
            } else {
                return true;
            }
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);
