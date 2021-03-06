// This sample demonstrates registering a callback with the DXL fabric to
// receive threat events when ePO sends them. The topic and payload for each
// event which is received is displayed in JSON format.

'use strict'

var common = require('../common')
var dxl = common.require('@opendxl/dxl-client')
var MessageUtils = common.require('@opendxl/dxl-bootstrap').MessageUtils
var EpoClient = common.require('@opendxl/dxl-epo-client').EpoClient

// Create DXL configuration from file
var config = dxl.Config.createDxlConfigFromFile(common.CONFIG_FILE)

// Create the client
var client = new dxl.Client(config)

// Connect to the fabric, supplying a callback function which is invoked
// when the connection has been established
client.connect(function () {
  // Create the ePO client
  var epoClient = new EpoClient(client)

  // Register the ePO threat event callback with the client
  epoClient.addThreatEventCallback(function (threatEventObj, originalEvent) {
    // Display the DXL topic that the event was received on
    console.log('Threat event on topic: ' + originalEvent.destinationTopic)

    // Dump the threat event object
    console.log(MessageUtils.objectToJson(threatEventObj, true))
  })

  // Wait forever
  console.log('Waiting for threat event notifications...')
})
