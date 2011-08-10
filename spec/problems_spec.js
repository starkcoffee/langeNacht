describe("some weird things about jasmine", function() {
	it("should be obvious what the problem is", function() {
		expect(" bla").toEqual("   bla");
	});

});

describe("some weird things about jasmine-jquery", function() {
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

describe("some weird things about javascript", function() {
    it("should be able to add a onClick event to a div", function(){
       setFixtures("<div id=foo>la la la</div>");
       var clicked = false;
       $('#foo').click(function(x){
           clicked = true;
       });
       $('#foo').click();
       expect(clicked).toBeTruthy();
    });

});
