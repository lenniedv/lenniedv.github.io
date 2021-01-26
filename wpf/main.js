var sassConfig = {"colors":{"primaryColor":"#F5B430","secondaryColor":"#D12F1F","brandGrey":"#666666","brandGreen":"#3D9E93"},"defaultWidth":"123px"};
var app = angular.module('infoSlipsApp', ['ui.router', 'viewCache', 'ui.bootstrap', 'ngAnimate', 'AngularPrint', 'chart.js']);

angular.module('infoSlipsApp').config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise(function($injector) {
    var $state = $injector.get('$state');
    $state.go('home');
  });

  $stateProvider
    .state('home', {
      templateUrl: 'views/home.html',
      controller: 'homeController',
      controllerAs: 'homeCtrl',
      activeTab: 'home'
    })
    .state('transactionStatement', {
      templateUrl: 'views/transactionStatement.html',
      controller: 'transactionStatementController',
      controllerAs: 'transactionStatementCtrl',
      activeTab: 'transactionStatement'
    })
    .state('yourdetails', {
      templateUrl: 'views/yourdetails.html',
      controller: 'yourdetailsController',
      controllerAs: 'yourdetailsCtrl',
      activeTab: 'yourdetails'
    })
    .state('print', {
      templateUrl: 'print.htm',
      controller: 'printController',
      controllerAs: 'printCtrl',
      activeTab: 'print'
    });
});
angular.module('infoSlipsApp').service('dataService', function($window, $timeout, $http, $filter) {
	/* jshint ignore:start */
	// Ignore the variable not declared warining -- the processData is injected by the system
	this.processedData = processedData;
	// this.sassConfig = sassConfig || {};
	/* jshint ignore:end */
  var self = this;
  self.client = this.processedData.Client.Detail;
  self.viewerUrl = this.viewerUrl;
  self.language = this.processedData.Client.Detail.Language;
  
  self.showArchive = false;

	self.transactions = [];
	self.getTransactions = function(){
    	if(self.transactions.length == 0){
        	_.each(self.processedData.Client.Portfolios, function(transaction){

          	self.transactions.push(
              _.chain(transaction.Fund)
              .value()
            );

        	});
    	}
    
    	return self.transactions;
	};

	self.assetAllocation = [];
	self.getFundAssetAllocation = function(){
    	if(self.assetAllocation.length == 0){
      	_.each(self.processedData.Client.Portfolios, function(asset){

            if(asset.AssetAlloc){
          		self.assetAllocation.push(
                _.chain(asset.AssetAlloc).value()
              );
            }

      	})
    	}
    
    	return self.assetAllocation;
	};
  self.getYear = function(date){

    var year = date.substring(date.length, date.length - 4);

    return year;

  };

  self.it3s = '';
  self.it3b = '';
  self.it3c = '';
  self.it3f = '';
  self.PAYECert = '';

  self.getTax = function(){

    _.each(self.processedData.Client.Portfolios, function(tax){

      if(tax.IT3S){
        self.it3s = tax.IT3S;
      }

      if(tax.IT3B){
        self.it3b = tax.IT3B;
      }

      if(tax.IT3C){
        self.it3c = tax.IT3C;
      }

      if(tax.RAContrib){
        self.it3f = tax.RAContrib;
      }

      if(tax.PAYECert){
        self.PAYECert = tax.PAYECert;
      }

    })

  };

  self.getTax();  


  //ADD TRACKING
  self.ifsTrack = function(clickName) {

    jQuery.support.cors = true;

    try {
      var serverURL = "https://viewer.infoslips.com/api/hotspot/PUT/";
      var unescapedID = unescape(v5Link.substring(v5Link.indexOf("=") + 1));
      var hotSpotData = { Id: unescapedID, Data: clickName + ',0,0' };

      $.ajax({
        url: serverURL,
        crossDomain: true,
        data: hotSpotData,
        dataType: 'jsonp',
        success: function (data) {
         },
        error: function (error) { 
        }
      });

    }catch (e){
      // console.log(e);
    }
  };

  self.ifsTrack('Open');
	
});
angular.module('infoSlipsApp').controller('archiveController', ['dataService', '$sce', function (dataService, $sce) {
	
	var controller = this;
	controller.model = dataService.processedData;
	
	//gets the historyURL from index, which gets it from StaticData
	controller.historyUrl = historyUrl;

	controller.formatChars = function(string){
		var value = string.replace('&amp;', '&');
		return value
	};

	controller.displayArchiveTable = function(){
		dataService.showArchive = true;
		controller.archiveURL = $sce.trustAsResourceUrl(controller.formatChars(controller.historyUrl));
		controller.showArchive = dataService.showArchive;
	};

}]);


angular.module('infoSlipsApp').controller('assetsController', ['dataService','$filter', '$timeout', function (dataService, $filter, $timeout) {

    var controller = this;
    controller.model = dataService.processedData;
    controller.dataService = dataService;

    controller.client = controller.model.Client.Detail;
    controller.assetTotal = controller.model.Client.AssetTotal;
    controller.Totals = controller.model.Client.Totals;

    controller.Portfolios = controller.model.Client.Portfolios;

    controller.language = controller.client.Language;


    controller.fundAssetTotal = [];
    controller.getFundAssetTotal = function(){
        if(controller.fundAssetTotal.length == 0){
            _.each(controller.model.Client.Portfolios, function(asset){

                //if(asset.AssetTotal !== undefined){

                    controller.fundAssetTotal.push(
                        _.chain(asset.AssetTotal).value()
                    );

                //};

            })
        }
        
        return controller.fundAssetTotal;
    }


    controller.addSpace = function(string){
        //insert a string between each occurance of a lower case character followed by an upper case character
        string = string.replace(/([a-z])([A-Z])/g, '$1 $2'); 
        return string;
    }


    controller.newDate = function(date){
        var day = $filter('limitTo')(date, 2, 0);
        var month = $filter('limitTo')(date, 2, 3);
        var year = $filter('limitTo')(date, 4, 6);

        var newDate = new Date(year + '-' + month + '-' + day);

        return newDate;
    }

    //Return custom string based on the Portfolio Type
    controller.portfolioType = function(portfolio){

        portfolio = portfolio.toLowerCase();

        if(portfolio == 'pension' || portfolio == 'pensioen'){

            if(controller.language == 'ENG'){
              return 'Retirement portfolio';
            }
            else if(controller.language == 'AFR'){
              return 'Aftreeportefeulje';
            }
        }

        if(portfolio == 'unit trust' || portfolio == 'effektetrust'){

            if(controller.language == 'ENG'){
              return 'Standard Portfolio';
            }
            else if(controller.language == 'AFR'){
              return 'Standaard-effektetrustportefeulje';
            }
        }

    }
    

    controller.fundObject = [];
    controller.createFundObject = function(){
        if(controller.fundObject.length == 0){
            _.each(controller.getFundAssetTotal(), function(fund){

                controller.fundObject.push(
                    _.chain(fund)
                    .map(function(item, value) {
                        return {
                            LocalEquity: fund.LocalEquity,
                            LocalProperty: fund.LocalProperty,
                            LocalCash: fund.LocalCash,
                            LocalBond: fund.LocalBond,
                            ForeignEquity: fund.ForeignEquity,
                            ForeignOther: fund.ForeignOther,
                            AfricaTotal: fund.AfricaTotal
                        }
                    })
                    .value());

            });            
        }
        return controller.fundObject;
    }


    controller.gridData = [];
    controller.getGridData = function(){
        if(controller.gridData.length == 0){

            _.each(controller.createFundObject(), function(fund){

                controller.gridData.push(
                    _.chain(fund)
                    .map(function(item, value) {
                        var array = [];
                        _.each(item, function(value, item){
                            array.push({
                                'Source': item,
                                'Percentage': Number(value)
                            })
                        })
                        return array;
                    })
                    .flatten()
                    .groupBy('Source')
                    .mapObject(function(val, key){
                        var values = _.pluck(val, 'Percentage');
                        var total = _.reduce(values, function(memo, num){
                                        return memo + num / val.length;
                                    }, 0).toFixed(2);
                        return total;
                    })
                    .mapObject(function(val, key){
                        return{
                            'Source': key,
                            'Percentage': val
                        }
                    })
                    .toArray()
                    .value()

                )
            })

        };

        _.each(controller.gridData, function(obj){

            _.each(obj, function(item){

                switch(item.Source){

                    case 'LocalEquity':
                        if(controller.language == 'ENG'){
                            item.Source = 'Local Equity'
                        }
                        else item.Source = 'Plaaslike Aandele'
                        break;

                    case 'LocalProperty':
                        if(controller.language == 'ENG'){
                            item.Source = 'Local Property'
                        }
                        else item.Source = 'Plaaslike Eiendom'
                        break;

                    case 'LocalCash':
                        if(controller.language == 'ENG'){
                            item.Source = 'Local Money Market'
                        }
                        else item.Source = 'Plaaslike Geldmark'
                        break;

                    case 'LocalBond':
                        if(controller.language == 'ENG'){
                            item.Source = 'Local Fixed Interest'
                        }
                        else item.Source = 'Plaaslike Vaste Rente'
                        break;

                    case 'ForeignEquity':
                        if(controller.language == 'ENG'){
                            item.Source = 'Foreign Equity'
                        }
                        else item.Source = 'Buitelandse Aandele'
                        break;

                    case 'ForeignOther':
                        if(controller.language == 'ENG'){
                            item.Source = 'Foreign Other'
                        }
                        else item.Source = 'Buitelandse Ander'
                        break;

                    case 'AfricaTotal':
                        if(controller.language == 'ENG'){
                            item.Source = 'Africa Total'
                        }
                        else item.Source = 'Afrika Totaal'
                        break;

                }

            });

        });

        return controller.gridData;
    }


                            
                   
    controller.gridLabels = [];
    controller.getGridLabels = function(){

        if(controller.gridLabels.length == 0){

            _.each(controller.getGridData(), function(data){

                controller.gridLabels.push(
                    _.pluck(data, 'Source')
                );

            })

        }
        
        return controller.gridLabels;

    }



    controller.gridValue = [];
    controller.getGridValue = function(){

        if(controller.gridValue.length == 0){

            _.each(controller.getGridData(), function(data){

                controller.gridValue.push(
                    _.pluck(data, 'Percentage')
                );

            });

        }
        
        return controller.gridValue;

    }


    controller.gridColors = ['#027864','#6ab90d','#830051','#00b0ca','#ea7125','#8ecabb','#fac28f','#a5e8e8','#ffe88e','#e3e3e3','#cfeab1']
    controller.gridOptions = {
        responsive: true,
        maintainAspectRatio: true,
        segmentShowStroke : false,
        elements: { 
            arc: { 
                borderWidth: 0 
            } 
        },
        tooltips:{
            enabled: true,
            callbacks: {
                title: function(tooltipItem, data) {
                    return controller.addSpace(data.labels[tooltipItem[0].index]);
                },
                label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                },
            }
        }
    };


}]);


