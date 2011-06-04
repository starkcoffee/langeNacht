describe("the scheduler", function() {
    
    it("should dates", function(){
        var d1 = new Date("2011-01-30T17:00");
        var d2 = new Date("2011-01-30T20:00");
        expect(d1).toBeLessThan(d2);
    });
    
    it("should order events by time", function() {
        var event1 = {title: "one", dtstart: "2011-01-30T17:00"};
        var event2 = {title: "two", dtstart: "2011-01-30T20:00"};
        
        expect(Lange.schedule([event2, event1])).toEqual([event1, event2]);
    });
    
    it("should throw exception if not given an array of events", function(){
        
    });
    
});        