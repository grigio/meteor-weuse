// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
  service: "github"
});
ServiceConfiguration.configurations.insert({
  service: "github",
  clientId: Meteor.settings.github_client,
  secret: Meteor.settings.github_secret
});

console.log('=> Loading app settings');

if (Meteor.settings.github_client === undefined) {
  console.log('!!! you need to set an load a settings.json file !!!');
  // process.exit(1); // FIXME: the execution should be stopped
}