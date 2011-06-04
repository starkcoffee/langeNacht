root = exports ? this
root.Lange = {}

Lange.schedule = (events) ->
    
    # group events by start time
    scheduleMap = {}
    for event in events
        scheduleMap[event.dtstart] or= []
        scheduleMap[event.dtstart].push event
    
    schedule = []
    for date, events of scheduleMap
        scheduleSlot = {dtstart:  events[0].dtstart }
        
        if events.length > 1
            scheduleSlot.conflict = true
            scheduleSlot.events = events
        else
            scheduleSlot.event = events[0]
                
        schedule.push(scheduleSlot)
        
    schedule.sort (a,b) -> new Date(a.dtstart) - new Date(b.dtstart)
            
    
    
    
    
    