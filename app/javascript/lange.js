(function() {
  var root;
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.Lange = {};
  Lange.schedule = function(events) {
    return events.sort(function(a, b) {
      return new Date(a.dtstart) - new Date(b.dtstart);
    });
  };
}).call(this);
