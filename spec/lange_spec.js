describe("the scheduler", function() {
    it("should return events that it is given", function() {
        var event = {
            title: "Do Carbs Make You Fat?"
        };
        expect(Lange.schedule([event])).toEqual([event]);
    });
    
});        