angular.module('infoSlipsApp').controller('contactController', ['dataService', function (dataService) {
	
	var controller = this;
	controller.model = dataService.processedData;

}]);


angular.module('infoSlipsApp').controller('homeController', ['dataService', '$filter', '$window', function (dataService, $filter, $window) {
	
	var controller = this;

  	controller.dataService = dataService;	
  	controller.model = dataService.processedData;

    controller.client = controller.model.Client.Detail;

    if($window.contentUrl === undefined){
    	controller.imageUrl = 'signature_elize.jpg';
    }
    else{
    	controller.imageUrl = $window.contentUrl + 'signature_elize.jpg';
    }

    

  	controller.newDate = function(date){
	    var day = $filter('limitTo')(date, 2, 0);
	    var month = $filter('limitTo')(date, 2, 3);
	    var year = $filter('limitTo')(date, 4, 6);

	    var newDate = new Date(year + '-' + month + '-' + day);

	    return newDate;
  	}

}]);
angular.module('infoSlipsApp').controller('infoslipController', ['dataService','$location', '$scope', '$filter', function (dataService, $location, $scope, $filter) {

  var controller = this;
  controller.dataService = dataService;
  controller.model = dataService.processedData; 
  controller.isNavCollapsed = true;      
  controller.systemMonthOutcome = '';
  controller.systemMonthOutcomeShort = '';
  controller.finalDateLong = '';
  controller.finalDateShort = '';
  controller.language = controller.model.Client.Detail.Language;
  controller.client = controller.model.Client.Detail;
  controller.SystemDate = controller.model.Client.Detail.SystemDate;

  // show/hide tabs
  controller.showFinanciallyTalkingTab = true;
  controller.showLetterFromRetirementFund = true;
  controller.showAnnualReportTab = false;
  controller.isDefined = function(value){

    if(value.length > 0){
      return true;
    }
    else return false;

  };

  controller.setTab = function (tabName) {
    controller.selectedTab = tabName;
  };

  controller.isTabSelected = function (path) {
    var tab = $location.path().substr(0, path.length) === path;
    return tab;
  };


  controller.closeDropdown = function(){

    if( screen.width >= 320 && screen.width <= 768 )  {
    		angular.element('.navbar-toggle').click();
    }

  };

  //NGInclude pages
  controller.loadLanding = function(){
    return 'views/landing.html';
  };

  controller.displayPageHome = function(){
    if(controller.language == 'ENG'){
      return 'views/partial/homeENG.html';
    }
    if(controller.language == 'AFR'){
      return 'views/partial/homeAFR.html';
    }
  };

  controller.displayPageTax = function(){
    if(controller.language == 'ENG'){
      return 'views/partial/taxENG.html';
    }
    if(controller.language == 'AFR'){
      return 'views/partial/taxAFR.html';
    }
  };

  controller.displayPageContact = function(){
    if(controller.language == 'ENG'){
      return 'views/partial/contactEng.html';
    }
    if(controller.language == 'AFR'){
      return 'views/partial/contactAFR.html';
    }
  };

  controller.displayPageTransactionStatement = function(){
    if(controller.language == 'ENG'){
      return 'views/partial/transactionStatementENG.html';
    }
    if(controller.language == 'AFR'){
      return 'views/partial/transactionStatementAFR.html';
    }
  };

  controller.displayPageAssets = function(){
    if(controller.language == 'ENG'){
      return 'views/partial/assetsENG.html';
    }
    if(controller.language == 'AFR'){
      return 'views/partial/assetsAFR.html';
    }
  };

  controller.displayPageYourDetails = function(){
    if(controller.language == 'ENG'){
      return 'views/partial/yourDetailsENG.html';
    }
    if(controller.language == 'AFR'){
      return 'views/partial/yourDetailsAFR.html';
    }
  };

  controller.displayPageUpdateInvestments = function(){
    if(controller.language == 'ENG'){
      return 'views/partial/updateInvestmentsENG.html';
    }
    if(controller.language == 'AFR'){
      return 'views/partial/updateInvestmentsAFR.html';
    }
  };

  controller.displayPageTaxFreeInvestments = function(){
    if(controller.language == 'ENG'){
      return 'views/partial/taxFreeInvestmentsENG.html';
    }
    if(controller.language == 'AFR'){
      return 'views/partial/taxFreeInvestmentsAFR.html';
    }
  };

   controller.displayPageArchive = function(){
    if(controller.language == 'ENG'){
      return 'views/partial/archiveENG.html';
    }
    if(controller.language == 'AFR'){
      return 'views/partial/archiveAFR.html';
    }
  };



  controller.newDate = function (date) {
    var day = date.substr(8, 10);
    var month = date.substr(3, 2);
    var year = date.substr(6, 4);

    var fullDate = '';
    fullDate += year + '-';
    fullDate += month + '-';
    fullDate += day;
  
    
    var newDate = new Date(fullDate);
    
    return newDate;
};
  

controller.returnDateLanguage = function (date) {
  var newDate = controller.newDate(date);

  newDate = $filter('date')(newDate, 'dd MMMM yyyy');

  var day = newDate.substr(0, newDate.indexOf(' '));
  var month = newDate.substr(newDate.indexOf(' ') + 1, newDate.length - 8);
  var year = newDate.substr(newDate.length - 4, newDate.length);

  if (controller.language == 'AFR') {

      switch (month) {

          case 'January':
              month = 'Januarie';
              break;

          case 'February':
              month = 'Februarie';
              break;

          case 'March':
              month = 'Maart';
              break;

          case 'May':
              month = 'Mei';
              break;

          case 'June':
              month = 'Junie';
              break;

          case 'July':
              month = 'Julie';
              break;

          case 'August':
              month = 'Augustus';
              break;

          case 'October':
              month = 'Oktober';
              break;

          case 'December':
              month = 'Desember';
              break;

              return month;
      }


  } //end if AFR

  newDate = day + ' ' + month + ' ' + year;

  return newDate;
};

controller.getSystemMonth = function(str) {
  return str.split('/')[1];
  }
  controller.getSystemDay = function(str) {
  return str.split('/')[0];
  }
  controller.getSystemYear = function(str) {
  return str.split('/')[2];
  }
  
  if (controller.language == 'AFR'){
      switch (controller.getSystemMonth(controller.SystemDate)) {

          case '01':
              controller.systemMonthOutcome = 'Januarie';
              break;

          case '02':
              controller.systemMonthOutcome = 'Februarie';
              break;

          case '03':
              controller.systemMonthOutcome = 'Maart';
              break;

          case '04':
              controller.systemMonthOutcome = 'April';
              break;

          case '05':
              controller.systemMonthOutcome = 'Mei';
              break;

          case '06':
              controller.systemMonthOutcome = 'Junie';
              break;

          case '07':
              controller.systemMonthOutcome = 'Julie';
              break;

          case '08':
              controller.systemMonthOutcome = 'Augustus';
              break;
          
          case '09':
              controller.systemMonthOutcome = 'September';
              break;

          case '10':
              controller.systemMonthOutcome = 'Oktober';
              break;

          case '11':
              controller.systemMonthOutcome = 'November';
              break;

          case '12':
              controller.systemMonthOutcome = 'Desember';
              break;

              return controller.systemMonthOutcome;
      }
  } else {
      switch (controller.getSystemMonth(controller.SystemDate)) {

          case '01':
              controller.systemMonthOutcome = 'January';
              break;

          case '02':
              controller.systemMonthOutcome = 'February';
              break;

          case '03':
              controller.systemMonthOutcome = 'March';
              break;

          case '04':
              controller.systemMonthOutcome = 'April';
              break;

          case '05':
              controller.systemMonthOutcome = 'May';
              break;

          case '06':
              controller.systemMonthOutcome = 'June';
              break;

          case '07':
              controller.systemMonthOutcome = 'July';
              break;

          case '08':
              controller.systemMonthOutcome = 'August';
              break;
          
          case '09':
              controller.systemMonthOutcome = 'September';
              break;

          case '10':
              controller.systemMonthOutcome = 'October';
              break;

          case '11':
              controller.systemMonthOutcome = 'November';
              break;

          case '12':
              controller.systemMonthOutcome = 'December';
              break;

              return controller.systemMonthOutcome;
      }
  }

  if (controller.language == 'AFR'){
      switch (controller.getSystemMonth(controller.SystemDate)) {

          case '01':
              controller.systemMonthOutcomeShort = 'Jan';
              break;

          case '02':
              controller.systemMonthOutcomeShort = 'Feb';
              break;

          case '03':
              controller.systemMonthOutcomeShort = 'Mar';
              break;

          case '04':
              controller.systemMonthOutcomeShort = 'Apr';
              break;

          case '05':
              controller.systemMonthOutcomeShort = 'Mei';
              break;

          case '06':
              controller.systemMonthOutcomeShort = 'Jun';
              break;

          case '07':
              controller.systemMonthOutcomeShort = 'Jul';
              break;

          case '08':
              controller.systemMonthOutcomeShort = 'Aug';
              break;
          
          case '09':
              controller.systemMonthOutcomeShort = 'Sep';
              break;

          case '10':
              controller.systemMonthOutcomeShort = 'Okt';
              break;

          case '11':
              controller.systemMonthOutcomeShort = 'Nov';
              break;

          case '12':
              controller.systemMonthOutcomeShort = 'Des';
              break;

              return controller.systemMonthOutcomeShort;
      }
  } else {
      switch (controller.getSystemMonth(controller.SystemDate)) {

          case '01':
              controller.systemMonthOutcomeShort = 'Jan';
              break;

          case '02':
              controller.systemMonthOutcomeShort = 'Feb';
              break;

          case '03':
              controller.systemMonthOutcomeShort = 'Mar';
              break;

          case '04':
              controller.systemMonthOutcomeShort = 'Apr';
              break;

          case '05':
              controller.systemMonthOutcomeShort = 'May';
              break;

          case '06':
              controller.systemMonthOutcomeShort = 'Jun';
              break;

          case '07':
              controller.systemMonthOutcomeShort = 'Jul';
              break;

          case '08':
              controller.systemMonthOutcomeShort = 'Aug';
              break;
          
          case '09':
              controller.systemMonthOutcomeShort = 'Sep';
              break;

          case '10':
              controller.systemMonthOutcomeShort = 'Oct';
              break;

          case '11':
              controller.systemMonthOutcomeShort = 'Nov';
              break;

          case '12':
              controller.systemMonthOutcomeShort = 'Dec';
              break;

              return controller.systemMonthOutcomeShort;
      }
  }

  controller.finalDateLong = controller.getSystemDay(controller.SystemDate) + ' ' + controller.systemMonthOutcome + ' ' + controller.getSystemYear(controller.SystemDate);
  controller.finalDateShort = controller.getSystemDay(controller.SystemDate) + ' ' + controller.systemMonthOutcomeShort + ' ' + controller.getSystemYear(controller.SystemDate);

}]);
angular.module('infoSlipsApp').controller('modalController', ['dataService','$uibModalInstance','$window', function (dataService, $uibModalInstance, $window) {

	var controller = this;
  	controller.dataService = dataService;
  	controller.model = dataService.processedData;


  	controller.openState = {
    	0:true
  	};

	controller.closeModal = function(){
		$uibModalInstance.dismiss();
	}

	

}]);

