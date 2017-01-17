/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

The SoftPage AJAX Trigger

All child anchor-tags (<a>) of an element with a 'data-trigger-softpage' attribute
will toggle a softpage.

This feature can optionally be activated in an 'App Content Plugin' in the 'Display Options'.

In some cases, not all links within a section should trigger a softpage. That's why
we added the 'data-softpage-disabled' attribute for those links.

Example:

<div class"example-container" data-trigger-softpage>
    <a href="#">I will trigger a softpage</a>
    <a href="#" data-softpage-disabled>I will NOT trigger a softpage</a>
</div>

*/

import SoftPage from 'softpage';
import { nodeListToArray } from './helper-functions';

$(function(){

    const soft_page = new SoftPage({
        onPageLoaded: function(obj) {
            // scroll to top everytime a softpage is opened
            document.querySelector('.tingle-modal').scrollTop = 0;
            // do stuff slighty delayed, so we get all the information we need
            setTimeout(function(){
                // init page meta
                var modal_url = obj.modal.modal.baseURI;
                var modal_page_title_element = obj.modal.modalBoxContent.querySelector('#softpage-page-title');
                var modal_page_title = '';
                // Info for developer, that #softpage-page-title is missing on the detail page
                if (modal_page_title_element != null) {
                    var modal_page_title = modal_page_title_element.textContent;
                }else {
                    console.warn('Softpage is missing #softpage-page-title.');
                }
                // Google Tag Manager
                if (typeof dataLayer !== 'undefined') {
                    dataLayer.push({
                        'event': 'VirtualPageview',
                        'virtualPageURL': modal_url,
                        'virtualPageTitle': modal_page_title,
                    });
                }
                // trigger custom events
                $(window).trigger('initFormModalTrigger');
                $(window).trigger('initOnScreen');
                $(window).trigger('initiSwiperInstances');
            },50);
        },
        onSoftpageClosed: function (obj) {
            // hide site overlay
            $(window).trigger('hideSiteOverlay');
        }
    });

    function initSoftpageTrigger() {
        nodeListToArray(document.querySelectorAll('[data-trigger-softpage] a:not([data-softpage-disabled])')).map((value) => {
            value.addEventListener('click', (event) => {
                // instantly toggle site overlay (improves "felt performance")
                $(window).trigger('showSiteOverlay');
                // load softpage
                event.preventDefault();
                soft_page.loadPage(event.currentTarget.href, true);
            });
        });
    }

    // on page load
    initSoftpageTrigger();

    $(window).on('initSoftpageTrigger', function() {
        initSoftpageTrigger();
    });

});