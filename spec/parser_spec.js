describe("parsing stuff", function() {    
    
	it("should èxtract events from hmtl", function() {
		//         var fix=jasmine.getFixtures().read('example-schedule.html');
		//         expect(fix.indexOf('"boo"') > 0).toBeTruthy();
		// jasmine.getFixtures().set("<p id='boo'>Hola</p>");
		loadFixtures("example-schedule.html");
		var events =  [
		{ id : 0, summary : 'See Jellyfish Play Guitar', dtstart : '2011-07-21T13:00', dateDescription : '1pm, July 21' }
		];
        
		expect($('#jasmine-fixtures')).toExist();
		expect($('#boo')).toExist();
		var actualEvents = extractSelectedEvents();
		// expect(typeof(events)).toBe("array");
		// expect(typeof(actualEvents)).toBe("events");
		// 
		expect(actualEvents).toEqual(events);
    });
});
