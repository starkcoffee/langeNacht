describe("lange-ui", function() {  
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

    // Ken's homework
    xit("addCheckBoxesToEvents should add callback to renderPlan on change", function(){
      addCheckBoxesToEvents.prototype.renderPlan = function(){
        expect(0).toEqual(1);
      };
      addCheckBoxesToEvents();
      $('.fancy-checkbox').click();
    });

    it("should renderPlan when event is selected", function(){
        spyOn(window, 'renderPlan');

        addCheckBoxesToEvents();
        $('.fancy-checkbox').eq(1).click();

        expect(extractSelectedEvents().length).toEqual(2);

        expect(window.renderPlan).toHaveBeenCalled();
    });
});
