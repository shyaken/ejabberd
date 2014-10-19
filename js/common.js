var some_global = 0; 
var another_global = true;
function my_adder(x, y) {    
	return x + y; 
}

var TestNamespace = {
	some_var : 0,
	another_var : 0,
};

$(document).ready(function () {    
	$('#login_dialog').dialog({        
		autoOpen: true,        
		draggable: false,        
		modal: true,        
		title: 'Connect to XMPP',
		buttons: {            
			"Connect": function () {                
				$(document).trigger('connect', {                    
					jid: $('#jid').val(),                    
					password: $('#password').val()                
				});
                $('#password').val('');                
                $(this).dialog('close');            
            }        
        }    
    }); 
});

$(document).bind("connect", function (ev, data) {    
	var conn = new Strophe.Connection("http://unityappstudio.com:5280/http-bind");    
	conn.connect(data.jid, data.password, function (status) {
		console.log(status);
		console.log(conn);        
		if (status === Strophe.Status.CONNECTED) {            
			$(document).trigger("connected");        
		} else if (status === Strophe.Status.DISCONNECTED) {            
			$(document).trigger("disconnected");        
		}    
	}); 
});
$(document).bind("connected", function () {    // nothing here yet 
	console.log("connected");
});
$(document).bind("disconnected", function () {    // nothing here yet 
	console.log("disconnected");
});

var Hello = {    
	connection: null,
    log: function (msg) {        
    	$('#log').append("<p>" + msg + "</p>");    
    } 
}