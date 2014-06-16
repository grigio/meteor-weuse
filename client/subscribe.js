Deps.autorun(function(){
  if (Session.equals('mapLoaded', 'dom')) {
    initGMaps();
  }

  if (Session.equals('mapLoaded', 'yes')) {
    map.addMarkers(Meteor.users.find().fetch());
  }

});

// Select Geohash if possible
Deps.autorun(function(){
  var gh = Session.get('selectedGeohash');
  if (typeof map !== 'undefined') {
    if (gh)
      map.highlightGeohash(gh); // highlight or add marker
  }
});




// just for testing the account-password package
Accounts.ui.config({
  // requestPermissions: {
  //   github: ['user']
  // },
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});