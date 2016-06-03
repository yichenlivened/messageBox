$(document).ready(function(){

function getMessages(){
	var box = $('#box-messages');
  var btnMessages = $('#btn-messages');
	var max_show = 5;
    $.ajax({ // ajax call starts
      url: 'messages.json', // JQuery loads serverside.php
      dataType: 'json', // Choosing a JSON datatype
  })
    .done(function(data) { // Variable data
    	box.html(''); // Clear box
    	if(data.success){
    		console.log(data);
        if(data.was_unread){
          btnMessages.append('<p class="dot-sm dot-topRight"></p>');
        }
    		for (var i = 0; i<5; i++) {
            if(data.messages[i].unread){
              box.append('<li><a href="#" class="message unread"><p class="dot dot-topLeft"></p><p class="message-name">' + data.messages[i].name +'</p><p class="message-content">' + data.messages[i].message + '</p><p class="message-time">' + dataFormat(data.messages[i].created_at) + '</p></a></li>');
            } else{
              box.append('<li><a href="#" class="message"><p class="message-name">' + data.messages[i].name +'</p><p class="message-content">' + data.messages[i].message + '</p><p class="message-time">' + dataFormat(data.messages[i].created_at) +'</p></a></li>');
            }
        	}
        	if(data.message_count > max_show){
        	box.append('<li class="seeAll"><a href="#">See all messages</a></li>');
        	};
    	}
    })
};

function dataFormat(date){
  var date = moment(date, 'YYYY-MM-DD HH:mm:ss');
  var today = moment().format('YYYY-MM-DD');
  var yesterday = moment().subtract(1,'day').format('YYYY-MM-DD');
  if(moment(date).format('YYYY-MM-DD') === today){
      return moment(date).format('hh a') + ' • today';
  }
  if(moment(date).format('YYYY-MM-DD') === yesterday){
      return moment(date).format('hh a') + ' • yesterday';
  }
  return moment(date).format('hh a • MM-DD-YYYY');
}

getMessages();

});