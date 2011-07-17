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

            $('.fancy-checkbox').first().click();

            expect($('.vevent').first()).toHaveClass('selected');
        });

        it("should unmark event as selected when it is unselected", function(){
            makeEventsSelectable();
            $('.fancy-checkbox').first().click();
            $('.fancy-checkbox').first().click();

            expect($('.vevent').first()).not.toHaveClass('selected');
        });
        
        it("should call renderPlan when event is selected", function(){
            makeEventsSelectable();
            spyOn(LangeUI, 'renderPlan');

            $('.fancy-checkbox').first().click();

            expect(LangeUI.renderPlan).toHaveBeenCalled();
        });
    });
    
    
    describe("extractSelectedEvents", function(){
        
        beforeEach(function(){
            loadEventsFixture();
            makeEventsSelectable();
        });
        
        it("should extract a selected event including its details", function() {    
            $('.fancy-checkbox').eq(0).click();                 

            expect(extractSelectedEvents()).toEqual(
                [
                    { id : 0, 
                      summary : 'See Jellyfish Play Guitar', 
                      dtstart : '2011-07-21T13:00', 
                      dateDescription : '1pm, July 21' 
                    }
                ]
            );
        });
        
        it("should extract multiple selected events", function() {   
            $('.fancy-checkbox').eq(0).click();                 
            $('.fancy-checkbox').eq(1).click();                  
            
            expect(extractSelectedEvents().length).toEqual(2);
        });
        
        it("should not include unselected events", function() { 
            $('.fancy-checkbox').eq(0).click();
            expect($('.vevent:not(.selected)').length).not.toEqual(0); 
            
            expect(extractSelectedEvents().length).toEqual(1);
        });  
        
        it("should return empty array when no events selected", function(){
            expect(extractSelectedEvents()).toEqual([]);
        });
        
        
    });
            
    describe("renderPlan", function(){
        
        beforeEach(function(){
            loadEventsFixture();
            makeEventsSelectable();
        });
        
        it("should complain if there is no div called 'plan'", function() {
            $('#plan').remove();
            
            expect(function(){ renderPlan(); }).toThrow("expect a div called 'plan' to exist");
        });         
    });




});
