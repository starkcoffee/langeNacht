var event1 = {summary: "one", dtstart: "2011-01-30T17:00"};
var event2 = {summary: "two", dtstart: "2011-01-30T20:00"};
var eventWhichConflictsWithEvent2 = {summary: "three", dtstart: "2011-01-30T20:00"};

function conflict(events){
    return {conflict: true, events: events}
};

function scheduleWith(eventSpecs){
    return eventSpecs.map(function(eventSpec){
        var slot = {};
        if (eventSpec.conflict){
           slot.conflict = true;
           slot.dtstart = eventSpec.events[0].dtstart;
           slot.events = eventSpec.events; 
        }
        else {
         slot.dtstart = eventSpec.dtstart;    
         slot.event = eventSpec;
        };
        return slot;
    });
}

describe("test helper code", function(){
    it("should generate the correct expected representation", function(){
        expect(scheduleWith([event1, conflict([event2, eventWhichConflictsWithEvent2])])).toEqual([
            {dtstart: event1.dtstart, event: event1},
            {dtstart: event2.dtstart, conflict: true, events: [event2, eventWhichConflictsWithEvent2]},
            ]);
    });
});

describe("the scheduler", function() {    
    it("should order events by time", function() {
        var schedule = Lange.schedule([event2, event1]);
        expect(schedule).toEqual(scheduleWith([event1, event2]));
    });
    
    it("should handle events with no time", function() {
        var eventWithNoDate = {summary: "foo"};
        var schedule = Lange.schedule([event1, eventWithNoDate]);
        expect(schedule).toEqual(scheduleWith([event1, eventWithNoDate]));
    });
    
    it("should recognise conflicts and return them in the result", function(){
        var schedule = Lange.schedule([event1, event2, eventWhichConflictsWithEvent2]);
        expect(schedule).toEqual(scheduleWith([event1, conflict([event2, eventWhichConflictsWithEvent2])]));
    });
    
    it("should throw exception if not given an array of events", function(){
        
    });
    
});        