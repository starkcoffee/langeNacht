describe("lange-ui", function() {  
    var addCheckBoxesToEvents = LangeUI.addCheckBoxesToEvents;
    var renderPlan = LangeUI.renderPlan;
    var extractSelectedEvents = LangeUI.extractSelectedEvents;
    var numEvents;
    

    beforeEach(function(){
        myLoadFixture("selected_events.html");
    });
    
    function loadEventsFixture(){
        myLoadFixture("events.html");
        numEvents = $(".vevent").length;
        expect(numEvents).toBeGreaterThan(0);
        expect($(".vevent>input.fancy-checkbox").length).toEqual(0);
    };
    
    it("should add checkboxes to all events", function(){
        loadEventsFixture();
        
        addCheckBoxesToEvents();

        expect($(".vevent>input.fancy-checkbox").length).toEqual(numEvents);
    });

    it("should extract selected events from html", function() {
        var expectedEvents =  [
            { id : 0, summary : 'See Jellyfish Play Guitar', dtstart : '2011-07-21T13:00', dateDescription : '1pm, July 21' }
        ];

        expect(extractSelectedEvents()).toEqual(expectedEvents);
    });



    it("should renderPlan when event is selected", function(){
        spyOn(LangeUI, 'renderPlan');

        addCheckBoxesToEvents();
        $('.vevent:not(.selected) .fancy-checkbox').click();

        expect(LangeUI.renderPlan).toHaveBeenCalled();
    });

    it("should toggle selected events", function(){
        spyOn(LangeUI, 'renderPlan');

        addCheckBoxesToEvents();
        $('.vevent.selected .fancy-checkbox').click();
        $('.vevent:not(.selected) .fancy-checkbox').click();

        expect(extractSelectedEvents().length).toEqual($(".vevent").length);
    });
});
