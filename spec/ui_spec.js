describe("lange-ui", function() {  
    var addCheckBoxesToEvents = LangeUI.addCheckBoxesToEvents;
    var renderPlan = LangeUI.renderPlan;
    var extractSelectedEvents = LangeUI.extractSelectedEvents;

    beforeEach(function(){
        myLoadFixture("selected_events.html");
    });

    it("should extract selected events from html", function() {
        var expectedEvents =  [
            { id : 0, summary : 'See Jellyfish Play Guitar', dtstart : '2011-07-21T13:00', dateDescription : '1pm, July 21' }
        ];

        expect(extractSelectedEvents()).toEqual(expectedEvents);
    });

    it("should add checkboxes to event", function(){
        addCheckBoxesToEvents();

        var checkboxes = $(".vevent>input.fancy-checkbox");
        expect(checkboxes.length).toEqual($(".vevent").length);
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
