global.browser = require('webextension-polyfill')
const axios = require('axios')

chrome.runtime.onInstalled.addListener(function() {

    chrome.tabs.onRemoved.addListener(function( tabId,  removeInf) {
        console.log(tabId, removeInf)
        chrome.tabs.query({
            url: "https://*.tradingview.com/*"
        }, function(tabs) {
            if (tabs.length === 0) {
                chrome.storage.sync.set({shouldHanleAlert: false});
            }
        });
    })

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            hostEquals: "cn.tradingview.com"
                        }
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            hostEquals: "www.tradingview.com"
                        }
                    })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ])
    })

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          console.log(sender.tab ?
                      "from a content script:" + sender.tab.url :
                      "from the extension");

            if (request.type == "alert") {
                chrome.storage.sync.get(['webhookurl', 'shouldHanleAlert'], function(result) {
                    if (result) {
                        let webhookUrl = result.webhookurl
                        let shouldHanleAlert = result.shouldHanleAlert || false
                        if (webhookUrl && shouldHanleAlert) {
                            console.log(webhookUrl)
                            axios({
                                method: 'post',
                                url: webhookUrl,
                                data: request.title + " | " +  request.desc + " | " +  request.date
                            }).then(function(result) {
                                console.log(result)
                            }, function(reason) {
                                console.log(reason)
                            })
                        }
                    }
                }.bind(this));
            }
    });
})

