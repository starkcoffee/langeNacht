root = exports ? this
root.Lange = {}

Lange.schedule = (vevents) ->
    
    # group vevents by start time
    scheduleMap = {}
    for vevent in vevents
        scheduleMap[vevent.dtstart] or= []
        scheduleMap[vevent.dtstart].push vevent
    
    schedule = []
    for date, vevents of scheduleMap
        scheduleSlot = {dtstart:  vevents[0].dtstart }
        
        if vevents.length > 1
            scheduleSlot.conflict = true
            scheduleSlot.vevents = vevents
        else
            scheduleSlot.vevent = vevents[0]
                
        schedule.push(scheduleSlot)
        
    schedule.sort (a,b) -> new Date(a.dtstart) - new Date(b.dtstart)
            
    
    
    
    
    