angular.module('infoSlipsApp').controller('printController', ['dataService', '$filter', '$window', function (dataService, $filter, $window) {

    var controller = this;

    controller.dataService = dataService;

    controller.model = dataService.processedData;

    controller.SystemDate = controller.model.Client.Detail.SystemDate;
    controller.client = controller.model.Client.Detail;
    controller.Portfolios = controller.model.Client.Portfolios;
    controller.Totals = controller.model.Client.Totals;
    controller.language = controller.client.Language;
    controller.systemMonthOutcome = '';
    controller.systemMonthOutcomeShort = '';
    controller.finalDateLong = '';
    controller.finalDateShort = '';

    controller.investmentType = [];
    controller.getInvestmentType = function () {

        if (controller.investmentType.length == 0) {

            _.each(controller.model.Client.Portfolios, function (investment) {

                controller.investmentType.push(

                    _.chain(investment.Fund)
                    .mapObject(function (item) {

                        var OpeningBal = {
                            'Date': item.OpeningBal.Date,
                            'NoOfUnits': item.OpeningBal.NoOfUnits,
                            'UnitPrice': item.OpeningBal.UnitPrice,
                            'MarketValue': item.OpeningBal.MarketValue
                        };

                        var FundDetail = {
                            'FundName': item.FundDetail.FundName,
                            'AccountDescription': item.FundDetail.AccountDescription,
                            'AccountNumber': item.FundDetail.AccountNumber,
                            'Product': item.FundDetail.Product,
                            'AmountInvested': item.FundDetail.AmountInvested,
                            'AccGroup': item.FundDetail.AccGrp,
                            'AccGroupNo': item.FundDetail.AccGrpNo,
                            'ServicingAgentName': item.FundDetail.ServicingAgentName,
                            'TINCode': item.FundDetail.TINCode
                        };

                        var Transaction = _.each(item.Transaction,
                            function (item) {
                                return {
                                    'Date': item.Date,
                                    'Description': item.Description,
                                    'NoOfUnits': item.NoOfUnits,
                                    'UnitPrice': item.UnitPrice,
                                    'NetAmount': item.NetAmount
                                };
                            }
                        );

                        var ClosingBal = {
                            'Date': item.ClosingBal.Date,
                            'NoOfUnits': item.ClosingBal.NoOfUnits,
                            'UnitPrice': item.ClosingBal.UnitPrice,
                            'MarketValue': item.ClosingBal.MarketValue

                        };

                        var eacTable = investment.EACTable;

                        return {
                            'FundDetail.Product': item.FundDetail.Product,
                            'OpeningBal': OpeningBal,
                            'FundDetail': FundDetail,
                            'Transaction': Transaction,
                            'ClosingBal': ClosingBal,
                            'eacTable': eacTable
                        }

                    })
                    .groupBy('FundDetail.Product')
                    .value()

                );

            });

        } //end if

        return controller.investmentType;
    };

    controller.marketValue = [];
    controller.getMarketValue = function () {

        if (controller.marketValue.length == 0) {

            _.each(controller.dataService.getTransactions(), function (item) {

                controller.marketValue.push(
                    _.chain(item)
                    .map(function (value) {
                        return value.ClosingBal.MarketValue
                    })
                    .value()
                )

            });
        }

        return controller.marketValue;

    }

    //Calculate total Holdings Value based on all Portfolio Closing Values
    controller.portfolioClosingValues = [];
    controller.getPortfolioClosingValues = function () {

        if (controller.portfolioClosingValues == 0) {

            _.each(controller.getMarketValue(), function (balance) {

                controller.portfolioClosingValues.push(

                    _.reduce(balance, function (memo, num) {
                        return Number(memo) + Number(num);
                    }, 0)

                )

            })
        }

        return controller.portfolioClosingValues;
    };


    //This function takes value(portfolio ClosingBal value) to detect its MarketValue Percentage based on totalClosing
    controller.totalPortfolioPercentage = 0;
    controller.getTotalPortfolioPercentage = function (value, key) {

        //_.each(controller.getPortfolioClosingValues(), function(balance){
        controller.totalPortfolioPercentage = value / controller.getPortfolioClosingValues()[key] * 100;
        //})

        return controller.totalPortfolioPercentage;

    }


    //Return custom string based on the Portfolio Type
    controller.portfolioType = function (portfolio) {

        if (portfolio == 'Pension' || portfolio == 'Pensioen') {

            if (controller.language == 'ENG') {
                return 'Retirement portfolio';
            } else if (controller.language == 'AFR') {
                return 'Aftreeportefeulje';
            }
        }

        if (portfolio == 'Unit Trust' || portfolio == 'Effektetrust') {

            if (controller.language == 'ENG') {
                return 'Standard Portfolio';
            } else if (controller.language == 'AFR') {
                return 'Standaard-effektetrustportefeulje';
            }
        }

    }


    controller.gridValues = [];
    controller.getGridValue = function () {

        if (controller.gridValues.length == 0) {

            _.each(controller.dataService.getTransactions(), function (transaction) {

                controller.grid = _.pluck(transaction, 'ClosingBal');
                controller.gridValues.push(
                    _.pluck(controller.grid, 'MarketValue')
                );

            })

        }

        return controller.gridValues;

    }

    controller.gridLabels = [];
    controller.getGridLabels = function () {
        if (controller.gridLabels.length == 0) {

            _.each(controller.dataService.getTransactions(), function (transaction) {

                controller.grid = _.pluck(transaction, 'ClosingBal');
                controller.gridLabels.push(
                    _.pluck(controller.grid, 'FundName')
                );

            })

        }

        return controller.gridLabels;

    }

    controller.gridColors = ['#027864', '#6ab90d', '#830051', '#00b0ca', '#ea7125', '#8ecabb', '#fac28f', '#a5e8e8', '#ffe88e', '#e3e3e3', '#cfeab1']

    controller.gridOptions = {
        animations:false,
        responsive: true,
        maintainAspectRatio: true,
        segmentShowStroke: false,
        elements: {
            arc: {
                borderWidth: 0
            }
        },
        tooltips: {
            enabled: true,
            callbacks: {
                title: function (tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                },
                label: function (tooltipItem, data) {
                    return $filter('currency')(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index], 'R ')
                },
            }
        }
    };

    controller.fundAssetTotal = [];

    controller.getFundAssetTotal = function () {
        if (controller.fundAssetTotal.length == 0) {
            _.each(controller.model.Client.Portfolios, function (asset) {

                //if(asset.AssetTotal !== undefined){

                controller.fundAssetTotal.push(
                    _.chain(asset.AssetTotal).value()
                );

                //};

            })
        }

        return controller.fundAssetTotal;
    }


    controller.addSpace = function (string) {
        //insert a string between each occurance of a lower case character followed by an upper case character
        string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
        return string;
    }

    controller.fundObject = [];
    controller.createFundObject = function () {
        if (controller.fundObject.length == 0) {
            _.each(controller.getFundAssetTotal(), function (fund) {

                controller.fundObject.push(
                    _.chain(fund)
                    .map(function (item, value) {
                        return {
                            LocalEquity: fund.LocalEquity,
                            LocalProperty: fund.LocalProperty,
                            LocalCash: fund.LocalCash,
                            LocalBond: fund.LocalBond,
                            ForeignEquity: fund.ForeignEquity,
                            ForeignOther: fund.ForeignOther,
                            AfricaTotal: fund.AfricaTotal
                        }
                    })
                    .value());

            });
        }
        return controller.fundObject;
    }


    controller.gridData = [];
    controller.getGridData = function () {
        if (controller.gridData.length == 0) {

            _.each(controller.createFundObject(), function (fund) {

                controller.gridData.push(
                    _.chain(fund)
                    .map(function (item, value) {
                        var array = [];
                        _.each(item, function (value, item) {
                            array.push({
                                'Source': item,
                                'Percentage': Number(value)
                            })
                        })
                        return array;
                    })
                    .flatten()
                    .groupBy('Source')
                    .mapObject(function (val, key) {
                        var values = _.pluck(val, 'Percentage');
                        var total = _.reduce(values, function (memo, num) {
                            return memo + num / val.length;
                        }, 0).toFixed(2);
                        return total;
                    })
                    .mapObject(function (val, key) {
                        return {
                            'Source': key,
                            'Percentage': val
                        }
                    })
                    .toArray()
                    .value()

                )
            })

        };

        _.each(controller.gridData, function (obj) {

            _.each(obj, function (item) {

                switch (item.Source) {

                    case 'LocalEquity':
                        if (controller.language == 'ENG') {
                            item.Source = 'Local Equity'
                        } else item.Source = 'Plaaslike Aandele'
                        break;

                    case 'LocalProperty':
                        if (controller.language == 'ENG') {
                            item.Source = 'Local Property'
                        } else item.Source = 'Plaaslike Eiendom'
                        break;

                    case 'LocalCash':
                        if (controller.language == 'ENG') {
                            item.Source = 'Local Money Market'
                        } else item.Source = 'Plaaslike Geldmark'
                        break;

                    case 'LocalBond':
                        if (controller.language == 'ENG') {
                            item.Source = 'Local Fixed Interest'
                        } else item.Source = 'Plaaslike Vaste Rente'
                        break;

                    case 'ForeignEquity':
                        if (controller.language == 'ENG') {
                            item.Source = 'Foreign Equity'
                        } else item.Source = 'Buitelandse Aandele'
                        break;

                    case 'ForeignOther':
                        if (controller.language == 'ENG') {
                            item.Source = 'Foreign Other'
                        } else item.Source = 'Buitelandse Ander'
                        break;

                    case 'AfricaTotal':
                        if (controller.language == 'ENG') {
                            item.Source = 'Africa Total'
                        } else item.Source = 'Afrika Totaal'
                        break;

                }

            });

        });

        return controller.gridData;
    }

    controller.getSystemMonth = function(str) {
		return str.split('/')[1];
    }
    controller.getSystemDay = function(str) {
		return str.split('/')[0];
    }
    controller.getSystemYear = function(str) {
		return str.split('/')[2];
    }
    
    if (controller.language == 'AFR'){
        switch (controller.getSystemMonth(controller.SystemDate)) {

            case '01':
                controller.systemMonthOutcome = 'Januarie';
                break;

            case '02':
                controller.systemMonthOutcome = 'Februarie';
                break;

            case '03':
                controller.systemMonthOutcome = 'Maart';
                break;

            case '04':
                controller.systemMonthOutcome = 'April';
                break;

            case '05':
                controller.systemMonthOutcome = 'Mei';
                break;

            case '06':
                controller.systemMonthOutcome = 'Junie';
                break;

            case '07':
                controller.systemMonthOutcome = 'Julie';
                break;

            case '08':
                controller.systemMonthOutcome = 'Augustus';
                break;
            
            case '09':
                controller.systemMonthOutcome = 'September';
                break;

            case '10':
                controller.systemMonthOutcome = 'Oktober';
                break;

            case '11':
                controller.systemMonthOutcome = 'November';
                break;

            case '12':
                controller.systemMonthOutcome = 'Desember';
                break;

                return controller.systemMonthOutcome;
        }
    } else {
        switch (controller.getSystemMonth(controller.SystemDate)) {

            case '01':
                controller.systemMonthOutcome = 'January';
                break;

            case '02':
                controller.systemMonthOutcome = 'February';
                break;

            case '03':
                controller.systemMonthOutcome = 'March';
                break;

            case '04':
                controller.systemMonthOutcome = 'April';
                break;

            case '05':
                controller.systemMonthOutcome = 'May';
                break;

            case '06':
                controller.systemMonthOutcome = 'June';
                break;

            case '07':
                controller.systemMonthOutcome = 'July';
                break;

            case '08':
                controller.systemMonthOutcome = 'August';
                break;
            
            case '09':
                controller.systemMonthOutcome = 'September';
                break;

            case '10':
                controller.systemMonthOutcome = 'October';
                break;

            case '11':
                controller.systemMonthOutcome = 'November';
                break;

            case '12':
                controller.systemMonthOutcome = 'December';
                break;

                return controller.systemMonthOutcome;
        }
    }

    if (controller.language == 'AFR'){
        switch (controller.getSystemMonth(controller.SystemDate)) {

            case '01':
                controller.systemMonthOutcomeShort = 'Jan';
                break;

            case '02':
                controller.systemMonthOutcomeShort = 'Feb';
                break;

            case '03':
                controller.systemMonthOutcomeShort = 'Mar';
                break;

            case '04':
                controller.systemMonthOutcomeShort = 'Apr';
                break;

            case '05':
                controller.systemMonthOutcomeShort = 'Mei';
                break;

            case '06':
                controller.systemMonthOutcomeShort = 'Jun';
                break;

            case '07':
                controller.systemMonthOutcomeShort = 'Jul';
                break;

            case '08':
                controller.systemMonthOutcomeShort = 'Aug';
                break;
            
            case '09':
                controller.systemMonthOutcomeShort = 'Sep';
                break;

            case '10':
                controller.systemMonthOutcomeShort = 'Okt';
                break;

            case '11':
                controller.systemMonthOutcomeShort = 'Nov';
                break;

            case '12':
                controller.systemMonthOutcomeShort = 'Des';
                break;

                return controller.systemMonthOutcomeShort;
        }
    } else {
        switch (controller.getSystemMonth(controller.SystemDate)) {

            case '01':
                controller.systemMonthOutcomeShort = 'Jan';
                break;

            case '02':
                controller.systemMonthOutcomeShort = 'Feb';
                break;

            case '03':
                controller.systemMonthOutcomeShort = 'Mar';
                break;

            case '04':
                controller.systemMonthOutcomeShort = 'Apr';
                break;

            case '05':
                controller.systemMonthOutcomeShort = 'May';
                break;

            case '06':
                controller.systemMonthOutcomeShort = 'Jun';
                break;

            case '07':
                controller.systemMonthOutcomeShort = 'Jul';
                break;

            case '08':
                controller.systemMonthOutcomeShort = 'Aug';
                break;
            
            case '09':
                controller.systemMonthOutcomeShort = 'Sep';
                break;

            case '10':
                controller.systemMonthOutcomeShort = 'Oct';
                break;

            case '11':
                controller.systemMonthOutcomeShort = 'Nov';
                break;

            case '12':
                controller.systemMonthOutcomeShort = 'Dec';
                break;

                return controller.systemMonthOutcomeShort;
        }
    }

    controller.finalDateLong = controller.getSystemDay(controller.SystemDate) + ' ' + controller.systemMonthOutcome + ' ' + controller.getSystemYear(controller.SystemDate);
    controller.finalDateShort = controller.getSystemDay(controller.SystemDate) + ' ' + controller.systemMonthOutcomeShort + ' ' + controller.getSystemYear(controller.SystemDate);
}]);
angular.module('infoSlipsApp').controller('taxController', ['dataService', '$window', '$timeout', '$animate', function (dataService, $window, $timeout, $animate) {

    var controller = this;

  	controller.dataService = dataService;
    controller.model = dataService.processedData;
      
    controller.clientDetail = controller.model.Client.Detail;

    controller.portfolios = controller.model.Client.Portfolios;
    
    controller.PayeCert = [];
    controller.it3aTax = []

    controller.wealthPortfolio = function(){

        _.each(controller.portfolios, function(tax){

          if(tax.PAYECert){
              controller.PayeCert.push(tax.PAYECert);
          }
  
        });
  
    };

    controller.wealthPortfolio();

    controller.RAContrib = [];
    controller.getRAContrib = function(){

        if(controller.RAContrib.length == 0){

            _.each(controller.model.Client.Portfolios, function(tax){

                if(tax.RAContrib){

                    _.each(tax.RAContrib, function(item){
                        controller.RAContrib.push(item) //end push
                    })

                } //end if(tax.RAContrib){...}

            }) //end each(){}

        }// end if

        
        return controller.RAContrib;

    };

    controller.RATotal = [];
    controller.getRATotal = function(){

        if(controller.RATotal.length == 0){

            _.each(controller.model.Client.Portfolios, function(tax){

                if(tax.RATotal){

                    _.each(tax.RATotal, function(item){
                        controller.RATotal.push(item) //end push
                    })

               }

            }) //end each(){}

        };

        return controller.RATotal;

    };

    controller.printAccordions = function(){
        
        controller.beforePrint();

        $window.onafterprint = controller.afterPrint;
        $window.onbeforeprint = controller.beforePrint;

        var printHandler = function(mql) {

            if(!mql.matches) {
                controller.afterPrint();
            }

        };

        controller.mql = $window.matchMedia('print');
        controller.mql.addListener(printHandler);

    };

    controller.clientHasNoTax = function(){

        if(!controller.portfolios[0].IT3B && !controller.portfolios[0].IT3C && !controller.portfolios[0].IT3S && controller.getRAContrib().length === 0){
            return false;
        } else {
            return true;
        }

    };
  

    controller.beforePrint = function() {

        $animate.enabled(false);

        controller.openAccordion_it3b = true;
        controller.openAccordion_it3c = true;
        controller.openAccordion_it3s = true;
        controller.openAccordion_it3f = true;
        controller.openAccordion_paye = true;

    	$timeout(function(){
            $animate.enabled(true);
        },500);
        
    };

    controller.afterPrint = function() {

        controller.openAccordion_it3b = false;
        controller.openAccordion_it3c = false;
        controller.openAccordion_it3s = false;
        controller.openAccordion_it3f = false;
        controller.openAccordion_paye = false;

    };

}]);

