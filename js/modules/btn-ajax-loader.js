/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

Adds loading animation to all elements with the attribute [data-btn-ajax-loader].

It ist meant for 'load more' button elements.

How it works:

1. When clicking on an element, a 'loader' icon appears within the button
2. As soon as the 'btnAjaxLoaderDone' event is triggered, the icon is hidden
the buton goes back to normal.

Required markup (button style can vary, of course:

<a href="#" class="btn btn-default" data-btn-ajax-loader>
    <span class="btn-text"></span>
</a>

*/

function resetBtnAjaxLoader($btn) {
    $btn.removeClass('loading');
}

function setBtnAjaxLoader($btn) {
    $btn.addClass('loading');
}

function initBtnAjaxLoader() {
    // find buttons and loop!
    var btn_elements = document.querySelectorAll('[data-btn-ajax-loader]');
    if(btn_elements.length > 0) {
        for (var i = 0; i < btn_elements.length; i++) {
            // init
            var $element = $(btn_elements[i]);
            // set dimensions...
            var width = $element.outerWidth();
            var height = $element.outerHeight();
            // ...but only if the item is visible (in case the element is within an elemnt with display:none, we get 0)
            if (width > 0) {
                $element
                    .css('width',width)
                    .css('height',height);
            }
            // listen for click event
            $element.on('click', function(e){
                // init
                var $btn = $(this);
                // are we validation the form? Delayed check so we can check if the error class has been added in the meanwhile
                if ($btn.parents('form').hasClass('validate-form') === true) {
                    // only apply 'loading' styles when there are NO errors
                    // required mini-delay to check if the class has been added
                    setTimeout(function(){
                        if($btn.parents('form').hasClass('has-errors') === false) {
                            setBtnAjaxLoader($btn);
                        }
                    },10);
                }
                // otherwise, let it load right away!
                else {
                    setBtnAjaxLoader($btn);
                }

            });
        }
    }
    return btn_elements;
}

function btnAjaxLoaderDone() {
    // find buttons and loop!
    var btn_elements = initBtnAjaxLoader();
    if(btn_elements.length > 0) {
        for (var i = 0; i < btn_elements.length; i++) {
            var $element = $(btn_elements[i]);
            resetBtnAjaxLoader($element);
        }
    }
}

function resetBtnAjaxLoaderSize() {
    // find buttons and loop!
    var btn_elements = document.querySelectorAll('[data-btn-ajax-loader]');
    if(btn_elements.length > 0) {
        for (var i = 0; i < btn_elements.length; i++) {
            // init
            var $element = $(btn_elements[i]);
            // re-set dimensions
            $element
                .css('width','')
                .css('height','');
        }
    }
}

$(function(){

    // on page load (delayed, because there was an issue when the page wasn't rendered properly and the button size was set wrong)
    // But it doesn't matter anyway, no need to rush, this can happen in the background
    setTimeout(function(){
        initBtnAjaxLoader();
    },1500);

    // custom event
    $(window).on('initBtnAjaxLoader', function() {
        initBtnAjaxLoader();
    });

    // custom event
    $(window).on('btnAjaxLoaderDone', function() {
        btnAjaxLoaderDone();
    });

    // listen for a viewport width change and re-init the loaders (because of resizing the)
    $(window).on('viewportWidthHasChanged', function(){
        // reset sizes
        resetBtnAjaxLoaderSize();
        // and delayed: set sizes anew
        setTimeout(function(){
            initBtnAjaxLoader();
        },150);
    });

});
