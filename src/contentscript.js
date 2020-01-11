const axios = require('axios')
function inject() {
    const alertLogSection = document.querySelector(".widgetbar-widget-alerts_log")
    const config = {
        attributes: false,
        childList: true,
        subtree: true
    }
    
    const callback = function(mutationList, observer) {
        for(let mutation of mutationList) {
            if (mutation.type === 'childList') {
                if (mutation.target.tagName === "TBODY") {
                    const row = mutation.addedNodes[0]
                    if (row) {
                        const title = row.querySelector("*[data-name='alert-log-item-title']").innerText
                        const desc = row.querySelector("*[data-name='alert-log-item-desc']").innerText
                        const date = row.querySelector("*[data-name='alert-log-item-date']").innerText
                        console.log(title, desc, date)
                        const message = {
                            type: "alert",
                            title,
                            desc,
                            date
                        }
                        chrome.runtime.sendMessage(message, function(response) {
                            // no-op
                        });
                    }
                }
            }
        }
    }
    const observer = new MutationObserver(callback)
    observer.observe(alertLogSection, config)
}

window.onload = function() {
    inject();
};
