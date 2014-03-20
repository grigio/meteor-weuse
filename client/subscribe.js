Deps.autorun(function(){
  var allUsersSub = Meteor.subscribe('allUsers');

  if (allUsersSub.ready() && Session.get('mapsLoaded')){
      $('.loading').hide();
      if (typeof map !== 'undefined') {
        map.addMarkers(Meteor.users.find().fetch());
      }
    else {
      $('.loading').show();
    }
  }
});

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