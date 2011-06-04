root = exports ? this
root.Lange = {}

Lange.schedule = (events) ->
    #events.sort (a, b) -> new Date(a.dtstart) - new Date(b.dtstart)
    
    # group events by start time
    schedule = {}
    for event in events
        schedule[event.dtstart] or= []
        schedule[event.dtstart].push event
    
    scheduleAsList = []
    for date, events of schedule
        scheduleSlot = {dtstart:  events[0].dtstart }
        
        if events.length > 1
            scheduleSlot.conflict = true
            scheduleSlot.events = events
        else
            scheduleSlot.event = events[0]
                
        scheduleAsList.push(scheduleSlot)
        
    scheduleAsList.sort (a,b) -> new Date(a.dtstart) - new Date(b.dtstart)
            
    
    
    
    
    