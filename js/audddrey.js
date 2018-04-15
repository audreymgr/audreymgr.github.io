function createTransition(property, inverse) {
  return Barba.BaseTransition.extend({
    start: function () {
      document.getElementsByTagName('body')[0].classList.add('transition');
      this.newContainerLoading.then(this.move.bind(this));
    },

    move: function () {
      var current = this.oldContainer;
      var next = this.newContainer;

      // prep next
      next.style.visibility = 'visible';
      next.style[property] = inverse ? '-100%' : '100%';

      // hide current
      var hideParams = {
        targets: current,
        easing: 'easeInOutQuad',
        duration: 500
      };
      hideParams[property] = inverse ? '100%' : '-100%';

      // show next
      var showParams = {
        targets: next,
        easing: 'easeInOutQuad',
        duration: 500
      };
      showParams[property] = 0;

      return Promise
        .all([
          anime(hideParams).finished,
          anime(showParams).finished
        ])
        .then((function () {
          current.style.visibility = 'hidden';
          document.getElementsByTagName('body')[0].classList.remove('transition');
          this.done();
        }).bind(this));
    }
  });
}

var down = createTransition('top', false);
var up = createTransition('top', true);
var right = createTransition('left', false);
var left = createTransition('left', true);

Barba.Pjax.getTransition = function () {
  var currentUrlParts = Barba.HistoryManager.currentStatus().url.replace(/https?:\/\//, '').split('/');
  var prevUrlParts = Barba.HistoryManager.prevStatus().url.replace(/https?:\/\//, '').split('/');

  var currentIsHome = prevUrlParts.length === 2;
  var nextIsHome = currentUrlParts.length === 2;

  if (currentIsHome && !nextIsHome) {
    return down;
  } else if (!currentIsHome && nextIsHome) {
    return up;
  } else {
    var currentDateParts = prevUrlParts.slice(1, -1);
    var currentDate = new Date(currentDateParts[0], currentDateParts[1] - 1, currentDateParts[2]);
    var nextDateParts = currentUrlParts.slice(1, -1);
    var nextDate = new Date(nextDateParts[0], nextDateParts[1] - 1, nextDateParts[2]);

    if (nextDate > currentDate) {
      return right;
    } else {
      return left;
    }
  }
};

Barba.Pjax.Dom.wrapperId = 'navigator-wrapper';
Barba.Pjax.Dom.containerClass = 'navigator';

document.addEventListener('DOMContentLoaded', function () {
  Barba.Prefetch.init();
  Barba.Pjax.start();
});
