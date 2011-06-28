function extractSelectedEvents(){
   return $(".vevent").filter(".selected").map(function(index){
      return {
         id: index,
         summary: $(this).find(".summary").html(),
         dtstart: $(this).find(".dtstart").attr('title'),
         dateDescription: $(this).find(".dtstart").html()
      };
   }).toArray();
};

function addCheckBoxesToEvents() {
   $('.vevent').append("<input class='fancy-checkbox' type='checkbox'/>");
   $('.fancy-checkbox').change(function(x){
       $(this).parent().toggleClass("selected");
       LangeUI.renderPlan();
   });
}

LangeUI = {
  renderPlan: function(){
    $('#plan').empty();
    $('#planTemplate').tmpl({eventSlots: Lange.schedule(extractSelectedEvents())})
        .appendTo( "#plan" );
    $('.conflict').click(function(){
       // find event with the id and click the checkbox
        var id = $(this).attr('eventId');
        $($('.vevent')[id]).find('.fancy-checkbox').click();
        $(this).remove(); 
    });
  }
}