angular.module('infoSlipsApp').controller('taxFreeInvestmentController', ['dataService', '$filter', '$window', '$timeout', function (dataService, $filter, $window, $timeout) {

    var controller = this;
	controller.model = dataService.processedData;

    controller.client = controller.model.Client.Detail;

    //set ng-model values
    controller.fundName = '0';
    controller.investmentName = '';
    controller.paymentMethod = '';
    controller.amount = '';
    controller.DODate = '';
    controller.commencingMonth = '';
    controller.investmentIncome = '';

    controller.increaseAmount = '';
    controller.increasePerc = '10';

    controller.taxFreeInvestmentStatus = 'Success';
    controller.taxFreeInvestmentStatusMessage = 'Thank you for your continued support. Should you have any queries please contact our call centre on 0860 234 234. Details of your updated investment will be confirmed via SMS once the revised debit order has been processed on the selected debit order date. Please ensure we have your correct cellphone number on file. You can confirm or update your cellphone number on the "Your Details" tab of your InfoSlip.';

    //show/hide div's
    controller.displayTaxFreeInvestment_Step1 = true;
    controller.displayTaxFreeInvestment_Step2 = false;
    controller.displayTaxFreeInvestment_Step3 = false;
    controller.displayTaxFreeInvestment_Step4 = false;

    controller.displayStep1 = function(){
        controller.displayTaxFreeInvestment_Step1 = true;
        controller.displayTaxFreeInvestment_Step2 = false;
        controller.displayTaxFreeInvestment_Step3 = false;
        controller.displayTaxFreeInvestment_Step4 = false;

        angular.element('html, body').scrollTop(0);
    };

    controller.displayStep2 = function(){
        controller.displayTaxFreeInvestment_Step1 = false;
        controller.displayTaxFreeInvestment_Step2 = true;
        controller.displayTaxFreeInvestment_Step3 = false;
        controller.displayTaxFreeInvestment_Step4 = false;

        angular.element('html, body').scrollTop(0);
    };

    controller.displayStep3 = function(){
        controller.displayTaxFreeInvestment_Step1 = false;
        controller.displayTaxFreeInvestment_Step2 = false;
        controller.displayTaxFreeInvestment_Step3 = true;
        controller.displayTaxFreeInvestment_Step4 = false;

        angular.element('html, body').scrollTop(0);
    };

    controller.displayStep4 = function(){
        controller.displayTaxFreeInvestment_Step1 = false;
        controller.displayTaxFreeInvestment_Step2 = false;
        controller.displayTaxFreeInvestment_Step3 = false;
        controller.displayTaxFreeInvestment_Step4 = true;

        angular.element('html, body').scrollTop(0);
    };

}]);


