describe("lange-ui", function() {  
    var makeEventsSelectable = LangeUI.makeEventsSelectable;
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
        it("should make all events selectable", function(){
            loadEventsFixture();

            makeEventsSelectable();

            expect($(".vevent>input.fancy-checkbox").length).toEqual(numEvents);
        });

        it("should mark event as selected when it is selected", function(){
            loadEventsFixture();
            makeEventsSelectable();

            $('.fancy-checkbox').first().click();

            expect($('.vevent').first()).toHaveClass('selected');
        });

        it("should unmark event as selected when it is unselected", function(){
            loadEventsFixture();
            makeEventsSelectable();
            $('.fancy-checkbox').first().click();
            $('.fancy-checkbox').first().click();

            expect($('.vevent').first()).not.toHaveClass('selected');
        });
        
        it("should call renderPlan when event is selected", function(){
            spyOn(LangeUI, 'renderPlan');

            makeEventsSelectable();
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
