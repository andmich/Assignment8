var App = window.App;
//var Truck = window.App;
//var DataStore = window.DataStore;

var ds = new App.DataStore();
ds.add('m@bond.com', 'tea');
ds.add('james@bond.com', 'eshpressho');

//test DataStore()
QUnit.test('DataStore', function( assert ) {
    var obj = {'m@bond.com': 'tea', 'james@bond.com': 'eshpressho'};
    assert.deepEqual(obj, ds.getAll(), 'getAll() returned successfully');
    assert.equal(ds.get('m@bond.com'), 'tea', 'get(\'m@bond.com\') - Passed');
    ds.remove('james@bond.com');
    obj = {'m@bond.com': 'tea'};
    assert.deepEqual(obj, ds.getAll(), 'getAll() without james@bond.com successfully');
    assert.equal(ds.get('james@bond.com'), undefined, 'get(\'james@bond.com\') -> undefined - Passed');
});

//test Truck()
QUnit.test('Truck getAllOrders()', function(assert) {
    var newTruck = new App.Truck('ncc-1701', new App.DataStore());
    newTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
    newTruck.createOrder({ emailAddress: 'dr@no.com', coffee: 'decaf'});
    newTruck.createOrder({ emailAddress: 'm@bond.com', coffee: 'earl grey'});

    newTruck.getAllOrders();

    assert.equal(newTruck.getAllOrders(), 'Truck #ncc-1701 has pending orders: me@goldfinger.com double mocha | dr@no.com decaf | m@bond.com earl grey | ', newTruck.getAllOrders());

    newTruck.deliverOrder('dr@no.com');
    newTruck.deliverOrder('m@bond.com');

    assert.equal(newTruck.getAllOrders(), 'Truck #ncc-1701 has pending orders: me@goldfinger.com double mocha | ', newTruck.getAllOrders());

    //The problem that I ran into was that printOrders() would return an Object. So checking proved to be difficult
    //What I did to solve the problem was to
    //created a separate getAllOrders() which returns a string of all current orders under the given object
});
