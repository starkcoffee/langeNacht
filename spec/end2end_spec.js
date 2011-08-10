describe("lange-ui", function() {
   it("should work end to end", function(){
       loadEventsFixture();
       LangeUI.makeEventsSelectable();
       selectEvent(1);
       expect($('#plan').html()).toContain("2011-07-21T13:00 - See Jellyfish Play Piano");
       expect($('#plan').html()).not.toContain("conflict")
       selectEvent(2);
       expect($('#plan').html()).toContain("conflict");
   });
});