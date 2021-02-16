
/*********************************************************
// GLOBALS --- 
**********************************************************/
var uniqueItems = { Invoices: [], InvoiceTypes: [], ServiceTypes: [], TransactionTypes: [], servtypetrntypes: [], servtypetrntypesamt: [] };
var filterDocumentNumber;
var calcAmt = 0.00;

// Document Ready Methods Included
$(document).ready(function () {
  $('.summary').show();
  $($('#summaryActive')).addClass('activeTab');
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Main Navigation
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // Hide Inactive Tabs, remove striped line from Inactive Tabs, change style based on selected tab

  $('.nav-justified li a#summary').click(function () {
    $('.summary').show();
    $($('#summaryActive')).addClass('activeTab');
    $('.updateDetails, .statementDetail, .invoiceDetail, .creditNoteDetail, .debitNoteDetail, .documentArchiveDetail').hide();
    $($('#updateDetailsActive, #statementActive, #invoicesActive, #creditNotesActive, #debitNotesActive, #documentArchiveActive')).removeClass('activeTab');
  });

  $('.nav-justified li a#updateDetails').click(function () {
    $('.updateDetails').show();
    $($('#updateDetailsActive')).addClass('activeTab');
    $('.summary, .statementDetail, .invoiceDetail, .creditNoteDetail, .debitNoteDetail, .documentArchiveDetail').hide();
    $($('#summaryActive, #statementActive, #invoicesActive, #creditNotesActive, #debitNotesActive, #documentArchiveActive')).removeClass('activeTab');
  });

  $('.nav-justified li a#statement').click(function () {
    $('.statementDetail').show();
    $($('#statementActive')).addClass('activeTab');
    createStatementGrid(StatementLinesGlobalArray);
    $('.summary, .updateDetails, .invoiceDetail, .creditNoteDetail, .debitNoteDetail, .documentArchiveDetail').hide();
    $($('#summaryActive, #updateDetailsActive, #invoicesActive, #creditNotesActive, #debitNotesActive, #documentArchiveActive')).removeClass('activeTab');
  });

  $('.nav-justified li a#invoices').click(function () {
    $('.invoiceDetail').show();
    $($('#invoicesActive')).addClass('activeTab');
    $('.summary, .updateDetails, .statementDetail, .creditNoteDetail, .debitNoteDetail, .documentArchiveDetail').hide();
    $($('#summaryActive, #updateDetailsActive, #statementActive, #creditNotesActive, #debitNotesActive, #documentArchiveActive')).removeClass('activeTab');
  });
  
  $('.nav-justified li a#creditnotes').click(function () {
    $('.creditNoteDetail').show();
    $($('#creditNotesActive')).addClass('activeTab');
    $('.summary, .updateDetails, .statementDetail, .invoiceDetail, .debitNoteDetail, .documentArchiveDetail').hide();
    $($('#summaryActive, #updateDetailsActive, #statementActive, #invoicesActive, #debitNotesActive, #documentArchiveActive')).removeClass('activeTab');
  });

  $('.nav-justified li a#debitnotes').click(function () {
    $('.debitNoteDetail').show();
    $($('#debitNotesActive')).addClass('activeTab');
    $('.summary, .updateDetails, .statementDetail, .invoiceDetail, .creditNoteDetail, .documentArchiveDetail').hide();
    $($('#summaryActive, #updateDetailsActive, #statementActive, #invoicesActive, #creditNotesActive, #documentArchiveActive')).removeClass('activeTab');
  });

  $('.nav-justified li a#documentarchive').click(function () {
    $('.documentArchiveDetail').show();
    $($('#documentArchiveActive')).addClass('activeTab');
    $('.summary, .updateDetails, .statementDetail, .invoiceDetail, .creditNoteDetail, .debitNoteDetail').hide();
    $($('#summaryActive, #updateDetailsActive, #statementActive, #invoicesActive, #creditNotesActive, #debitNotesActive')).removeClass('activeTab');
  });

  $('#myCollapsible').collapse({
    toggle: true
  });


  // Intialise Contact Us Modal Dialog
  $("#contactUsWindow").kendoWindow({
    width: "600px",
    title: "Contact Us",
    visible: false,
    modal: true,
    resizable: false
  });

  function onCloseDocWindow(e) {
    // Destroy all controls contained in the window
    $("#divGraphWindow").data("kendoChart").destroy();
    $("#divGridWindow").data("kendoGrid").destroy();

    $("#divGraphWindow").remove();
    $("#divGridWindow").remove();
  }

  function onOpenDocWindow(e) {
    $("#documentsWindow").closest(".k-window").css({
      // Position the window at the top of the screen
      top: "0px",
      position: "fixed"
    });
  }

  // Intialise Supporting Documents Modal Dialog
  $("#documentsWindow").kendoWindow({
    width: "840px",
    height: "620px",
    title: "Supporting Doc",
    visible: false,
    modal: true,
    resizable: false,
    scrollable: false,
    open: onOpenDocWindow,
    close: onCloseDocWindow
  });


  function onExpandBar(e) {
    var docNo = $(e.item).find("> .k-link").attr("tag");
    docNo = $.trim(docNo);

    // Validate if the document was loaded before
    if ($("#divGrid" + docNo).data("kendoGrid") != null) {
      return;
    }

    // Validate if the dom contains the container
    if ($("#chartParent" + docNo).length) {
      // Add div to container
      $("#chartParent" + docNo).append('<div id="divGraph' + docNo + '" ></div>');
      // Set Graph Data
      createPieGraph(InvoiceLinesGlobalArray, "#divGraph" + docNo, "INV", docNo);
    }

    // Create Place Holders for output
    $("#gridParent" + docNo).append('<div id="divGrid' + docNo + '"></div>');
    // Set Grid data
    createBarDocGrid(InvoicesGlobalArray, InvoiceLinesGlobalArray, docNo);
  }

  $(".documentsBar").kendoPanelBar({
    //expandMode: "single",
    expandMode: "multiple",
    expand: onExpandBar
  }).css({ margin: "0px auto" });

  $(".documentsBar .excelCancelEvent").click(function (e) {
    //alert("click");
    e.preventDefault();
    e.stopPropagation();
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Main Navigation
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function onTabSelect(e) {
    var selectedTab = $(e.item).find(".k-link").text();
    selectedTab = $.trim(selectedTab);

    // Statement
    if (selectedTab == "Statement") {
      createStatementGrid(StatementLinesGlobalArray);
    }
  }

  function onTabError(e) {
    alert("Loading failed with " + e.xhr.statusText + " " + e.xhr.status);
  }

  // Create Tab Strip
  $("#tabstrip").kendoTabStrip({
    select: onTabSelect,
    error: onTabError
  });
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // End Navigation
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

});

/*********************************************************
 --- SHARED FUNCTIONS ---
**********************************************************/
// Create Pie chart based on passed in filter criteria
function createPieGraph(data, targetDiv, filterInvType, filterInvNumber) {

  // Set default Filter Value
  var selectedFilter = {
    field: "invtype", operator: "eq", value: filterInvType
  };

  // Validate if the Invoice number was specified
  if (filterInvNumber != null && filterInvNumber != '') {
    selectedFilter = [{
      field: "invno", operator: "eq", value: filterInvNumber
    },
    {
      field: "invtype", operator: "eq", value: filterInvType
    }];
  }

  // Set Data source with grouping enabled
  var statementChartData = new kendo.data.DataSource({
    data: data,
    group:
  {
    field: "servtype",
    aggregates: [{ field: "trnamt", aggregate: "sum" }]
  },
    filter: selectedFilter
  });

  // Read data
  statementChartData.read();

  // Construct Series data
  var series = [],
items = statementChartData.view(),
length = items.length,
item;


  // Build Series data array  
  for (var i = 0; i < length; i++) {
    item = items[i];
    series.push({ category: item.value, value: item.aggregates.trnamt.sum })
  }

  // Create actual chart on specified Div
  $(targetDiv).kendoChart({
    dataSource: statementChartData,
    theme: "default",
    legend: {
      position: "right",
      labels: {
        template: "#= text # (#= kendo.format('{0:N2}', value) #)"
      }
    },
    seriesDefaults: {
      type: "pie",
      labels: {
        visible: false
      }
    },
    series: [{
      data: series
    }],
    seriesColors: [
        "#5ccc37",
        "#eeee2a",
        "#ffa72e",
        "#fd7631",
        "#ef3434",
        "#5e9efd",
        "#b2d0ea",
        "#486d91"
    ],
    tooltip: {
      visible: true,
      template: "#= category # (#= kendo.format('{0:P}', percentage)#)"
    }
  });

  // Validate that the graph needs to be drawn
  if (length <= 1) {
    $(targetDiv).hide();
  }
  else {
    $(targetDiv).show();
  }
}
function createChartSeries(chartSeriesData) {
  for (var i = 0; i < uniqueItems.TransactionTypes.length; i++) {
    var dataItems = [];

    for (var ii = 0; ii < uniqueItems.ServiceTypes.length; ii++) {
      var aggregatecombo = uniqueItems.ServiceTypes[ii] + "#" + uniqueItems.TransactionTypes[i];
      var index = $.inArray(aggregatecombo, uniqueItems.servtypetrntypes);
      if (index != -1) {

        dataItems.push(uniqueItems.servtypetrntypesamt[index]);
      }
      else {
        dataItems.push(0);
      }
    }

    var chartSerie = { name: uniqueItems.TransactionTypes[i], data: dataItems }
    chartSeriesData.push(chartSerie);
  }

}
// Create Statement Line Items
function createStatementGrid(data) {
  // Destroy old grids
  if ($("#statementGrid").data("kendoGrid") != null) {
    $("#statementGrid").data("kendoGrid").destroy();
  }
  $("#statementGrid").remove();

  // Recreate place holder
  $("#statementGridParent").append('<div id="statementGrid"></div>');

  // Load grid
  // Load style for indicator colour on statement
  var keyInvStyle = { 'class': "imageFilter${ doctype }" };

  $("#statementGrid").kendoGrid({

    columns: [
        { field: "docdate", title: "Date" },
        { field: "docno", title: "Document Number", width: "100%" },
        { field: "doctype", title: "Type", attributes: keyInvStyle },
        { field: "trnamt", title: "Transaction Amount", attributes: { align: "right" }, format: "{0:N2}" },
        { field: "pmtamt", title: "Received Amount", attributes: { align: "right" }, format: "{0:N2}" },
        { field: "balamt", title: "Balance Outstanding", attributes: { align: "right" }, format: "{0:N2}" },
        { template: '<div class="tooltipQuery info" title="Query this item" style="cursor:pointer"><div style="margin-top: -2px !important">i</div>', attributes: { style: "cursor:pointer;", onclick: "LineItemQuery('${ docdate }','${ docno }','${ doctype }','${ trnamt }','${ pmtamt }','${ balamt }')" } }//,
        //{ template: '<img src="keyDOC.png" title="View Detail" style="cursor:pointer"  />', attributes: { class: "${ showdoc }", name: "${ docno }", style: "cursor:pointer", onclick: "showSupportingDocument('${ docno }', '${ doctype }', '${ docno } - ${ docdate } - ${ trnamt }')" } }
    ],
    dataSource: {
      data: data//,
      // pageSize: 20,
    },
    groupable: true,
    sortable: true,
    filterable: true,
    pageable: false,
    scrollable: false
  });
}

// Line Item Grid
function createWindowDocGrid(invoicesData, lineItemsData, filterInvNumber) {
  // Set default Filter Value
  var selectedFilter = {
    field: "invno", operator: "eq", value: filterInvNumber
  };

  var gridData = new kendo.data.DataSource({
    data: lineItemsData,
    filter: selectedFilter,
    //pageSize: 10,
    group: [
       {
         field: "servtype",
         aggregates: [
             { field: "trnamt", aggregate: "sum" }
         ]
       },
       {
         field: "servtrntype",
         aggregates: [
             { field: "trnamt", aggregate: "sum" }
         ]
       }
    ]
  });

  // Set global Filter Value
  filterDocumentNumber = filterInvNumber;
  var filteredInvoice = $.grep(invoicesData, function (arrayItem, index) {
    return filterInvoiceItem(arrayItem);
  });

  $("#divGridWindow").kendoGrid({

    columns: [
        { field: "desc", title: "Description", width: "140px" },
        {
          field: "servtype", title: "Service Type", width: "90px",
          groupHeaderTemplate: "<b>Service Type: #= value# (#= kendo.format('{0:N2}',getServiceTypeSum('divGridWindow'))#)</b>"
        },
        {
          field: "servtrntype", title: "Transaction Type", width: "90px",
          groupHeaderTemplate: "<b>Service Transaction Type: #= value# (#= kendo.format('{0:N2}',getServiceTrnTypeSum(value, 'divGridWindow'))#)</b>"
        },
        { field: "qty", title: "Quantity", attributes: { align: "right" }, width: "80px" },
        {
          field: "unitprice", title: "Unit Price",
          width: "90px", attributes: {
            align: "right"
          },
          format: "{0:N2}",
          footerTemplate: '<table cellpadding="0" cellspacing="0"><tr><td align="right" style="line-height:12px !important">SUBTOTAL</td></tr><tr><td align="right" style="line-height:12px !important">VAT</td></tr><tr><td align="right" style="line-height:12px !important">TOTAL (' + filteredInvoice[0].invcur + ')</td></tr></table>'
        },
        {
          field: "trnamt", title: "Amount",
          width: "90px",
          format: "{0:N2}",
          attributes: { align: "right" },
          footerTemplate: '<table cellpadding="0" cellspacing="0"><tr><td align="right" style="line-height:12px !important">' + filteredInvoice[0].subtotal + '</td></tr><tr><td align="right" style="line-height:12px !important">' + filteredInvoice[0].vat + '</td></tr><tr><td align="right" style="line-height:12px !important">' + filteredInvoice[0].total + '</td></tr></table>'
        }],
    dataSource: gridData,
    sortable: true,
    filterable: true,
    pageable: false,
    scrollable: false
  });

  $(".k-footer-template td").css("padding", "0px");
}


function createBarDocGrid(invoicesData, lineItemsData, filterInvNumber) {
  
  var gridSeries = [
        "#5ccc37",
        "#eeee2a",
        "#ffa72e",
        "#fd7631",
        "#ef3434",
        "#5e9efd",
        "#b2d0ea",
        "#486d91"
  ];

  // Set default Filter Value
  var selectedFilter = { field: "invno", operator: "eq", value: filterInvNumber };
  var gridData = new kendo.data.DataSource({
    data: lineItemsData,
    filter: selectedFilter,
    //pageSize: 10,
    group: [
        {
          field: "servtype",
          aggregates: [
              { field: "trnamt", aggregate: "sum" }
          ]
        },
        {
          field: "servtrntype",
          aggregates: [
              { field: "trnamt", aggregate: "sum" }
          ]
        },
        {
          field: "branch",
          aggregates: [
              { field: "trnamt", aggregate: "sum" }
          ]
        }
    ]
  });

  // Set global Filter Value
  filterDocumentNumber = filterInvNumber;
  var filteredInvoice = $.grep(invoicesData, function (arrayItem, index) {
    return filterInvoiceItem(arrayItem);
  });

  var myGrid = $("#divGrid" + filterInvNumber).kendoGrid({
    columns: [
        {
          field: "desc", title: "Description", width: "33%"
        },
        {
          field: "servtype", title: "Service Type", width: "33%",
          groupHeaderTemplate: "<table class='invHeaderGroupTotals' cellpadding='0' cellspacing='0'><tr><td class='invHeaderGroupTotalsLeft ServiceTd'>Service Type: #= value# </td><td class='invHeaderGroupTotalsRight ServiceTd'>#= kendo.format('{0:N2}',getServiceTypeSum(value, 'divGrid" + filterInvNumber + "'))#</tr></td></table>"
        },
        {
          field: "servtrntype", title: "Transaction Type", width: "33%",
          template: function (dataItem) {
            return getGroupValue('servtrntype', 'servtrntype', dataItem.servtrntype);
          },
          filterable: {
            extra: true,
            operators: {
              string: {
                startswith: "Starts with"
              }
            }
          },

          groupHeaderTemplate: "<table class='invHeaderGroupTotals' cellpadding='0' cellspacing='0'><tr><td class='invHeaderGroupTotalsLeft TransactionTd'>Service Transaction Type: #= getGroupValue('servtrntype', 'servtrntype',value)#</td><td class='invHeaderGroupTotalsRight TransactionTd'>#= kendo.format('{0:N2}',getServiceTrnTypeSum(value, 'divGrid" + filterInvNumber + "'))#</td></tr></table>"
        },
        {
          field: "branch", title: "Branch", width: "33%",
          template: function (dataItem) {
            return getGroupValue('branch', 'branch', dataItem.branch);
          },
          filterable: {
            extra: true,
            operators: {
              string: {
                startswith: "Starts with"
              }
            }
          },
          groupHeaderTemplate: "<table class='invHeaderGroupTotals' cellpadding='0' cellspacing='0'><tr><td class='invHeaderGroupTotalsLeft BranchTd'>Branch: #= getGroupValue('branch','branch',value) #</td><td class='invHeaderGroupTotalsRight BranchTd'>#= kendo.format('{0:N2}',getBranchSum(value,'divGrid" + filterInvNumber + "'))#</td></table>"

        },
        { field: "qty", title: "Quantity", attributes: { align: "right" } },
        {
          field: "unitprice", title: "Unit Price", attributes: { align: "right" },
          format: "{0:N2}",
          footerTemplate: '<div class="invTotals""><table cellpadding="0" cellspacing="0"><tr><td>SUBTOTAL</td></tr><tr><td>VAT</td></tr><tr><td>TOTAL (' + filteredInvoice[0].invcur + ')</td></tr></table></div>'
        },
        {
          field: "searchamt", title: "Amount",
          format: "{0:N2}",
          attributes: { align: "right" },
          footerTemplate: '<div class="invTotalsVal"><table cellpadding="0" cellspacing="0"><tr><td>' + kendo.format("{0:N2}", filteredInvoice[0].subtotal) + '</td></tr><tr><td>' + kendo.format("{0:N2}", filteredInvoice[0].vat) + '</td></tr><tr><td>' + kendo.format("{0:N2}", filteredInvoice[0].total) + '</td></tr></table></div>'
        }],
    dataSource: gridData,
    sortable: true,
    filterable: true,
    pageable: false,
    scrollable: false
  });

  //collapse rows
  var grid = $("#divGrid" + filterInvNumber).data("kendoGrid");
  grid.collapseRow("tr");

  $(".k-footer-template td").css("padding", "0px");
}

function getServiceTypeSum(value, targetDiv) {
  var datasource = $("#" + targetDiv).data("kendoGrid").dataSource;

  $(datasource.view()).each(function (index, element) {
    if (element.value === value) {
      result = element.aggregates.trnamt.sum;
    }
  });

  return result;
}

//calculate servtrntype total
function getServiceTrnTypeSum(value, targetDiv) {
  var datasource = $("#" + targetDiv).data("kendoGrid").dataSource;

  $(datasource.view()).each(function (index, element) {
    $(element.items).each(function (indexSub, elementSub) {
      if (getGroupValue("servtrntype", "servtrntype", elementSub.value) === getGroupValue("servtrntype", "servtrntype", value)) {
        if (element.value === getGroupValue("servtrntype", "servtype", value)) {

          result = elementSub.aggregates.trnamt.sum;
        }
      }
    });
  });

  return result;
}

//return group value from pipe seperated value
//for type branch      format : branch|servtrntype|servtype
//for type servtrntype format : servtrntype|branch|servtype
function getGroupValue(type, level, value) {
  var arr = value.split("|");
  var result = "";

  if (type == "branch") {
    if (level == "branch") {
      result = arr[0];
    }
    if (level == "servtrntype") {
      result = arr[1];
    }
    if (level == "servtype") {
      result = arr[2];
    }
  }

  if (type == "servtrntype") {
    if (level == "branch") {
      result = "";
    }
    if (level == "servtrntype") {
      result = arr[0];
    }
    if (level == "servtype") {
      result = arr[1];
    }
  }

  return result;
}

//Calculate Branch Totals
function getBranchSum(value, targetDiv) {
  var datasource = $("#" + targetDiv).data("kendoGrid").dataSource;

  $(datasource.view()).each(function (index, element) {
    $(element.items).each(function (indexsub, elementsub) {
      $(elementsub.items).each(function (indexsubbr, elementsubbr) {
        if (element.value === getGroupValue("branch", "servtype", value)) {
          if (getGroupValue("servtrntype", "servtrntype", elementsub.value) === getGroupValue("branch", "servtrntype", value)) {
            if (getGroupValue("branch", "branch", elementsubbr.value) === getGroupValue("branch", "branch", value)) {
              result = elementsubbr.aggregates.trnamt.sum;
            }
          }
        }
      });
    });
  });

  return result;
}

function filterInvoiceItem(invoiceRow) {

  if (invoiceRow.invno != filterDocumentNumber) {
    return false;
  }

  // Allow filter
  return true;
}

function showContactUsDialog() {
  $("#contactUsWindow").data("kendoWindow").center().open();
}

function showSupportingDocument(docNumber, docType, windowTitle) {
  // Create Place Holders for output Window
  $("#chartParentWindow").append('<div id="divGraphWindow"></div>');
  $("#gridParentWindow").append('<div id="divGridWindow"></div>');
  // Set Graph Data 
  createPieGraph(InvoiceLinesGlobalArray, "#divGraphWindow", docType, docNumber);
  // Set Grid data
  createWindowDocGrid(InvoicesGlobalArray, InvoiceLinesGlobalArray, docNumber);
  // Show Dialog
  $("#documentsWindow").data("kendoWindow").title(windowTitle).center().open();
}

function openExcel(csv) {
  try {
    window.open(csv, "_new");
  }
  catch (e) {
    //alert("Document was not found");
  }
}