angular.module('infoSlipsApp').controller('transactionStatementController', ['dataService', '$filter', '$timeout', '$window', '$animate', function(dataService, $filter, $timeout, $window, $animate) {

    var controller = this;

    controller.model = dataService.processedData;
    controller.dataService = dataService;

    controller.client = controller.model.Client.Detail;
    controller.Portfolios = controller.model.Client.Portfolios;
    controller.Totals = controller.model.Client.Totals;

    controller.language = controller.client.Language;

    controller.openAccordion = {};

    controller.printAccordions = function(){
        
        controller.beforePrint();

        $window.onafterprint = controller.afterPrint;
        $window.onbeforeprint = controller.beforePrint;

        var printHandler = function(mql) {

            if(!mql.matches) {
                controller.afterPrint();
            }

        };

        controller.mql = $window.matchMedia('print');
        controller.mql.addListener(printHandler);

    };
  

    controller.beforePrint = function() {

        $animate.enabled(false);

        _.each(controller.openAccordion, function(item, index){
            controller.openAccordion[index] = true;
        });

        $timeout(function(){
            $animate.enabled(true);
        }, 500);
        
    };

    controller.afterPrint = function() {

      _.each(controller.openAccordion, function(item, index){
            controller.openAccordion[index] = false;
        });

    };


    controller.investmentType = [];
    controller.getInvestmentType = function(){        

        if (controller.investmentType.length == 0){

            _.each(controller.model.Client.Portfolios, function(investment){

                controller.investmentType.push(

                    _.chain(investment.Fund)
                    .mapObject(function(item){

                        var OpeningBal = {
                            'Date': item.OpeningBal.Date,
                            'NoOfUnits': item.OpeningBal.NoOfUnits,
                            'UnitPrice': item.OpeningBal.UnitPrice,
                            'MarketValue': item.OpeningBal.MarketValue
                        };

                        var FundDetail = {
                            'FundName': item.FundDetail.FundName,
                            'AccountDescription': item.FundDetail.AccountDescription,
                            'AccountNumber': item.FundDetail.AccountNumber,
                            'Product': item.FundDetail.Product,
                            'AmountInvested': item.FundDetail.AmountInvested,
                            'AccGroup': item.FundDetail.AccGrp,
                            'AccGroupNo': item.FundDetail.AccGrpNo,
                            'ServicingAgentName': item.FundDetail.ServicingAgentName,
                            'TINCode': item.FundDetail.TINCode
                        };

                        var Transaction = _.each(item.Transaction, 
                            function(item){
                                return {
                                    'Date': item.Date,
                                    'Description': item.Description,
                                    'NoOfUnits': item.NoOfUnits,
                                    'UnitPrice': item.UnitPrice,
                                    'NetAmount': item.NetAmount
                                };
                            }
                        );

                        var ClosingBal = {
                            'Date': item.ClosingBal.Date,
                            'NoOfUnits': item.ClosingBal.NoOfUnits,
                            'UnitPrice': item.ClosingBal.UnitPrice,
                            'MarketValue': item.ClosingBal.MarketValue

                        };

                        var eacTable = investment.EACTable;

                        return{
                            'FundDetail.Product': item.FundDetail.Product,
                            'OpeningBal': OpeningBal,
                            'FundDetail': FundDetail,
                            'Transaction': Transaction,
                            'ClosingBal': ClosingBal,
                            'eacTable': eacTable
                        }

                    })    
                    .groupBy('FundDetail.Product')
                    .value()

                );

            });

        } //end if
        
        return controller.investmentType;
    };

    controller.marketValue = [];
    controller.getMarketValue = function(){

        if(controller.marketValue.length == 0){
            
            _.each(controller.dataService.getTransactions(), function(item){
                
                controller.marketValue.push(
                    _.chain(item)
                    .map(function(value){
                        return value.ClosingBal.MarketValue
                    })
                    .value()
                )
               
            });
        }

        return controller.marketValue;

    }

    //Calculate total Holdings Value based on all Portfolio Closing Values
    controller.portfolioClosingValues = [];
    controller.getPortfolioClosingValues = function(){

        if(controller.portfolioClosingValues == 0){

            _.each(controller.getMarketValue(), function(balance){

                controller.portfolioClosingValues.push(

                    _.reduce(balance, function(memo, num){
                        return Number(memo) + Number(num);
                    }, 0)

                )

            })
        }

        return controller.portfolioClosingValues;
    };


    //This function takes value(portfolio ClosingBal value) to detect its MarketValue Percentage based on totalClosing
    controller.totalPortfolioPercentage = 0;
    controller.getTotalPortfolioPercentage = function(value, key) {

        //_.each(controller.getPortfolioClosingValues(), function(balance){
            controller.totalPortfolioPercentage = value / controller.getPortfolioClosingValues()[key] * 100;
        //})

        return controller.totalPortfolioPercentage;

    }


    controller.gridValues = [];
    controller.getGridValues = function(){

        if(controller.gridValues.length == 0){

            _.each(controller.dataService.getTransactions(), function(transaction){

                controller.grid = _.pluck(transaction, 'ClosingBal');
                controller.gridValues.push(
                    _.pluck(controller.grid, 'MarketValue')
                );

            })

        }

        return controller.gridValues;

    }

    controller.gridLabels = [];
    controller.getGridLabels = function(){
        if(controller.gridLabels.length == 0){

            _.each(controller.dataService.getTransactions(), function(transaction){
            
                controller.grid = _.pluck(transaction, 'ClosingBal');
                controller.gridLabels.push(
                    _.pluck(controller.grid, 'FundName')
                );

            })

        }
        
        return controller.gridLabels;

    }

    controller.gridColors = ['#027864', '#6ab90d', '#830051', '#00b0ca', '#ea7125', '#8ecabb', '#fac28f', '#a5e8e8', '#ffe88e', '#e3e3e3', '#cfeab1']

    controller.gridOptions = {
        responsive: true,
        maintainAspectRatio: true,
        segmentShowStroke : false,
        elements: { 
            arc: { 
                borderWidth: 0 
            } 
        },
        tooltips:{
            enabled: true,
            callbacks: {
                title: function(tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                },
                label: function(tooltipItem, data) {
                    return $filter('currency')(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index], 'R ')
                },
            }
        }
    };

}]);

angular.module('infoSlipsApp').controller('updateInvestmentsController', ['dataService', '$filter', '$window', function (dataService, $filter, $window) {

    var controller = this;
    controller.model = dataService.processedData;

    //Set ng-models
    //Setting because we want them to be '' instead of undefined
    controller.newFundName = '0';
    controller.newInvestmentName = '';
    controller.newPaymentMethod = '';
    controller.newAmount = '';
    controller.newDebitOrderDate = '';
    controller.newCommencingMonth = '';
    controller.newInvestmentIncome = '';
    controller.newIncreasePerc = '';
    controller.newIncreaseAmount = '';

    controller.newInvestmentStatus = 'Success';
    controller.newInvestmentStatusMessage = 'Thank you for your continued support. Should you have any queries please contact our call centre on 0860 234 234. Details of your updated investment will be confirmed via SMS once the revised debit order has been processed on the selected debit order date. Please ensure we have your correct cellphone number on file. You can confirm or update your cellphone number on the "Your Details" tab of your InfoSlip.';
    controller.IncreaseCurrentInvestmentStatus = 'Success';
    controller.IncreaseCurrentInvestmentStatusMessage = 'Thank you for your continued support. Should you have any queries please contact our call centre on 0860 234 234. Details of your updated investment will be confirmed via SMS once the revised debit order has been processed on the selected debit order date. Please ensure we have your correct cellphone number on file. You can confirm or update your cellphone number on the "Your Details" tab of your InfoSlip.';

    controller.debitOrder = [];
    controller.getDebitOrderDetails = function(){

        if(controller.debitOrder && controller.debitOrder.length == 0){
            _.each(controller.model.Client.Portfolios, function(debitorder){
                controller.debitOrder = _.chain(debitorder.DebitOrder).value();
            })
        }
        
        return controller.debitOrder;

    }


    controller.client = controller.model.Client.Detail;

    controller.cannotIncreaseCurrentInvestment = true;

    controller.updatedDetails = []
    controller.updateDebitOrderDetails = function(value, key){

        var debitorder = controller.getDebitOrderDetails();

        var selectedDetails = {
            id: key,
            product: debitorder[key].Portfolio,
            fundName: debitorder[key].FundName,
            accNr: debitorder[key].AccountNumber,
            DOAmount: debitorder[key].DOAmount,
            annualIncrease: debitorder[key].DOEscalationVal,
            DODate: debitorder[key].DOEscalationVal
        }

        if(value == true){
            controller.updatedDetails.push(selectedDetails);
            controller.cannotIncreaseCurrentInvestment = false;
            selectedDetails = '';

        }

        if(value == false){
            for(account in controller.updatedDetails){

                if(controller.updatedDetails[account].id == key){
                    controller.updatedDetails.splice(account, 1);
                    break;
                }

            }
        }

        if(controller.updatedDetails.length == 0){
            controller.cannotIncreaseCurrentInvestment = true;
        }

    } //end updateDebitOrderDetails()

    //SHOW/HIDE DIVS
    controller.displayIncreaseInvestment_Step1 = true;
    controller.displayIncreaseInvestment_Step2 = false;
    controller.displayIncreaseInvestment_Step3 = false;
    controller.displayIncreaseInvestment_Step4 = false;

    controller.displayNewInvestment_Step1 = true;
    controller.displayNewInvestment_Step2 = false;
    controller.displayNewInvestment_Step3 = false;
    controller.displayNewInvestment_Step4 = false;

    controller.initiateDisplayIncreaseInvestmentStep1 = function(){
        controller.displayIncreaseInvestment_Step1 = true;
        controller.displayIncreaseInvestment_Step2 = false;
        controller.displayIncreaseInvestment_Step3 = false;
        controller.displayIncreaseInvestment_Step4 = false;

        controller.displayNewInvestment_Step1 = true;
        controller.displayNewInvestment_Step2 = false;
        controller.displayNewInvestment_Step3 = false;
        controller.displayNewInvestment_Step4 = false;

        angular.element('html, body').scrollTop(0);
    }

    controller.initiateDisplayIncreaseInvestmentStep2 = function(){ 
        controller.displayIncreaseInvestment_Step1 = false;
        controller.displayIncreaseInvestment_Step2 = true;
        controller.displayIncreaseInvestment_Step3 = false;
        controller.displayIncreaseInvestment_Step4 = false;

        angular.element('html, body').scrollTop(0);
    }

    controller.initiateDisplayIncreaseInvestmentStep3 = function(){
        controller.displayIncreaseInvestment_Step1 = false;
        controller.displayIncreaseInvestment_Step2 = false;
        controller.displayIncreaseInvestment_Step3 = true;
        controller.displayIncreaseInvestment_Step4 = false;

        angular.element('html, body').scrollTop(0);
    }

    controller.initiateDisplayIncreaseInvestmentStep4 = function(){
        controller.displayIncreaseInvestment_Step1 = false;
        controller.displayIncreaseInvestment_Step2 = false;
        controller.displayIncreaseInvestment_Step3 = false;
        controller.displayIncreaseInvestment_Step4 = true;

        angular.element('html, body').scrollTop(0);
    }



    controller.initiateDisplayNewInvestmentStep1 = function(){
        controller.displayNewInvestment_Step1 = true;
        controller.displayNewInvestment_Step2 = false;
        controller.displayNewInvestment_Step3 = false;
        controller.displayNewInvestment_Step4 = false;

        controller.displayIncreaseInvestment_Step1 = true;
        controller.displayIncreaseInvestment_Step2 = false;
        controller.displayIncreaseInvestment_Step3 = false;
        controller.displayIncreaseInvestment_Step4 = false;

        angular.element('html, body').scrollTop(0);
    }

    controller.initiateDisplayNewInvestmentStep2 = function(){
        controller.displayNewInvestment_Step1 = false;
        controller.displayNewInvestment_Step2 = true;
        controller.displayNewInvestment_Step3 = false;
        controller.displayNewInvestment_Step4 = false;

        angular.element('html, body').scrollTop(0);
    }

    controller.initiateDisplayNewInvestmentStep3 = function(){
        controller.displayNewInvestment_Step1 = false;
        controller.displayNewInvestment_Step2 = false;
        controller.displayNewInvestment_Step3 = true;
        controller.displayNewInvestment_Step4 = false;

        angular.element('html, body').scrollTop(0);
    }

    controller.initiateDisplayNewInvestmentStep4 = function(){
        controller.displayNewInvestment_Step1 = false;
        controller.displayNewInvestment_Step2 = false;
        controller.displayNewInvestment_Step3 = false;
        controller.displayNewInvestment_Step4 = true;

        angular.element('html, body').scrollTop(0);
    }

    controller.MonthlyInvestments = [
        "Albaraka Balanced Fund A",
        "Albaraka Equity Fund A",
        "Balanced Fund A",
        "Bond Fund R",
        "Capital Builder Fund A",
        "Capped SWIX Index Fund A",
        "Core Balanced Fund A",
        "Core Conservative Fund A",
        "Core Moderate Fund A",
        "Dynamic Floor Fund A",
        "Equity Fund A",
        "Financial Services Fund A",
        "Flexible Fund A",
        "FTSE RAFI All World Index Fdr Fund A",
        "Global Bond Feeder Fund A",
        "Global Currency Feeder Fund A",
        "Global Emerging Market Fund A",
        "Global Equity Fund A",
        "Gold Fund A",
        "Growth Fund A",
        "Income Fund R",
        "Industrial Fund A",
        "Interest Plus Fund A",
        "Investors' Fund A",
        "Managed Alpha Equity Fund A",
        "Maximum Return Fund of Funds A",
        "Mid & Small-Cap Fund A",
        "Mining and Resources Fund A",
        "Moderate Balanced Fund A",
        "Money Market Fund A",
        "Multi-Managers Aggressive Balanced FoF A",
        "Multi-Managers Balanced Fund of Funds A",
        "Multi-Managers Cautious Fund of Funds A",
        "Multi-Managers Defensive Fund of Funds A",
        "Multi-Managers Enhanced Income Fund of Fund A",
        "Multi-Managers Equity Fund of Funds A",
        "Multi-Managers Maximum Return Fund of Funds A",
        "RAFI 40 Index Fund A",
        "Real Income Fund A",
        "SA Quoted Property Fund A",
        "Stable Growth Fund A",
        "Top 40 Index Fund A",
        "Top Companies Fund A",
        "Old Mutual MSCI Emerging Markets ESG Index Feeder Fund A",
        "Old Mutual MSCI World ESG Index Feeder Fund A",
        "Old Mutual Titan Global Equity Feeder Fund A",
        "Old Mutual Top 20 Index Fund A"
    ];

}]);


