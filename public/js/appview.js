/* Main application view */
(function($) {
    AppView = {
        players: {
            comp: {
                name: 'Computer',
                class: 'a-box-check'
            },
            player: {
                name: 'Player',
                class: 'a-box-circle'
            }
        },
        init: function() {
            this.el = $('.a-board');
            this.msg = $('.a-board-msg');
            var self = this;
            this.el.find('.a-box').click(function () {
                var loc = $(this).data('loc');
                self._move($(this));
            });
        },
        _move: function(boardSquare) {
            this._updateBoard(boardSquare, this.players.player.class);
            //call to app.Move(), then call _updateBoard with new boardSquare
            /*
            var loc = coordinates.join();
            var dataAttr = '[data-loc="{}"]';
            var boardSquare = this.el.find(dataAttr.replace('{}', loc));
            this._updateBoard(boardSquare, this.comp);
            * */
        },
        _updateBoard: function(boardSquare, type) {
            boardSquare.find('i').addClass(type);
            boardSquare.unbind('click');
            boardSquare.addClass('marked');
        },
        _end: function(msg, playerName) {
            this.el.addClass('end');
            this.msg.addClass('show');
            if(playerName) {
                this.msg.find('span').text(playerName + ' ' + msg);
            }
            else {
                this.msg.find('span').text(msg);
            }
        },
        _reset: function() {
            var self = this;
            this.el.find('.a-box').each(function() {
                $(this).removeClass('marked');
                $(this).find('i').removeClass(self.players.player.class + ' ' + self.players.comp.class);
            });
            self.el.removeClass('end');
            self.msg.removeClass('show');
            self.msg.find('span').text('');
            self.init();
            // call to app.reset();
        }
    };

    /* acceptance tests */
    AppViewTest = {
        start: function() {

            this.el = $('.a-board');

            this._getBoardSquare('0,0').click();
            AppView._updateBoard(this._getBoardSquare('1,1'), AppView.players.comp.class);
            this._getBoardSquare('0,1').click();
            AppView._updateBoard(this._getBoardSquare('0,2'), AppView.players.comp.class);
            this._getBoardSquare('2,1').click();
            this._getBoardSquare('1,0').click();
            AppView._updateBoard(this._getBoardSquare('2,0'), AppView.players.comp.class);

            AppView._end('Wins', AppView.players.comp.name);
        },
        _getBoardSquare: function(loc) {
            var dataAttr = '[data-loc="{}"]';
            return this.el.find(dataAttr.replace('{}', loc));
        }
    };
})(jQuery);