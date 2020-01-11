<template>
  <div>
    <div class="info-input">
      <label class="info-input-label" for="webhook-input">webhook (POST)</label>
      <input type="text" v-model="webhook" id="webhook-input">
      <button v-on:click="updateWebhookaddr">update</button>
    </div>
    <div>
      <span>start</span>
      <input type="checkbox" name="" id="" v-model="toggle">
    </div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
        webhook: "",
        toggle: false
    }
  },

  created: function () {
    chrome.storage.sync.get(['webhookurl', 'shouldHanleAlert'], function(result) {
      if (result) {
        if (result.webhookurl !== undefined) {
          this.webhook = result.webhookurl
        }
        if (result.shouldHanleAlert !== undefined) {
          this.toggle = result.shouldHanleAlert 
        }
      }
    }.bind(this));


  },
  methods: {
    updateWebhookaddr () {
      chrome.storage.sync.set({webhookurl: this.webhook});
    }
  },
  watch: {
    toggle: function(val) {
      chrome.storage.sync.set({shouldHanleAlert: this.toggle});
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}

.info-input {
  display: flex;
  .info-input-label {
    width: 100px;
  }
  #webhook-input {
    width: 200px;
  }
}
</style>
