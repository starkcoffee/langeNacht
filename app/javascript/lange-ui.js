function bunda(){
  return "bunda";
};

$.template("defaultPlanTemplate", "Your plan:<br>                                       \
        <ul>                                                                            \
          {{each eventSlots}}   \
              <li>conflict is: ${bunda}</li>                                              \
            {{if bunda }}                                                         \
              <li>${dtstart} - Damn! You have a conflict!!                              \
                <ul>                                                                    \
                  {{each(index,value) vevents}}                                         \
                  <li class='conflict'>${value.summary}</li>                           \
                  {{/each}}                                                             \
                </ul>                                                                   \
              </li>                                                                     \
            {{else}}                                                                    \
              <li>${dtstart} - ${vevent.summary}</li>                                   \
            {{/if}}                                                                     \
          {{/each}}                                                                     \
        <ul/>");

LangeUI = {


  updatePlan: function(){
      LangeUI.renderPlan(Lange.schedule(LangeUI.extractSelectedEvents()));
      makeConflictedEventsSelectable();
  },

  makeEventsSelectable: function() {
     $('.vevent').append("<input class='fancy-checkbox' type='checkbox'/>");
     $('.fancy-checkbox').change(function(x){
         $(this).parent().toggleClass("selected");
         LangeUI.updatePlan();
     });
  },

  makeConflictedEventsSelectable: function() {
     $('.conflict').click(function(x){
        LangeUI.resolveConflict($(this).attr("eventId"));
    });
  },

  resolveConflict: function(chosen_event_id){

  },
  
  extractSelectedEvents: function(){
     return $(".vevent").filter(".selected").map(function(index){
        return {
           id: index,
           summary: $(this).find(".summary").html(),
           dtstart: $(this).find(".dtstart").attr('title'),
           dateDescription: $(this).find(".dtstart").html()
        };
     }).toArray();
  },

  renderPlan: function(schedule){
    if($('#plan').length == 0){
        throw "expect a div called 'plan' to exist";
    }
    $('#plan').empty();
    $.tmpl('defaultPlanTemplate',{eventSlots: schedule})
        .appendTo( "#plan" );

  }
};
