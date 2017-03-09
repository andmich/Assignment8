var App = window.App;
var Truck = window.App;
var DataStore = window.DataStore;

//for DataStore() test
var ds = new App.DataStore();
ds.add('m@bond.com', 'tea');
ds.add('james@bond.com', 'eshpressho');

QUnit.test('DataStore', function( assert ) {
    var obj = {'m@bond.com': 'tea', 'james@bond.com': 'eshpressho'};
    assert.equal(ds.get('m@bond.com'), 'tea', 'get(\'m@bond.com\') - Passed');
    assert.equal(ds.get('james@bond.com'), 'eshpressho', 'get(\'james@bond.com\') - Passed');
    assert.deepEqual(obj, ds.getAll(), 'getAll() returned successfully');
});

QUnit.test('Truck getAllOrders()', function(assert) {
    var newTruck = new App.Truck('ncc-1701', new App.DataStore());
    newTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
    newTruck.createOrder({ emailAddress: 'dr@no.com', coffee: 'decaf'});
    newTruck.createOrder({ emailAddress: 'm@bond.com', coffee: 'earl grey'});

    newTruck.getAllOrders();

    assert.equal(newTruck.getAllOrders(), 'Truck #ncc-1701 has pending orders: me@goldfinger.com double mocha | dr@no.com decaf | m@bond.com earl grey | ', newTruck.getAllOrders());
});
