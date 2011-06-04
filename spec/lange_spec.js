describe("the scheduler", function() {
    
    var event1 = {summary: "one", dtstart: "2011-01-30T17:00"};
    var event2 = {summary: "two", dtstart: "2011-01-30T20:00"};
    
    it("should order events by time", function() {
        expect(Lange.schedule([event2, event1])).toEqual([event1, event2]);
    });
    
    it("should handle events with no time", function() {
        var eventWithNoDate = {summary: "foo"};
        expect(Lange.schedule([event1, eventWithNoDate])).toEqual([event1, eventWithNoDate]);
    });
    
    it("should throw exception if not given an array of events", function(){
        
    });
    
});        