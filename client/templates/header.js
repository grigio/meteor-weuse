Template.header.helpers({
  'editMode': function () {
    return !Session.get('explore-mode');
  }
});

Template.header.events({
  'click .js-toggle-explore': function () {
    if ( Session.get('explore-mode') ){
      Session.set('explore-mode', false);
    } else {
      Session.set('explore-mode', true);
    }
  }
});