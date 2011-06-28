describe("lange-ui", function() {  
    it("should extract selected events from html", function() {
        myLoadFixture("selected_events.html");
        var expectedEvents =  [
            { id : 0, summary : 'See Jellyfish Play Guitar', dtstart : '2011-07-21T13:00', dateDescription : '1pm, July 21' }
        ];

        expect(extractSelectedEvents()).toEqual(expectedEvents);
    });

    it("should add checkboxes to event", function(){
        myLoadFixture("selected_events.html");

        addCheckBoxesToEvents();

        var checkboxes = $(".vevent>input.fancy-checkbox");
        expect(checkboxes.length).toEqual($(".vevent").length);
    });

    xit("addCheckBoxesToEvents should add callback to renderPlan on change", function(){
      addCheckBoxesToEvents.prototype.renderPlan = function(){
        alert("test");
      };
      addCheckBoxesToEvents();
      $('.fancy-checkbox').click();
    });
});
