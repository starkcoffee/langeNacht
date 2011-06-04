root = exports ? this
root.Lange = {}

Lange.schedule = (events) ->
    events.sort (a, b) -> new Date(a.dtstart) - new Date(b.dtstart)
    
    