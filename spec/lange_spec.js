describe("the javascript", function(){
	it("should sort dates properly", function(){
		dates = ["2011-07-21T13:00", '2011-07-21T11:00']
		var sorted = dates.sort(function(a, b) {
	      return new Date(a) - new Date(b);
	    });
	    expect(sorted).toEqual([ '2011-07-21T11:00', "2011-07-21T13:00"]);
	});
	
});

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
      