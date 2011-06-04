(function() {
  var root;
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.Lange = {};
  Lange.schedule = function(events) {
    var date, event, schedule, scheduleMap, scheduleSlot, _i, _len, _name;
    scheduleMap = {};
    for (_i = 0, _len = events.length; _i < _len; _i++) {
      event = events[_i];
      scheduleMap[_name = event.dtstart] || (scheduleMap[_name] = []);
      scheduleMap[event.dtstart].push(event);
    }
    schedule = [];
    for (date in scheduleMap) {
      events = scheduleMap[date];
      scheduleSlot = {
        dtstart: events[0].dtstart
      };
      if (events.length > 1) {
        scheduleSlot.conflict = true;
        scheduleSlot.events = events;
      } else {
        scheduleSlot.event = events[0];
      }
      schedule.push(scheduleSlot);
    }
    return schedule.sort(function(a, b) {
      return new Date(a.dtstart) - new Date(b.dtstart);
    });
  };
}).call(this);
