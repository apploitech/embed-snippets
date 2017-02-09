/*Javascript to fire on all pages*/

//social widget display
function add_active_class(target){
    var activeClassName = "social-active";
    var toggleClass = $(".social-toggle");
    //if the tab isn't already active, remove the active class from the other tabs and add it to the one being clicked
    if( !target.hasClass(activeClassName) ){
        toggleClass.removeClass(activeClassName);
        target.addClass(activeClassName);   
    }
}

$("#instagram").click(function(){
    $('.social-data').hide();
    $('#instagram-content').show();
    add_active_class($(this));
});
$("#facebook").click(function(){
    $('.social-data').hide();
    $('#facebook-content').show();
    add_active_class($(this));
});
$("#spotify").click(function(){
    $('.social-data').hide();
    $('#spotify-content').show();
    add_active_class($(this));
});
//end social widget

//scroll to top button
var topScrollClass = $(".top-scroll");

topScrollClass.click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
});
//end scroll to top button

//
//
/////star rating system (front end)
//if($("#recipe-star-rating ul.rating").data("rating")){
//
//    $("#recipe-star-rating .rating-star").slice(0, $("#recipe-star-rating ul.rating").data("rating"))
//            .removeClass("fa-star-o")
//            .addClass("fa-star");
//
//}
//
//$("#recipe-star-rating .rating-star").on("mouseover", function(){
//
//    $("#recipe-star-rating .rating-star")
//            .removeClass("fa-star")
//            .addClass("fa-star-o");
//
//    // Zero index based
//    var i = $(this).parents("ul.rating").children("li").index($(this).parent());
//
//    $("#recipe-star-rating .rating-star").slice(0, (i + 1))
//            .removeClass("fa-star-o")
//            .addClass("fa-star");
//
//}).on("mouseout", function(){
//
//    $("#recipe-star-rating .rating-star")
//            .removeClass("fa-star")
//            .addClass("fa-star-o");
//
//    if($("#recipe-star-rating ul.rating").data("rating")){
//
//            $("#recipe-star-rating .rating-star").slice(0, $("#recipe-star-rating ul.rating").data("rating"))
//                    .removeClass("fa-star-o")
//                    .addClass("fa-star");
//
//    }
//
//}).on("click", function(evt){
//
//						$.post(
//							ajaxVars.ajaxurl,
//							{
//								"action": "submit_recipe_rating",
//								"data": $.param({
//									"post-id": $(this).parents("ul.rating").data("post-id"),
//									"rating": $(this).data("rating-value")
//								})
//							},
//							function(data){
//
//								if((typeof data.rating !== 'undefined') && (data.rating > 0)){
//
//									$("#recipe-star-rating .rating-star").slice(0, data.rating)
//										.removeClass("fa-star-o")
//										.addClass("fa-star");
//
//								}
//
//								if((typeof data.num_ratings !== 'undefined') && (data.num_ratings > 0)){
//									console.log("HEY");
//									$("#recipe-star-rating .num-ratings").text("(" + data.num_ratings + ")");
//
//								}
//
//							}
//						);
//
//					});