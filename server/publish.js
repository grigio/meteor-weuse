Meteor.publish("allUsers", function (opts) {
  var opts = opts || {};
  var search = (opts.filterGeohash) ? {geohash:opts.filterGeohash} : {};
  var userFields = {
    'profile.name':1, 'profile.geohash':1, 'profile.login':1, 'profile.location':1,
    'profile.avatar_url':1, 'profile.blog':1, 'profile.html_url':1,
    updatedAt:1
  };
  // userFields = {}
  // var res = Meteor.users.find( search ,{fields: userFields, sort:{updatedAt:-1} } );
  var res = Meteor.users.find( search ,{fields: userFields } );

  return res;
});