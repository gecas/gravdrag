$('.dragMe').draggable({
    helper: 'clone',
    cursor: 'move',
});

$('#container').droppable({
   accept: '.dragMe',
   drop: handleDropEvent
});

$('.dragMe').on('dragover', function(){
  alert('dragover');
});

function handleDropEvent (event, ui) {
    var draggable = ui.draggable;
    var target = $(event.target).find(".items");
    var widgetdata = {};
    var element = $('<div/>')
            .addClass('item')
            .data({'widgetname': 'Heading', 'widgetdata': '', 'elementType': draggable.data("type")});
    //uniq_id
    var id = new Date().getTime().toString(16);

    switch(draggable.data("type")){
      case "heading":
          $("<h3/>")
            .addClass('heading-text first-click')
            .attr('contenteditable', 'true')
            .text('...')
            .appendTo(element).on('click', function(){
                $(this).text('').removeClass('first-click');
            });
        break;
      case "br":
          $("<br/>")
            .appendTo(element);
        break;
      case "hr":
          $("<hr/>")
            .appendTo(element);
        break;
      case "textfield":
          $("<div/>")
          .addClass('textfield')
          .attr({
            'id': id
          })
          .text('...')
          .appendTo(element);

      break;
      case "video":

          var block =  '<div class="modal fade" tabindex="-1" role="dialog">'+
                        '<div class="modal-dialog" role="document">'+
                          '<div class="modal-content">'+
                            '<div class="modal-header">'+
                              '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                              '<h4 class="modal-title">Pridėti video</h4>'+
                            '</div>'+
                            '<div class="modal-body">'+
                            
                            '<div>'+
                            '<ul class="nav nav-tabs" role="tablist">'+
                              '<li role="presentation" class="active"><a href="#url" aria-controls="url" role="tab" data-toggle="tab">URL</a></li>'+
                              '<li role="presentation"><a href="#upload" aria-controls="upload" role="tab" data-toggle="tab">Upload</a></li>'+
                            '</ul>'+

                            '<div class="tab-content">'+
                              '<div role="tabpanel" class="tab-pane active" id="url">'+
                                '<div class="form-group">'+
                                    '<label>URL :</label>'+
                                    '<input type="text" class="form-control video-url" name="video-url"/>'+
                                '</div>'+

                                '<div class="form-group">'+
                                    '<label>Ilgis :</label>'+
                                    '<input type="text" class="form-control video-width"/>'+
                                '</div>'+

                                '<div class="form-group">'+
                                    '<label>Aukštis :</label>'+
                                    '<input type="text" class="form-control video-height"/>'+
                                '</div>'+
                                '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
                                '<button type="button" class="btn video-save btn-primary">Save changes</button>'+
                              '</div>'+
                              
                              '<div role="tabpanel" class="tab-pane" id="upload">'+

                             '<div class="body-nest" id="DropZone">'+
                             '<form class="dropzone" id="awesome-dropzone" enctype="multipart/form-data">'+
                             '</form>'+
                             '<button style="margin-top: 10px;" class="btn btn-info"id="submit-all">'+
                             'Submit all files'+
                             '</button>'+
                          '</div>'+

                              '</div>'+
                            '</div>'+
                          '</div>'+
                                                          
                            '</div>'+
                            '<div class="modal-footer">'+
                              
                            '</div>'+
                          '</div>'+
                        '</div>'+
                      '</div>';

          var video = $("<div/>").addClass('video-wrap').append(block);
          video.appendTo(element);
        break;
     }

     addButtons(element);
     element.appendTo(target);

     if (draggable.data("type") == 'textfield') {
      initializeTinyMce(id);
     }

     if (draggable.data("type") == 'video') {
      $('.modal').first().modal('show'); 
      $('.modal').on('shown.bs.modal', function (e) {
        Dropzone.autoDiscover = false;
        //Simple Dropzonejs 
        $("#awesome-dropzone").dropzone({
            paramName: "file[]",
            maxFilesize: 100,
            url: '/upload/video',
            allowmultiple: true,
            addRemoveLinks: true,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(file, response) {
                alert('success');
            },
            error: function(file, response) {
                alert('error');
            }
        });
      });
      var wrap = $('.video-wrap');

        // Video by url
        $('.video-save').on('click', function(){
          var url = $('.video-url').val();

          var vid = $("<embed/>")
                .addClass('vid-frame')
                .attr('src', url)
                .attr('width', '1000px')
                .attr('height', '500px')
                .attr('target', '_parent')
                .attr('frameborder', '0')
                .attr('allowfullscreen', true)
                .appendTo(wrap);
        
          $('.modal').first().modal('hide'); 
          $('.video-url').val('');
        });

        // Video by embed
        $('.video-embed-btn').on('click', function(){
          var embed = $('.video-embed').val();
          $(this).parent('.modal').modal('hide'); 
          $('.modal-backdrop').hide(); 
          wrap.html(embed);
        });
     }
}

function replaceButtons(element){
  if (element.find('.buttons-wrap').length == 0) {
    
    var block = $('<div/>').addClass('buttons-wrap');
    switch(element.data('elementType')){
      case 'heading':
          block.append([
              $('<button/>')
                .addClass('btn heading')
                .data({'headingType': 'h1'})
                .text('H1'),
              $('<button/>')
                .addClass('btn heading')
                .data({'headingType': 'h2'})
                .text('H2'),
              $('<button/>')
                .addClass('btn heading')
                .data({'headingType': 'h3'})
                .text('H3'),
              $('<button/>')
                .addClass('btn heading')
                .data({'headingType': 'h4'})
                .text('H4'),
              $('<button/>')
                .addClass('btn heading')
                .data({'headingType': 'h5'})
                .text('H5'),
              $('<button/>')
                .addClass('btn heading')
                .data({'headingType': 'h6'})
                .text('H6'),
              $('<button/>').addClass('btn heading-options').data({'heading-type': 'options'}).text('Options'),
          ]);

        block.find('button.heading').on('click', function(event) {
            var element = $(this).parents('.item').find('.heading-text');
            var new_element = $('<'+$(this).data('headingType')+'/>').html(element.html());

            $.each(element.prop('attributes'), function() {
              new_element.attr(this.name, this.value);
            });
            element.replaceWith(new_element);
          });
      break;
    }
    block.append([
      $('<button/>').addClass('btn remove-btn')
        .html('<i class="fa fa-trash" aria-hidden="true"></i>').on('click', function(event) {
        $(this).parents('.item').remove();
      })
    ]).appendTo(element);
  }
}

function addButtons(element){
  if (typeof element != "undefined") {
    replaceButtons(element);
  }else{
    $.each($('.item'), function(index, el) {
      replaceButtons($(this));
    });
  }
}

function removeButtons(){
  $('.buttons-wrap').remove();
}

$('.heading-text').on('click', function(){
  $(this).text('');
});