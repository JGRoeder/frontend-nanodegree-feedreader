$(function() {
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         it('each have non-empty url properties', function(){
           allFeeds.forEach(function(item){
             //exists
             expect(item.url).toBeDefined();
             // is of non-empty type
             expect(typeof item.url).toBe('string');
             // is not an empty string
             expect(item.url.length).not.toBe(0);
           });
         });

         it('each have non-empty name properties', function(){
           allFeeds.forEach(function(item){
             // exists
             expect(item.name).toBeDefined();
             // is of a non-empty type
             expect(typeof item.name).toBe('string');
             // is not an empty string
             expect(item.name.length).not.toBe(0);
           });
         });
    });

    describe ('The Menu', function(){

        it('should be hidden by default', function(){
         expect($('body').hasClass('menu-hidden')).toBe(true);
         expect( $('.menu').offset().left + $('.menu').width() < 0 ).toBe(true);
        });

        it('toggles when menu icon is clicked', function(){

          // temporarily set transitions to none ( removes animation delay )
          $(".menu").css({ transition: 'none'});

          // emulate menu click ( menu visible )
          // check that body loses menu-hidden class
          // check that menus left offset + menus width is >= than total menu width ( thus the full menu is visible )
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(false);
          expect( $('.menu').offset().left + $('.menu').width() >= $('.menu').width() ).toBe(true);

          // emulate menu click ( menu now hidden )
          // check that body regains menu-hidden class
          // check that menus left offset + menus width is <= 0 ( thus menu is fully hidden );
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(true);
          expect( $('.menu').offset().left + $('.menu').width() <= 0 ).toBe(true);

          // now remove the inline transition styles we applied earlier
          $('.menu').css('transition','');
        });

    });

    describe('Initial Entries', function(){

      beforeEach( function(done){
        loadFeed(0, done);
      });

      it('should append at least a single feed item', function(){
        expect($('.feed .entry').length).toBeGreaterThan(0);
      });

    });

    describe('New Feed Selection', function(){
      var content;

      beforeEach(function(done){
        //load the first feed.
        loadFeed(0);
        //store current feed info ( should be 0th entry )
        content = $('.feed .entry');
        // load a different feed
        loadFeed(1, done);
      });

      it('should load a new feed', function() {
        // check that each current entry is not the same as
        // the one stored in 'content' at the same index
        $('.feed .entry').each(function(index, value){
          expect(content[index].isEqualNode(value)).toBe(false);
        });
      });
    });

}());
