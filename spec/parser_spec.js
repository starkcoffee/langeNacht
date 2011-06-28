describe("lange-ui", function() {  
    it("should extract selected events from html", function() {
        myLoadFixture("selected_events.html");
        var expectedEvents =  [
            { id : 0, summary : 'See Jellyfish Play Guitar', dtstart : '2011-07-21T13:00', dateDescription : '1pm, July 21' }
        ];

        expect(extractSelectedEvents()).toEqual(expectedEvents);
    });

    xit("should add checkboxes to event", function(){
        myLoadFixture("selected_events.html");

        addCheckBoxesToEvents();
        var checkboxes = $(".vevent").filter("input");
        expect(checkboxes.length).toEqual($(".vevent").length);
        
    });
});
