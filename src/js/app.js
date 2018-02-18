App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    App.initPets();
    App.initWeb3();
    App.initContract();
    App.bindEvents();
  },

  initPets: function() {
    $.getJSON('../data.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].image);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });
  },

  initWeb3: function() {

  },

  initContract: function() {
    
  },

  markAdopted: function() {
    var petShopInstance;
    
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));
    var petShopInstance;

  },

  getPetShopBalance: function() {
    var petShopInstance;
    
  },

};
  
$(function() {
  $(window).on('load', (function() {
    App.init();
  }));
});
