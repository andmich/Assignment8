(function(window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }

    Truck.prototype.createOrder = function(order) {
        console.log('Adding order to ' + order.emailAddress);
        this.db.add(order.emailAddress, order);
    };

    Truck.prototype.getAllOrders = function() {
        var custIdArray = Object.keys(this.db.getAll());

        var orders = 'Truck #ncc-1701 has pending orders: ';
        custIdArray.forEach(function(id) {
            orders = orders.concat(this.db.get(id).emailAddress + ' ' + this.db.get(id).coffee + ' | ');
        }.bind(this));

        console.log(orders);
        return orders;
    };

    Truck.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for ' + customerId);
        this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function() {
        var customerIdArray = Object.keys(this.db.getAll());

        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function(id) {
            console.log(this.db.get(id));
        }.bind(this));
    };

    App.Truck = Truck;
    window.App = App;
})(window);
