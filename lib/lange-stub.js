
Lange.schedule = function(events){
return [
     { dtstart: "2011-07-01",
       vevent: {summary: "moo1", dtstart: "2011-07-21T13:00", dateDescription: "1pm 21 July"}
     },
     { dstart: "2011-07-01",
       conflict: true, 
       vevents: [
        {summary: "moo2", dtstart: "2011-07-21T15:00", dateDescription: "3pm 21 July"},
        {summary: "moo3", dtstart: "2011-07-21T15:00", dateDescription: "3pm 21 July"}
        ]
    }
];
}
