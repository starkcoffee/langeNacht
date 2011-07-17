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
    
    describe("makeEventsSelectable", function(){
        it("should add checkboxes to all events to make the selectable", function(){
            loadEventsFixture();

            addCheckBoxesToEvents();

            expect($(".vevent>input.fancy-checkbox").length).toEqual(numEvents);
        });

        it("should add class 'selected' to an event when it is selected", function(){
            loadEventsFixture();
            addCheckBoxesToEvents();

            $('.fancy-checkbox').first().click();

            expect($('.vevent').first()).toHaveClass('selected');
        });

        it("should remove class 'selected' from an event when it is unselected", function(){
            loadEventsFixture();
            addCheckBoxesToEvents();
            $('.fancy-checkbox').first().click();
            $('.fancy-checkbox').first().click();

            expect($('.vevent').first()).not.toHaveClass('selected');
        });
        
        it("should call renderPlan when event is selected", function(){
            spyOn(LangeUI, 'renderPlan');

            addCheckBoxesToEvents();
            $('.vevent:not(.selected) .fancy-checkbox').click();

            expect(LangeUI.renderPlan).toHaveBeenCalled();
        });
    });
    
    
    describe("extractSelectedEvents", function(){
        it("should extract selected events from html", function() {
            var expectedEvents =  [
                { id : 0, summary : 'See Jellyfish Play Guitar', dtstart : '2011-07-21T13:00', dateDescription : '1pm, July 21' }
            ];

            expect(extractSelectedEvents()).toEqual(expectedEvents);
        });
        
    });
            







});
