Meteor.publish("allUsers", function (opts) {
  var opts = opts || {};
  var search = (opts.filterGeohash) ? {geohash:opts.filterGeohash} : {};
  var res = Meteor.users.find( search ,{fields: {profile: 1, updatedAt:1}, sort:{updatedAt:-1} } );

  return res;
});