/* truefit clicks */
try{
  $(document).ready(function() {
    $('.tfc-fitrec-product').on('click',function(event) { 
      s.track({'events':'event54','eVar54':'truefit|'+this.id},'tl_o','truefit clicks');  
    });
  });
} catch(e) { console.log(e); }
