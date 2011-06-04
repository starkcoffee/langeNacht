describe("the scheduler", function() {
    
    var event1 = {summary: "one", dtstart: "2011-01-30T17:00"};
    var event2 = {summary: "two", dtstart: "2011-01-30T20:00"};
    
    
    it("should order events by time", function() {
        var schedule = Lange.schedule([event2, event1]);
        expect(schedule).toEqual([
            {dtstart: event1.dtstart, event: event1}, 
            {dtstart: event2.dtstart, event: event2}, 
            ]);
    });
    
    it("should handle events with no time", function() {
        var eventWithNoDate = {summary: "foo"};
        var schedule = Lange.schedule([event1, eventWithNoDate]);
        expect(schedule).toEqual([
            {dtstart: event1.dtstart, event: event1}, 
            {dtstart: eventWithNoDate.dtstart, event: eventWithNoDate},
            ]);
    });
    
    it("should recognise conflicts and return them in the result", function(){
        var eventWhichConflictsWithEvent2 = {summary: "three", dtstart: "2011-01-30T20:00"};
        var schedule = Lange.schedule([event1, event2, eventWhichConflictsWithEvent2]);
        expect(schedule).toEqual([
            {dtstart: event1.dtstart, event: event1}, 
            {dtstart: event2.dtstart, conflict: true, events: [event2, eventWhichConflictsWithEvent2]}
            ]);
        
    });
    
    it("should throw exception if not given an array of events", function(){
        
    });
    
});        