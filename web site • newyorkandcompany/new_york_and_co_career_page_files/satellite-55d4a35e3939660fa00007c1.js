try{
  $(document).ready(function() {

    /* desktop */
      // Category Page Video Icon clicks
      $('body').on('click','div.video_palyicon_div',function(event){
        var videoName = $(this).prev('input.hdnProductVideoURL').val()||'no video name available';
        s.track({'events':'event75','eVar75':videoName},'tl_o','video plays');  
      });
      // PDP Video Icon clicks
      $('body').on('click','div.s7thumboverlay[type=video]',function(event){
        var videoName = $('[id^=hdnProductVideoPDPURL]').val()||'no video name available';
        s.track({'events':'event75','eVar75':videoName},'tl_o','video plays');  
      });

    /* mobile */
      // Category Video Icon clicks
      $('body').on('click','.MobileCPL_Video_play',function(event){
        var videoName = $(this).find('input.hdnProductVideoURL').val()||'no video name available';
        s.track({'events':'event75','eVar75':videoName},'tl_o','video plays');  
      });
      // PDP Video Icon clicks
      $('body').on('click','.video_PDPButton',function(event){
        var videoName = $('input.hdnProductVideoURL').val()||'no video name available';
        s.track({'events':'event75','eVar75':videoName},'tl_o','video plays');  
      });

  });
} catch(e) { console.log(e); }
