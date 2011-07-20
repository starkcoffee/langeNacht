$.template("defaultPlanTemplate", "Your plan:<br>                                       \
        <ul>                                                                            \
          {{each eventSlots}}                                                           \
              <li>${vevent.dtstart} - ${vevent.summary}</li>                    \
          {{/each}}                                                                     \
        <ul/>" );

LangeUI = {

  makeEventsSelectable: function() {
     $('.vevent').append("<input class='fancy-checkbox' type='checkbox'/>");
     $('.fancy-checkbox').change(function(x){
         $(this).parent().toggleClass("selected");
         LangeUI.renderPlan();
     });
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

  renderPlan: function(){
    if($('#plan').length == 0){
        throw "expect a div called 'plan' to exist";
    }
    $('#plan').empty();
    $.tmpl('defaultPlanTemplate',{eventSlots: Lange.schedule(LangeUI.extractSelectedEvents())})
        .appendTo( "#plan" );
    $('.conflict').click(function(){
       // find event with the id and click the checkbox
        var id = $(this).attr('eventId');
        $($('.vevent')[id]).find('.fancy-checkbox').click();
        $(this).remove(); 
    });
  }
}
