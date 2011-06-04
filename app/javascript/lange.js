(function() {
  var root;
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.Lange = {};
  Lange.schedule = function(vevents) {
    var date, schedule, scheduleMap, scheduleSlot, vevent, _i, _len, _name;
    scheduleMap = {};
    for (_i = 0, _len = vevents.length; _i < _len; _i++) {
      vevent = vevents[_i];
      scheduleMap[_name = vevent.dtstart] || (scheduleMap[_name] = []);
      scheduleMap[vevent.dtstart].push(vevent);
    }
    schedule = [];
    for (date in scheduleMap) {
      vevents = scheduleMap[date];
      scheduleSlot = {
        dtstart: vevents[0].dtstart
      };
      if (vevents.length > 1) {
        scheduleSlot.conflict = true;
        scheduleSlot.vevents = vevents;
      } else {
        scheduleSlot.vevent = vevents[0];
      }
      schedule.push(scheduleSlot);
    }
    return schedule.sort(function(a, b) {
      return new Date(a.dtstart) - new Date(b.dtstart);
    });
  };
}).call(this);
