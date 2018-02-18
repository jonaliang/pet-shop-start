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
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    web3 = new Web3(App.web3Provider);
  },

  initContract: function() {
    $.getJSON('PetShop.json', function(data) {
      var PetShopArtifact = data;

      App.contracts.PetShop = TruffleContract(PetShopArtifact);
      App.contracts.PetShop.setProvider(App.web3Provider);
    
      App.markAdopted();
    });
  },

  markAdopted: function() {
    var petShopInstance;

    App.contracts.PetShop.deployed().then(function(instance) {
      petShopInstance = instance;

      return petShopInstance.getPets.call();
    }).then(function(pets) {
      for (i = 0; i < pets.length; i++) {
        if (pets[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Adopted').attr('class', 'btn btn-secondary btn-adopt').attr('disabled', true); 
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));
    var petShopInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) console.log(error);
    
      var account = accounts[0];
    
      App.contracts.PetShop.deployed().then(function(instance) {
        petShopInstance = instance;
    
        return petShopInstance.adopt(petId, {from: account, value: web3.toWei(1, 'ether')});
      }).then(function(result) {
        App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getPetShopBalance: function() {
    var petShopInstance;

    App.contracts.PetShop.deployed().then(function(instance) {
      petShopInstance = instance;

      return petShopInstance.getBalance.call();
    }).then(function(data) {
      console.log(data.toNumber());
    }).catch(function(err) {
      console.log(err.message);
    });
  },

};
  
$(function() {
  $(window).on('load', (function() {
    App.init();
  }));
});
