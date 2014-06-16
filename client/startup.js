Router.map(function() {

  this.route('home', {
    path: '/',
    layoutTemplate: 'layout',
    template:'usersList',
    waitOn: function () {
      return Meteor.subscribe('allUsers');
    },

    data: function() {
      return Meteor.users.find();
    },
    
    fastRender: true,

    action: function () {
      if (this.ready()) {
        GAnalytics.pageview('/');
        $('.loading').hide();
        this.render();
      } else {
        $('.loading').show();
        // this.render('loading');
      } 
    }

  });
}); // router

initGMaps = function initGMaps() {
  // default values
  Session.setDefault('explore-mode', true);

  // Google Maps init
  GoogleMaps.init(
      {
          'sensor': false //optional
          // 'key': 'MY-GOOGLEMAPS-API-KEY', //optional
          // 'language': 'it' //optional
      }, 
      function(){
          var mapOptions = {
              zoom: 1,
              streetViewControl: false,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions); 
          map.setCenter(new google.maps.LatLng( 44.409689,8.353029 ));
          Session.set('mapLoaded', 'yes');

          markers = [];

        // map click event
        google.maps.event.addListener(map, 'click', function(ev) {

          if (!Session.get('explore-mode')) { 
            var selectedGeohash = geohash.encode(ev.latLng.lat(),ev.latLng.lng(),5);
            Session.set('selectedGeohash', selectedGeohash);
          }
          // console.log(geohash.encode(ev.latLng.lat(),ev.latLng.lng(),5));
        });

        map['addMarkers'] = function addMarkers(array){
          // console.log(array);
          this.removeMarkers();
          _.each(array, function (el) {

            // user hasn't set the geohash
            if (!el.profile.geohash)
              return;

            var coords = geohash.decode(el.profile.geohash);

            var marker = new google.maps.Marker({
              position: new google.maps.LatLng( coords[0], coords[1] ),
              map: map,
              id: el.profile.geohash,
              geohash: el.profile.geohash
            });

            // if (Meteor.user().profile.geohash === el.geohash) {
            //   marker.setIcon(icons.small_yellow);
            // } else {
            // }
            marker.setIcon(icons.small_red);

            // marker click event
            google.maps.event.addListener(marker, 'click', function() {
              if (map.getZoom() < 4) {
                map.setZoom(11);
              };
              map.setCenter(marker.getPosition());
              Session.set('selectedGeohash', marker.geohash);
            });

            markers.push( marker );
          });
        };

        map['removeMarkers'] = function removeMarkers(){
            for (var i = 0; i < markers.length; i++) {
              markers[i].setMap(null);
            }
            markers = [];
        };

        map['highlightId'] = function highlightId(id){
            for (var i = 0; i < markers.length; i++) {
                console.log('highlightId: '+id+' '+markers[i].id);
              if (markers[i].id === id){
                markers[i].setIcon('https://maps.gstatic.com/mapfiles/ms2/micons/blue-pushpin.png');
                map.setCenter(markers[i].position);
                return;
              }
            }
        };

        map['highlightGeohash'] = function highlightId(gh){

          //remove past selection
          for (var i = 0; i < markers.length; i++) {
            if (markers[i].selection) {
              markers[i].setMap(null);
              // NOTE: selection markers remain in the array
            };
          }

          var coords = geohash.decode(gh,5);
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng( coords[0], coords[1] ),
            map: map,
            id: gh,
            selection: true,
            geohash: gh
          });
          marker.setIcon('https://maps.gstatic.com/mapfiles/ms2/micons/blue-pushpin.png');
          map.panTo(marker.getPosition());

          markers.push( marker );    
        };


      }
  ); // end GMaps init

};