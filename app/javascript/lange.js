(function() {
  var root;
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.Lange = {};
  Lange.schedule = function(events) {
    var date, event, schedule, scheduleAsList, scheduleSlot, _i, _len, _name;
    schedule = {};
    for (_i = 0, _len = events.length; _i < _len; _i++) {
      event = events[_i];
      schedule[_name = event.dtstart] || (schedule[_name] = []);
      schedule[event.dtstart].push(event);
    }
    scheduleAsList = [];
    for (date in schedule) {
      events = schedule[date];
      scheduleSlot = {
        dtstart: events[0].dtstart
      };
      if (events.length > 1) {
        scheduleSlot.conflict = true;
        scheduleSlot.events = events;
      } else {
        scheduleSlot.event = events[0];
      }
      scheduleAsList.push(scheduleSlot);
    }
    return scheduleAsList.sort(function(a, b) {
      return new Date(a.dtstart) - new Date(b.dtstart);
    });
  };
}).call(this);
