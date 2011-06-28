describe("some weird things", function() {    
	it("should be obvious what the problem is", function() {
		expect(" bla").toEqual("   bla");
	});
	
	it("should say when fixtures don't exist", function(){
		expect(function(){
			loadFixtures("surely-this-doesnt-exist.html");
		}).toThrow();
		
	});
});
