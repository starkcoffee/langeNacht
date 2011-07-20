describe("lange-ui", function() {
    var makeEventsSelectable = LangeUI.makeEventsSelectable;
    var renderPlan = LangeUI.renderPlan;
    var extractSelectedEvents = LangeUI.extractSelectedEvents;
    var numEvents;


    function loadEventsFixture(){
        myLoadFixture("events.html");
        numEvents = $(".vevent").length;
        expect(numEvents).toBeGreaterThan(0);
        expect($(".vevent>input.fancy-checkbox").length).toEqual(0);
    };

    function selectEvent(index){
        $('.fancy-checkbox').eq(index).click();
    };

    describe("makeEventsSelectable", function(){

        beforeEach(function(){
            loadEventsFixture();
        });

        it("should make all events selectable", function(){
            makeEventsSelectable();

            expect($(".vevent>input.fancy-checkbox").length).toEqual(numEvents);
        });

        it("should mark event as selected when it is selected", function(){
            makeEventsSelectable();

            selectEvent(0);

            expect($('.vevent').first()).toHaveClass('selected');
        });

        it("should unmark event as selected when it is unselected", function(){
            makeEventsSelectable();
            selectEvent(0);
            selectEvent(0);

            expect($('.vevent').first()).not.toHaveClass('selected');
        });

        it("should call renderPlan when event is selected", function(){
            makeEventsSelectable();
            spyOn(LangeUI, 'renderPlan');

            selectEvent(0);

            expect(LangeUI.renderPlan).toHaveBeenCalled();
        });
    });


    describe("extractSelectedEvents", function(){

        beforeEach(function(){
            loadEventsFixture();
            makeEventsSelectable();
        });

        it("should extract a selected event including its details", function() {
            selectEvent(0);

            expect(extractSelectedEvents()).toEqual([
                {   id : 0,
                    summary : 'See Jellyfish Play Guitar',
                    dtstart : '2011-07-21T13:00',
                    dateDescription : '1pm, July 21'
                 }
            ]);
        });

        it("should extract multiple selected events", function() {
            selectEvent(0);
            selectEvent(1);

            expect(extractSelectedEvents().length).toEqual(2);
        });

        it("should not include unselected events", function() {
            selectEvent(0);
            expect($('.vevent:not(.selected)').length).not.toEqual(0);

            expect(extractSelectedEvents().length).toEqual(1);
        });

        it("should return empty array when no events selected", function(){
            expect(extractSelectedEvents()).toEqual([]);
        });


    });

    describe("renderPlan", function(){

        it("should complain if there is no div called 'plan'", function() {
            expect($('#plan')).not.toExist();

            expect(function(){ renderPlan(); }).toThrow("expect a div called 'plan' to exist");
        });


        it("should render the schedule of selected events", function() {
            spyOn(LangeUI, 'extractSelectedEvents').andReturn("selected events");
            spyOn(Lange, 'schedule').andReturn(expectedSchedule(event1,event2));

            jasmine.getFixtures().set("<div id=plan></div>");

            renderPlan();

            expect($('#plan').html()).toContain(event1.dtstart + " - " + event1.summary);
            expect($('#plan').html()).toContain(event2.dtstart + " - " + event2.summary);

            expect(Lange.schedule).toHaveBeenCalledWith("selected events");
        });

    });




});
