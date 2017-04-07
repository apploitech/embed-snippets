// Radial LiveChat Settings
window.liveChatSettings = {
  brandCode: 'NYCO', // The client's brand code
  buttonId: '573j0000000L9tF', // The button ID provided by SalesForce
  chatUrl: 'https://use.secure.force.com/ArticleSearch/apex/NYCOBrandChat', // The URL that the pre-chat form will submit to
  deploymentId: '572j0000000L8MJ', // The deployment ID provided by SalesForce
  deploymentScript: 'https://c.la2w2.salesforceliveagent.com/content/g/js/36.0/deployment.js', // The SalesForce deployment script
  endChat: {
    callback: null // A custom callback function to run when the chat session is ended by the agent or user
  },
  inChat: { // Settings related to the in-chat window
    callback: null // A custom callback function to be executed when chat starts
  },
  initUrl: 'https://d.la2w2.salesforceliveagent.com/chat', // The SalesForce initialize URL. This is used in the liveagent.init() call
  orgId: '00Dj0000000Jdpt', // The organization ID provided by SalesForce
  preChat: { // Settings related to the pre-chat window
    callback: function() { // A custom callback function to be executed when pre-chat starts
      // Tell the case agent what form factor the client has
      //$('#livechat-prechat-form').append('<input type="hidden" name="liveagent.prechat:Chat_Initiated_By" value="' + (isTablet ? "tablet" : (isMobile ? "mobile" : "desktop")) + '" />');
    }
  }
};
