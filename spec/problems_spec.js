describe("some weird things", function() {    
	it("should be obvious what the problem is", function() {
		expect(" bla").toEqual("   bla");
	});
	
	it("should say when fixtures don't exist", function(){
		expect(function(){
			loadFixtures("surely-this-doesnt-exist.html");
		}).toThrow();
		
	});

    it("should be able to set multiple html fixtures inline", function(){
        jasmine.getFixtures().set("<div id=fixture_1></div>");
        jasmine.getFixtures().set("<div id=fixture_2></div>");
        expect($("fixture_2")).toExist();
    });
});