angular.module('infoSlipsApp').controller('yourdetailsController', ['dataService', '$filter', '$window', function (dataService, $filter, $window) {

	var controller = this;
	controller.model = dataService.processedData;
	controller.dataService = dataService;
	controller.viewerUrl = dataService.urlLocation;
	// controller.class = false;
	controller.client = controller.model.Client.Detail;

	controller.engOccupationIndustry = [
		"Administrative and Support services",
		"Agriculture/Forestry and Fishing",
		"Arts/Entertainment and Recreation",
		"Construction and Infrastructure",
		"Education/Healthcare and Social work",
		"Financial and Insurance",
		"Hospitality",
		"Imports/Exports",
		"Information/Communication and Technology",
		"Manufacturing",
		"Mining and Quarrying",
		"Motor trade",
		"None",
		"Non-Profit Organisation/NGO etc.",
		"Other Services (Please specify)",
		"Professional Services",
		"Public Sector: Defense and Safety",
		"Public Sector: Other (Please specify)",
		"Public Sector: Procurement, Infrastructure and Administration",
		"Real estate and Property",
		"Science and Laboratories",
		"Transporting, Storage amd Logistics (excluding imports/exports)",
		"Utilities",
		"Wholesale and Retail trade"
];

controller.engOccupationEmploymentPosition = [
	"Executive Management/Director",
	"Foreman/Supervisor",
	"General Employee/Non-management",
	"Managing Director/CEO",
	"Non-senior management",
	"Retired/Unemployed",
	"Senior Management",
	"Self-employed"
];

controller.engSourceOfIncome = [
	"Annuity Pay-out",
	"Commission",
	"Director's remuneration",
	"Disability Grants",
	"Gratuities/Tips",
	"Income protection payment",
	"Independent contractor/Labour broker",
	"Inheritance",
	"Maintenance Support",
	"Monthly Pension",
	"Other investment income",
	"Salary",
	"Scholarship/bursary",
	"Self-employed/Own business",
	"Third Party (Spouse/Partner/Family member)",
];

controller.engSourceOfFunds = [
	"Annuity Pay-out",
	"Bonus/Profit Share",
	"Commission",
	"Compensation payment / Arbitration award",
	"Director's remuneration",
	"Disability Grants",
	"Donation / gift",
	"Gratuities/Tips",
	"Income protection payment",
	"Independent contractor / labour broker",
	"Inheritance",
	"Loan",
	"Maintenance Support",
	"Maturing investment / policy claim",
	"Monthly Pension",
	"Pension Pay out",
	"Restraint of trade payment",
	"Salary",
	"Sale of Asset",
	"Savings",
	"Scholarship / bursary",
	"Self-Employed / Own Business",
	"Winnings - Lottery, Gamling"	
];

controller.engCountries = [
	"Afghanistan", 
	"Albania",
	"Alderney, Channel Islands", 
	"Algeria",
	"Andorra", 
	"Angola", 
	"Any country not in this list",
	"Argentina",
	"Austria",
	"Australia",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados", 
	"Belgium",	
	"Belize",
	"Benin", 
	"Bophuthatswana",
	"Borneo",
	"Botswana",
	"Brazil",
	"BRITISH INDIAN OCEAN TERRITORY", 
	"Bulgaria",
	"Brunei",
	"Burundi",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands",
	"Central African Republic",
	"Chile",
	"China",
	"Ciskei",
	"Cuba", 
	"Colombia",
	"Congo",
	"CONGO, THE DEMOCRATIC REPUBLIC OF THE",
	"Costa Rica",
	"Cote D Ivoire",
	"Cyprus",
	"Czechoslovakia",
	"Denmark",
	"Dominica (Windward Islands)",
	"Dominican Republic",
	"Ecuador",
	"El Salvador",
	"Egypt",
	"Ethiopia",
	"Faroe Islands", 
	"Fiji",
	"Finland", 
	"France",
	"Gambia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Grenada (Windward Islands)",
	"Guatemala",
	"Guyana",
	"Guernsey, Channel Islands",
	"Haiti", 
	"Hong Kong",
	"Hungary", 
	"Iceland",
	"India",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Isle of man",
	"Israel",
	"Italy",
	"Jamaica", 
	"Japan",
	"Jersey",
	"Jordan",
	"Kenya",
	"Korea (Republic)",
	"Kuwait",
	"Laos",
	"Lebanon", 
	"Lesotho",	
	"Liberia", 
	"Libya", 
	"Liechtenstein", 
	"Luxembourg",
	"Macedonia, former Yugoslav Republic of",
	"Madagascar", 
	"Malawi",
	"Malaysia",
	"Maldives", 
	"Mali",
	"Malta",
	"Mauritania",
	"Mauritius",
	"Mexico",
	"Monaco",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Netherlands",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"Norway",
	"Pakistan",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Poland",
	"Portugal",
	"Qatar",
	"Quebec",
	"Republic of South Africa",
	"Romania",
	"Russia",
	"Rwanda",
	"Samoa",
	"San Marino",
	"Saudi Arabia",
	"Senegal",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Spain",
	"Sri Lanka",
	"St. Lucia",
	"St. Vincent and Grenadines",
	"Suriname",
	"Swaziland",
	"Sweden",
	"Switzerland",
	"Syria",
	"Taiwan",
	"Tanzania",
	"Thailand",
	"Transkei",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Togo",
	"Uganda",
	"United Arab Emirates",
	"United Kingdom",
	"United States of America",
	"Unknown",
	"Uruguay",
	"Vatican",
	"Venda",
	"Venezuela",
	"Viet Nam",
	"Warsaw",
	"Yemen",
	"Zaire",
	"Zambia",
	"Zanzibar",
	"Zimbabwe",
];

controller.engIDTypes = [
	"ASYLUM ID",
	"NAMIBIA ID",
	"NON RSA ID",
	"REFUGEE ID",
	"RSA ID",
	"UK ID",
	"USA ID"
];

controller.afrOccupationIndustry = [
	"Administratiewe en Steundienste",
	"Ander Dienste (Spesifiseer asb)",
	"Eiendom",
	"Finansies en Versekering",
	"Gasvryheid",
	"Geen",
	"Groot- en Kleinhandel",
	"Inligting/Kommunikasie en Tegnologie",
	"Invoer/Uitvoer",
	"Konstruksie en Infrastruktuur",
	"Kunste/Vermaak en Ontspanning",
	"Landbou/Bosbou en Vissery",
	"Motorhandel",
	"Mynbou en Steengroefwerk",
	"Nutsdienste",
	"Organisasie sonder winsoogmerk/Nie-staatsorganisasie, ens.",
	"Onderwys/Gesondheidsorg en Maatskaplike Werk",
	"Openbare Sektor: Ander (Spesifiseer asb)",
	"Openbare Sektor: Verdediging en Veiligheid",
	"Openbare Sektor: Verkryging, Infrastruktuur en Administrasie",
	"Professionele Dienste",
	"Vervaardiging",
	"Vervoer, Berging en Logistiek (invoer/uitvoer uitgesluit)",
	"Wetenskap en Laboratoriums",
];

controller.afrOccupationEmploymentPosition = [
	"Afgetree/Werkloos",
	"Algemene werknemer/Nie-bestuur",
	"Besturende direkteur/Uitvoerende Hoof",
	"Naslaanlys",
	"Nie-senior bestuur",
	"Selfbesoldig",
	"Senior bestuur",
	"Uitvoerende bestuur/Direkteur",
	"Voorman/Toesighouer"
];

controller.afrSourceOfIncome = [
	"Ander Beleggingsinkomste",
	"Annuïteituitbetaling",
	"Derde party (gade/lewensmaat/familielid)",
	"Direkteursvergoeding",
	"Erfenis",
	"Inkomstebeskermingsbetaling",
	"Kommissie",
	"Maandelikse pensioen",
	"Onderhoudsgeld",
	"Ongeskiktheidstoekennings",
	"Salaris",
	"Selfbesoldig/Eie besigheid",
	"Studiebeurs/beurs",
	"Toelaes/Fooitjies",
	"Vrye ondernemer/Arbeidsmakelaar"
];

controller.afrSourceOfFunds = [
	"Annuïteituitbetaling",
	"Bonus/Winsdeling",
	"Direkteursvergoeding",
	"Erfenis",
	"Handelsbeperkingsbetaling",
	"Inkomstebeskermingsbetaling",
	"Kommissie",
	"Lening",
	"Maandelikse pensioen",
	"Naslaanlys",
	"Onderhoudsgeld",
	"Ongeskiktheidstoekennings",
	"Pensioenuitbetaling",
	"Salaris",
	"Selfbesoldig/Eie besigheid",
	"Skenking/Geskenk",
	"Spaargeld",
	"Studiebeurs/beurs",
	"Toelaes/Fooitjies",
	"Uitkeerbelegging/Poliseis",
	"Vergoedingsbetaling/Arbitrasietoekenning",
	"Verkoop van bate",
	"Vrye ondernemer/Arbeidsmakelaar",
	"Wengeld - Lotery, dobbel"
];

controller.afrCountries = [
	"Afghanistan", 
	"Albania",
	"Alderney, Channel Islands", 
	"Algeria",
	"Andorra", 
	"Angola", 
	"Any country not in this list",
	"Argentina",
	"Austria",
	"Australia",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados", 
	"Belgium",	
	"Belize",
	"Benin", 
	"Bophuthatswana",
	"Borneo",
	"Botswana",
	"Brazil",
	"BRITISH INDIAN OCEAN TERRITORY", 
	"Bulgaria",
	"Brunei",
	"Burundi",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands",
	"Central African Republic",
	"Chile",
	"China",
	"Ciskei",
	"Cuba", 
	"Colombia",
	"Congo",
	"CONGO, THE DEMOCRATIC REPUBLIC OF THE",
	"Costa Rica",
	"Cote D Ivoire",
	"Cyprus",
	"Czechoslovakia",
	"Denmark",
	"Dominica (Windward Islands)",
	"Dominican Republic",
	"Ecuador",
	"El Salvador",
	"Egypt",
	"Ethiopia",
	"Faroe Islands", 
	"Fiji",
	"Finland", 
	"France",
	"Gambia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Grenada (Windward Islands)",
	"Guatemala",
	"Guyana",
	"Guernsey, Channel Islands",
	"Haiti", 
	"Hong Kong",
	"Hungary", 
	"Iceland",
	"India",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Isle of man",
	"Israel",
	"Italy",
	"Jamaica", 
	"Japan",
	"Jersey",
	"Jordan",
	"Kenya",
	"Korea (Republic)",
	"Kuwait",
	"Laos",
	"Lebanon", 
	"Lesotho",	
	"Liberia", 
	"Libya", 
	"Liechtenstein", 
	"Luxembourg",
	"Macedonia, former Yugoslav Republic of",
	"Madagascar", 
	"Malawi",
	"Malaysia",
	"Maldives", 
	"Mali",
	"Malta",
	"Mauritania",
	"Mauritius",
	"Mexico",
	"Monaco",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Netherlands",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"Norway",
	"Pakistan",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Poland",
	"Portugal",
	"Qatar",
	"Quebec",
	"Republic of South Africa",
	"Romania",
	"Russia",
	"Rwanda",
	"Samoa",
	"San Marino",
	"Saudi Arabia",
	"Senegal",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Spain",
	"Sri Lanka",
	"St. Lucia",
	"St. Vincent and Grenadines",
	"Suriname",
	"Swaziland",
	"Sweden",
	"Switzerland",
	"Syria",
	"Taiwan",
	"Tanzania",
	"Thailand",
	"Transkei",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Togo",
	"Uganda",
	"United Arab Emirates",
	"United Kingdom",
	"United States of America",
	"Unknown",
	"Uruguay",
	"Vatican",
	"Venda",
	"Venezuela",
	"Viet Nam",
	"Warsaw",
	"Yemen",
	"Zaire",
	"Zambia",
	"Zanzibar",
	"Zimbabwe",
];

controller.afrIDTypes = [
	"ASYLUM ID",
	"NAMIBIA ID",
	"NON RSA ID",
	"REFUGEE ID",
	"RSA ID",
	"UK ID",
	"USA ID"
];


controller.language = controller.client.Language;

controller.updatePersonalDetailsStatus = 'Success';
controller.updatePersonalDetailsStatusMessage = 'Thank you for submitting your details. You will receive confirmation of this update and it will reflect in future communications.  If you have updated your address details, we require proof of residence (e.g. a recent utility bill) on file. Please scan and email this document to utadmin@oldmutual.com or fax it to 021 509 7100.';

//NG MODELS
controller.myDetails = {
	  incomeTaxNumber: '',
	homeNumber: '',
	workNumber: '',
	cellphoneNumber: '',
	email: '',
	postal1: '',
	postal2: '',
	postal3: '',
	postal4: '',
	postalCode: '',
	physical1: '',
	physical2: '',
	physical3: '',
	physical4: '',
	physicalCode: '',
	rsataxresident: '',
	entityoecd: '',
	usaTaxNumber: '',
	usaIDType: '',
	oecdaccholder: '',
	TaxResidency: '',
	CountryBirth: '',
	CountryCitizenship: '',
	EntityIDType: '',
	TaxResidency1: '',
	taxRes1TIN: '',
	taxRes1ID: '',
	taxRes1IdType: '',
	taxRes1Reason: '',
	taxRes1BReason: '',
	TaxResidency2: '',
	taxRes2TIN: '',
	taxRes2ID: '',
	taxRes2IdType: '',
	taxRes2Reason: '',
	taxRes2BReason: '',
	TaxResidency3: '',
	taxRes3TIN: '',
	taxRes3ID: '',
	taxRes3IdType: '',
	taxRes3Reason: '',
	taxRes3BReason: '',
	SourceOfFunds: '',
	SourceOfIncome: '',
	OccupationIndustry: '',
	EmploymentPosition: ''
};
controller.myDetails.CountryBirth = controller.client.CountryBirth;
controller.myDetails.TaxResidency = controller.client.TaxResidency;
controller.myDetails.CountryCitizenship = controller.client.CountryCitizenship;
controller.myDetails.EntityIDType = controller.client.EntityIDType;
controller.myDetails.SourceOfFunds = controller.client.SourceOfFunds;
controller.myDetails.SourceOfIncome = controller.client.SourceOfIncome;
controller.myDetails.OccupationIndustry = controller.client.OccupationIndustry;
controller.myDetails.EmploymentPosition = controller.client.EmploymentPosition;
controller.additionalTaxNumbers = {
	Country1: '',
	Country2: '',
	Country3: ''
}

controller.myDetailsData = []
controller.validateUpdate = function(){

	/* Check if anything in has changed from model*/
	var obj = controller.myDetails;
	if(controller.myDetailsData.length == 0){
		for (var prop in obj) {
			// skip loop if the property is from prototype
			if(!obj.hasOwnProperty(prop)) continue;

			controller.myDetailsData += obj[prop];
		}
	}
	if (controller.myDetailsData.length == 0) return true;

	/* Check if all first 3 questions has an answer*/
	if (
		controller.myDetails.rsataxresident == "" ||
		controller.myDetails.entityoecd == "" ||
		controller.myDetails.oecdaccholder == ""
	) return true

	/* Check if some yes among first 3 three questions*/
	if (
		controller.myDetails.rsataxresident != "Yes" &&
		controller.myDetails.entityoecd != "Yes" &&
		controller.myDetails.oecdaccholder != "Yes"
	) return true

	/* Check if user has usa residency that he has entered usa tax and id type*/
	if( 
		controller.myDetails.entityoecd == "Yes" && (
			controller.myDetails.usaTaxNumber == "" ||
			controller.myDetails.usaIDType == ""
		)
	) return true

	/*Checks that the user has entered at least one additional country*/
	if (controller.myDetails.oecdaccholder == "Yes") {
		if (
			controller.myDetails.TaxResidency1 == '' &&
			controller.myDetails.TaxResidency2 == '' &&
			controller.myDetails.TaxResidency3 == ''
		) return true
		
		/*If user has selected a country for additional country 1*/
		if (controller.myDetails.TaxResidency1 != '') {
			/*Checks that user has selected an option for either a TIN number or reason not to have one*/
			if (controller.additionalTaxNumbers.Country1 == '') return true;
			/*Ensures user has entered TIN number if 'Yes' selected*/
			if (
				controller.additionalTaxNumbers.Country1 == 'Yes' &&
				controller.myDetails.taxRes1TIN == ''
			) return true
			/*Ensures user has entered reason if 'No' selected*/
			if (
				controller.additionalTaxNumbers.Country1 == 'No' &&
				controller.myDetails.taxRes1Reason == ''
			) return true
			/*checks if user has either entered a reason or TIN number*/
			if (
				controller.myDetails.taxRes1TIN == '' &&
				controller.myDetails.taxRes1Reason == ''
			) return true
			/*checks if user has selected reason B that they have type the reason out*/
			if (
				controller.myDetails.taxRes1Reason == 'B' &&
				controller.myDetails.taxRes1BReason == ''
			) return true
		}
		
		/*If user has selected a country for additional country 1*/
		if (controller.myDetails.TaxResidency2 != '') {
			/*Checks that user has selected an option for either a TIN number or reason not to have one*/
			if (controller.additionalTaxNumbers.Country2 == '') return true;
			/*Ensures user has entered TIN number if 'Yes' selected*/
			if (
				controller.additionalTaxNumbers.Country2 == 'Yes' &&
				controller.myDetails.taxRes2TIN == ''
			) return true
			/*Ensures user has entered reason if 'No' selected*/
			if (
				controller.additionalTaxNumbers.Country2 == 'No' &&
				controller.myDetails.taxRes2Reason == ''
			) return true
			/*checks if user has either entered a reason or TIN number*/
			if (
				controller.myDetails.taxRes2TIN == '' &&
				controller.myDetails.taxRes2Reason == ''
			) return true
			/*checks if user has selected reason B that they have type the reason out*/
			if (
				controller.myDetails.taxRes2Reason == 'B' &&
				controller.myDetails.taxRes2BReason == ''
			) return true
		}
		
		/*If user has selected a country for additional country 1*/
		if (controller.myDetails.TaxResidency3 != '') {
			/*Checks that user has selected an option for either a TIN number or reason not to have one*/
			if (controller.additionalTaxNumbers.Country3 == '') return true;
			/*Ensures user has entered TIN number if 'Yes' selected*/
			if (
				controller.additionalTaxNumbers.Country3 == 'Yes' &&
				controller.myDetails.taxRes3TIN == ''
			) return true
			/*Ensures user has entered reason if 'No' selected*/
			if (
				controller.additionalTaxNumbers.Country3 == 'No' &&
				controller.myDetails.taxRes3Reason == ''
			) return true
			/*checks if user has either entered a reason or TIN number*/
			if (
				controller.myDetails.taxRes3TIN == '' &&
				controller.myDetails.taxRes3Reason == ''
			) return true
			/*checks if user has selected reason B that they have type the reason out*/
			if (
				controller.myDetails.taxRes3Reason == 'B' &&
				controller.myDetails.taxRes3BReason == ''
			) return true
		}
	}

	return false
}

controller.hideStep1 = false;
controller.hideStep2 = true;
controller.hideStep3 = true;

controller.showStep1 = function(){
	controller.hideStep1 = false;
	controller.hideStep2 = true;
	controller.hideStep3 = true;
}

controller.confirmUpdateDetails = function(){

	controller.hideStep1 = true;
	controller.hideStep2 = false;
};
  
controller.updatePersonalDetails = function(){
	
	controller.hideStep2 = true;
	controller.hideStep3 = false;

	  var ArrayDelimiter = "~#~";

	var sendLink = "https://viewer.infoslips.com/api/viewerposts/put/";

	var IDValidated = 'Yes';

	var placeHolder = '_!_';

	var dataString = 'dataString: "';

	//add placeholder for first value of dataString
	dataString += placeHolder + ArrayDelimiter;

	//if model is not blank
	//add model to var dataString

	if (controller.myDetails.incomeTaxNumber) {
		dataString += controller.myDetails.incomeTaxNumber + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.homeNumber) {
		dataString += controller.myDetails.homeNumber + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.workNumber) {
		dataString += controller.myDetails.workNumber + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.cellphoneNumber) {
		dataString += controller.myDetails.cellphoneNumber + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.email) {
		dataString += controller.myDetails.email + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.postal1) {
		dataString += controller.myDetails.postal1 + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.postal2) {
		dataString += controller.myDetails.postal2 + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.postal3) {
		dataString += controller.myDetails.postal3 + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.postal4) {
		dataString += controller.myDetails.postal4 + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.postalCode) {
		dataString += controller.myDetails.postalCode + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.physical1) {
		dataString += controller.myDetails.physical1 + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.physical2) {
		dataString += controller.myDetails.physical2 + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.physical3) {
		dataString += controller.myDetails.physical3 + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.physical4) {
		dataString += controller.myDetails.physical4 + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.physicalCode) {
		dataString += controller.myDetails.physicalCode + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	

	if (controller.myDetails.rsataxresident) {
		dataString += controller.myDetails.rsataxresident + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.entityoecd) {
		dataString += controller.myDetails.entityoecd + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.usaTaxNumber) {
		dataString += controller.myDetails.usaTaxNumber + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.usaIDType) {
		dataString += controller.myDetails.usaIDType + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.oecdaccholder) {
		dataString += controller.myDetails.oecdaccholder + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	
	if (controller.myDetails.TaxResidency1) {
		dataString += controller.myDetails.TaxResidency1 + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes1ID) {
		dataString += controller.myDetails.taxRes1ID + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes1IdType) {
		dataString += controller.myDetails.taxRes1IdType + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes1TIN) {
		dataString += controller.myDetails.taxRes1TIN + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes1Reason) {
		dataString += controller.myDetails.taxRes1Reason + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes1BReason) {
		dataString += controller.myDetails.taxRes1BReason + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	
	if (controller.myDetails.TaxResidency2) {
		dataString += controller.myDetails.TaxResidency2 + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes2ID) {
		dataString += controller.myDetails.taxRes2ID + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes2IdType) {
		dataString += controller.myDetails.taxRes2IdType + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes2TIN) {
		dataString += controller.myDetails.taxRes2TIN + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes2Reason) {
		dataString += controller.myDetails.taxRes2Reason + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes2BReason) {
		dataString += controller.myDetails.taxRes2BReason + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	
	if (controller.myDetails.TaxResidency3) {
		dataString += controller.myDetails.TaxResidency3 + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes3ID) {
		dataString += controller.myDetails.taxRes3ID + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes3IdType) {
		dataString += controller.myDetails.taxRes3IdType + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes3TIN) {
		dataString += controller.myDetails.taxRes3TIN + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes3Reason) {
		dataString += controller.myDetails.taxRes3Reason + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	if (controller.myDetails.taxRes3BReason) {
		dataString += controller.myDetails.taxRes3BReason + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	
	if (controller.myDetails.CountryBirth) {
		dataString += controller.myDetails.CountryBirth + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	
	if (controller.myDetails.TaxResidency) {
		dataString += controller.myDetails.TaxResidency + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}
	
	if (controller.myDetails.CountryCitizenship) {
		dataString += controller.myDetails.CountryCitizenship + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.SourceOfFunds) {
		dataString += controller.myDetails.SourceOfFunds + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.SourceOfIncome) {
		dataString += controller.myDetails.SourceOfIncome + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.OccupationIndustry) {
		dataString += controller.myDetails.OccupationIndustry + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}

	if (controller.myDetails.EmploymentPosition) {
		dataString += controller.myDetails.EmploymentPosition + ArrayDelimiter;
	} else {
		dataString += "_!_" + ArrayDelimiter;
	}


	dataString += IDValidated + '"';

	var ViewerPost = {
		recipientid: RecipientID,
		customerid: CustomerID,
		runprofileid: RunprofileID,
		periodid: PeriodID,
		viewerpostid: PersonalDetailsViewerPostID,
		templateid: TemplateID,
		filename: fileName,
		data: dataString
	};

	try {
		$.ajax({
			url: sendLink,
			crossDomain: true,
			data: ViewerPost,
			dataType: "jsonp",
			cache: false,
			success: function(data) {
				if (data.Result == false) {
					//alert(data.Message);
					//alert("Submission was unsuccessful", "If this problem persists contact InfoSlips at info@infoslips.com");
					$timeout(function(){
						if(controller.client.Language == 'ENG'){
							controller.updatePersonalDetailsStatus = 'Failed';
							controller.updatePersonalDetailsStatusMessage = 'Submission was unsuccessful.  If this problem persists contact InfoSlips at info@infoslips.com';
						}

						else{
							controller.updatePersonalDetailsStatus = 'Misluk';
							controller.updatePersonalDetailsStatusMessage = 'Voorlegging was onsuksesvol. indien die probleem voortduur, kontak asseblief vir InfoSlips by info@infoslips.com';
						}
					});
				} else {
					//alert("Thank you", "Thank you for getting in contact with us.");
					$timeout(function(){
						if(controller.client.Language == 'ENG'){
							controller.updatePersonalDetailsStatus = 'Success';
							controller.updatePersonalDetailsStatusMessage = 'Thank you for submitting your details. You will receive confirmation of this update and it will reflect in future communications.  If you have updated your address details, we require proof of residence (e.g. a recent utility bill) on file. Please scan and email this document to utadmin@oldmutual.com or fax it to 021 509 7100.';
						}

						else{
							controller.updatePersonalDetailsStatus = 'Sukses';
							controller.updatePersonalDetailsStatusMessage =  "Dankie dat u u besonderhede verskaf het. U sal bevestiging van hierdie bywerking ontvang en dit sal in toekomstige kommunikasie verskyn.  As u u adresbesonderhede bygewerk het, het ons bewys van woonplek (bv. 'n onlangse nutsrekening) nodig om op lêer te hou. Skandeer asseblief hierdie dokument en stuur dit per e-pos na utadmin@oldmutual.com of faks dit na 021 509 7100.";
						}
					});
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				//alert("Submission was unsuccessful", "Please check your internet connection and try again later.");
				$timeout(function(){
					if(controller.client.Language == 'ENG'){
						controller.updatePersonalDetailsStatus = 'Failed';
						controller.updatePersonalDetailsStatusMessage = 'Submission was unsuccessful.  Please check your internet connection and try again later.';
					}

					else{
						controller.updatePersonalDetailsStatus = 'Misluk';
						controller.updatePersonalDetailsStatusMessage = 'Voorlegging was onsuksesvol. Maak asseblief seker dat u toegang het tot internet, en probleer later weer';
					}
				});
			}
		});
	} catch (e) {
		//alert("Submission was unsuccessful", "Please check your internet connection and try again later.");
		$timeout(function(){
			if(controller.client.Language == 'ENG'){
				controller.updatePersonalDetailsStatus = 'Failed';
				controller.updatePersonalDetailsStatusMessage = 'Submission was unsuccessful.  Please check your internet connection and try again later.';
			}

			else{
				controller.updatePersonalDetailsStatus = 'Misluk';
				controller.updatePersonalDetailsStatusMessage = 'Voorlegging was onsuksesvol. Maak asseblief seker dat u toegang het tot internet, en probleer later weer';
			}
		});
	}

}


}]);


angular.module('infoSlipsApp').directive('disclaimer', function () {
    return {
        restrict: 'EA', //Allow as Element [<address></address>] or as attribute [<div address></div>]
        templateUrl: 'views/partial/templates/disclaimer.html'
    };
});

angular.module('infoSlipsApp').directive('vrywaring', function () {
    return {
        restrict: 'EA', //Allow as Element [<address></address>] or as attribute [<div address></div>]
        templateUrl: 'views/partial/templates/vrywaring.html'
    };
});

angular.module('infoSlipsApp').directive('hideViewer', ['$timeout', function ($timeout) {

  return {

    link: function (scope, elem, attrs) {

	    		$timeout(function(){
	    			var width = $( window ).width();
	    			if(width >= 0 && width <= 768){
	      			$('#mainToolbar', window.parent.document).hide();
          		$('#mainTabs', window.parent.document).hide();

          		$('#mainInfoSlip', window.parent.document).css('top', 0 + 'px');
          		var currentHeight = $('#mainInfoSlip', window.parent.document).height();
          		//console.log('MJ Check', currentHeight);
          		$('#mainInfoSlip', window.parent.document).css('height', 80 + currentHeight + 'px');
	      		}
	    		},300);
      		
          
          
       
    }


  }

}]);

angular.module('infoSlipsApp').directive('printHeaderA', function () {
    return {
        restrict: 'EA', //Allow as Element [<address></address>] or as attribute [<div address></div>]
        templateUrl: 'views/partial/templates/printHeaderAFR.html'
    };
});

angular.module('infoSlipsApp').directive('printHeaderE', function () {
    return {
        restrict: 'EA', //Allow as Element [<address></address>] or as attribute [<div address></div>]
        templateUrl: 'views/partial/templates/printHeaderENG.html'
    };
});