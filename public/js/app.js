angular.module('angularMeanPusherApp', [
  'ngRoute',
  'doowb.angular-pusher'
  ])
.config(function ($routeProvider, $httpProvider, PusherServiceProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    PusherServiceProvider
      .setToken('3fcfe807bf8637e26f4a')
      .setOptions({});
  })

angular.module('angularMeanPusherApp')
  .controller('MainCtrl', function ($scope, $http, Pusher) {
    $scope.items = [];

    console.log('Getting items');
    $http.get('/api/items').success(function (items) {
      $scope.items = items;
    });

    Pusher.subscribe('items', 'updated', function (item) {
      console.log('An item was added');
      $scope.items.push(item)
    });

    $scope.addItem = function() {
      console.log('Adding item');
      item = { message: "Here's another message" };
      $http.post('/api/items', {item: item});
    }
});