(function ($) {

    let settings = {};
    let list = [];
    let count = 0;

    $.fn.uloOpen = function (options) {

        settings = $.extend({}, $.fn.uloOpen.defaults, options);
        settings.tableBody = this;

        $.fn.uloOpen.run();

        return this;

    };

    $.fn.uloOpen.defaults = {
        // Functional options
        listPath: 'list.txt',
        engine: 'single.php',
        delay: 2000,
        // Layout related options
        statusSelector: '#ulo-status',
        currentSelector: '#ulo-current',
        totalSelector: '#ulo-total'
    };

    $.fn.uloOpen.run = function () {
        $.ajax({
            url: 'list.php?fl=' + encodeURIComponent(settings.listPath),
            success: function (result) {
                list = result.list;
                $(settings.statusSelector).addClass('ulo-active');
                $(settings.totalSelector).html(list.length);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            },
            complete: function (jqXHR, textStatus) {
                if (textStatus === 'success') {
                    $.fn.uloOpen.fillTable();
                }
            }
        });
    };

    $.fn.uloOpen.fillTable = function () {
        $.each(list, function (index, value) {
            setTimeout(function () {
                $.fn.uloOpen.writeRow(index, value);
                if (index === (list.length - 1)) {
                    $(settings.statusSelector).removeClass('ulo-active');
                    $(settings.statusSelector).addClass('ulo-done');
                }
            }, settings.delay * index);
        });
    };

    $.fn.uloOpen.writeRow = function (index, value) {
        const newID = 'ulo-row-' + index;
        // Row
        const newRow = $('<tr/>', {
            id: newID
        }).appendTo(settings.tableBody);
        // Column Number
        $('<td/>', {
            class: 'ulo-col-numb',
            text: index + 1
        }).appendTo(newRow);
        // Column Link
        const newColumnLink = $('<td/>', {
            class: 'ulo-col-link'
        }).appendTo(newRow);
        $('<a/>', {
            href: value,
            target: '_blank',
            text: 'link'
        }).appendTo(newColumnLink);
        // Column Source
        const newColumnSource = $('<td/>', {
            class: 'ulo-col-source'
        }).appendTo(newRow);
        // Source
        $('<a/>', {
            href: window.location.href + 'single.php?prt=1&url=' + value,
            target: '_blank',
            text: 'source'
        }).appendTo(newColumnSource);
        // Column Title
        const newColumnTitle = $('<td/>', {
            class: 'ulo-col-title',
            text: 'loading ...'
        }).appendTo(newRow);
        // Column Data
        const newColumnData = $('<td/>', {
            class: 'ulo-col-data',
            text: 'loading ...'
        }).appendTo(newRow);

        $.ajax({
            url: settings.engine,
            data: {
                url: value
            },
            success: function (result) {
                if (result.status) {
                    $(newColumnTitle).html(result.title);
                    $(newColumnData).html(result.data);
                } else {
                    $(newColumnTitle).html('invalid url');
                    $(newColumnData).html(':(');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                $(newColumnTitle).html('connection error');
                $(newColumnData).html('X(');
            }
        });

        count += 1;
        $(settings.currentSelector).html(count);
    };

})(jQuery);
