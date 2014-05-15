var Pusher = require('pusher');

var pusher = new Pusher({
  appId: 'YOUR_APP_ID',
  key: 'YOUR_APP_KEY',
  secret: 'YOUR_APP_SECRET'
});

var items = [];

exports.items = function (req, res) {
  res.send(items);
};

exports.addItem = function (req, res) {
  var item = req.body.item;
  items.push(item);
  pusher.trigger('items', 'updated', item);
  res.send();
}