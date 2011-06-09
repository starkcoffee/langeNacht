var event1 = {summary: "one", dtstart: "2011-01-30T17:00"};
var event2 = {summary: "two", dtstart: "2011-01-30T20:00"};
var eventWhichConflictsWithEvent2 = {summary: "three", dtstart: "2011-01-30T20:00"};
var multiTimeEventConflictingWithEvent2 = {summary: "three", dtstart: "2011-01-30T20:00"};

function args(arguments){
    var args =[];
    for (var i=0; i< arguments.length; i++){
        args.push(arguments[i]);
    }
    return args;
}

function conflict(){
    return {conflict: true, events: args(arguments)};
};

function expectedSchedule(){
    return args(arguments).map(function(eventSpec){
        var slot = {};
        if (eventSpec.conflict){
           slot.conflict = true;
           slot.dtstart = eventSpec.events[0].dtstart;
           slot.vevents = eventSpec.events; 
        }
        else {
         slot.dtstart = eventSpec.dtstart;    
         slot.vevent = eventSpec;
        };
        return slot;
    });
}


describe("test helper code", function(){
    
    it("conflict func should handle varags ", function(){
        expect(conflict(event1, event2)).toEqual({conflict: true, events: [event1, event2]});
    });
    
    it("should generate the correct expected representation", function(){
        expect(expectedSchedule(event1, conflict(event2, eventWhichConflictsWithEvent2))).toEqual([
            {dtstart: event1.dtstart, vevent: event1},
            {dtstart: event2.dtstart, conflict: true, vevents: [event2, eventWhichConflictsWithEvent2]},
            ]);
    });
});