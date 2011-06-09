
describe("the scheduler", function() {    
    it("should order events by time", function() {
        var schedule = Lange.schedule([event2, event1]);
        expect(schedule).toEqual(expectedSchedule(event1, event2));
    });
    
    it("should handle events with no time", function() {
        var eventWithNoDate = {summary: "foo"};
        var schedule = Lange.schedule([event1, eventWithNoDate]);
        expect(schedule).toEqual(expectedSchedule(event1, eventWithNoDate));
    });
    
    it("should recognise conflicts and return them in the result", function(){
        var schedule = Lange.schedule([event1, event2, eventWhichConflictsWithEvent2]);
        expect(schedule).toEqual(expectedSchedule(event1, conflict(event2, eventWhichConflictsWithEvent2)));
    });
    
    
    
    xit("should throw exception if not given an array of events", function(){
        
    });
    
});  
      