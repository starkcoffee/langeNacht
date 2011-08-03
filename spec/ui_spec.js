describe("lange-ui", function() {
    var makeEventsSelectable = LangeUI.makeEventsSelectable;
    var updatePlan = LangeUI.updatePlan;
    var renderPlan = LangeUI.renderPlan;
    var extractSelectedEvents = LangeUI.extractSelectedEvents;




    describe("makeEventsSelectable", function(){
        var numEvents;
        beforeEach(function(){
            loadEventsFixture();
            numEvents = $(".vevent").length;
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

        it("should call updatePlan when event is selected", function(){
            makeEventsSelectable();
            spyOn(LangeUI, 'updatePlan');

            selectEvent(0);

            expect(LangeUI.updatePlan).toHaveBeenCalled();
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

            expect(function(){ renderPlan([]); }).toThrow("expect a div called 'plan' to exist");
        });


        it("should render the schedule", function() {
            jasmine.getFixtures().set("<div id=plan></div>");

            renderPlan(expectedSchedule(event1,event2));

            expect($('#plan').html()).toContain(event1.dtstart + " - " + event1.summary);
            expect($('#plan').html()).toContain(event2.dtstart + " - " + event2.summary);
        });

    });




});
