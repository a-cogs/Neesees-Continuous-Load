const ready = (elem, callback) => {
    let loaded = setInterval(() => {
        if ( document.querySelectorAll(elem).length ) {
            clearInterval(loaded);
            callback();
        }
    }, 100);
}

ready('.paginate', () => {
    const $ = jQuery;

    // STRING TO HTML FUNCTION
    var stringToHTML = function (str) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body;
    };

    // PRODUCT LOAD FUNCTION
    let page = 2; // Start with page 2
    const url = location.origin + location.pathname;
    const loadProducts = newPage => {
        scrolled = true;

        // SHOW LOADER
        $('.load-more__icon').addClass('da-load');

        fetch(`${url}?page=${newPage}`)
        .then((response) => {
            return response.text();
        })
        .then((html) => {
            // Parse the page string to HTML then populate the new products
            let prodPage = stringToHTML(html),
                newProds = $(prodPage).find('.product-list')
                                .clone()
                                .addClass(`prod-page-${newPage}`);

                if ( !$(`.prod-page-${newPage}`).length ) {
                    newProds.insertBefore('.load-more__icon');
                }
            // Update page variable for next loop
            page ++;
        })
        .then(() => {
            $('.load-more__icon').removeClass('da-load');
        })
        .then(() => {
            setTimeout(() => {
                scrolled = false;
            }, 1500);
        })
        .catch((err) => console.warn('Something went wrong with the continuous load function.', err));
    }

    // WINDOW SCROLL/AUTO-POPULATE FUNCTION
    const loadMax = parseInt($('.paginate > span.page:nth-last-child(2)').text());
    let scrolled = false; // This variable prevents multiple events from triggering at once
    $(window).scroll(() => {
        // Continue if the max hasn't been reached
        if ( page <= loadMax && !scrolled ) {
            // Track window scroll point
            const winH  = window.innerHeight,
                  winP  = $(window).scrollTop(),
                  winB  = winP + winH,
                  loadP = $('.paginate').offset().top;
            
            // Load more products when scrolled to bottom
            if ( winB > ( loadP - 700 ) ) {
                loadProducts(page);
            }
        }
    });

    // RESET WINDOW TO FIRST PAGE IF LOADED ONTO ANY PAGE OTHER THAN FIRST PAGE
    const queryString = window.location.search,
          urlParams = new URLSearchParams(queryString),
          hasPage = urlParams.get('page');
    
    if ( hasPage ) {
        urlParams.delete('page');
        const newParams = urlParams.toString();
        location.href = `${url}?${newParams}`
    }
}); 
