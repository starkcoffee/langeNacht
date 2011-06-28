describe("parsing stuff", function() {  
    
    
    
	it("should extract events from html", function() {
	    myLoadFixture("example-schedule.html");
		var expectedEvents =  [
		{ id : 0, summary : 'See Jellyfish Play Guitar', dtstart : '2011-07-21T13:00', dateDescription : '1pm, July 21' }
		];
        
		
		var actualEvents = extractSelectedEvents();
		// expect(typeof(events)).toBe("array");
		// expect(typeof(actualEvents)).toBe("events");
		// 
		expect(actualEvents).toEqual(expectedEvents);
    });
});
