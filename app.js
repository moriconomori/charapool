var app = new Vue({
  el: '#app',
  data: {
    pools: ''
  },
  created: async function() {
    var pools = [];
    await axios.get('./api/pools.php')
      .then(function(res) {
        pools = res.data;
      })
      .catch(function(err) {
        console.log('Error!');
      });
    this.pools = pools;
  }
})
