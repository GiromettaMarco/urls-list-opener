var opener = {

  // Options (edit this)
  listPath: 'list.php',
  engine: 'single.php',
  delay: 2000,

  // Layout related options
  tableSelector: '#articles-table-body',
  counterSelector: '#counter',
  totalSelector: '#total',
  currentSelector: '#current',

  list: [],
  count: 0,

  run: function() {
    $.ajax({
      url: opener.listPath,
      success: function(result) {
        opener.list = result.list;
        $(opener.counterSelector).addClass('active');
        $(opener.totalSelector).html(opener.list.length);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      },
      complete: function(jqXHR, textStatus) {
        if (textStatus === 'success') {
          opener.fillTable();
        }
      }
    });
  },

  fillTable: function() {
    $.each(opener.list, function(index, value) {
      setTimeout(function() {
        opener.writeRow(index, value);
        if (index === (opener.list.length - 1)) {
          $(opener.counterSelector).removeClass('active');
          $(opener.counterSelector).addClass('done');
        }
      }, opener.delay * index);
    });
  },

  writeRow: function(index, value) {

    var newID = 'row-' + index;
    // Row
    var newRow = jQuery('<tr/>', {
      id: newID
    }).appendTo(opener.tableSelector);
    // Column Number
    jQuery('<td/>', {
      class: 'col-numb',
      text: index + 1
    }).appendTo(newRow);
    // Column Source
    var newColumnSource = jQuery('<td/>', {
      class: 'col-link'
    }).appendTo(newRow);
    // Link
    jQuery('<a/>', {
      href: window.location.href + 'single.php?prt=1&url=' + value,
      target: '_blank',
      text: 'source'
    }).appendTo(newColumnSource);
    // Column Title
    var newColumnTitle = jQuery('<td/>', {
      class: 'col-title',
      text: 'loading ...'
    }).appendTo(newRow);
    // Column Data
    var newColumnData = jQuery('<td/>', {
      class: 'col-data',
      text: 'loading ...'
    }).appendTo(newRow);

    $.ajax({
      url: opener.engine,
      data: {
        url: value
      },
      success: function(result) {
        if (result.status) {
          $(newColumnTitle).html(result.title);
          $(newColumnData).html(result.data);
        } else {
          $(newColumnTitle).html('invalid url');
          $(newColumnData).html(':(');
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        $(newColumnTitle).html('connection error');
        $(newColumnData).html('X(');
      }
    });

    opener.count += 1;
    $(opener.currentSelector).html(opener.count);

  }

};
