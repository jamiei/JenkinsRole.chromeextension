
// Copyright (c) 2012, Jamie I
// All rights reserved.
// Licensed under the BSD-3 license.

// Tooltip code conveniently borrowed from http://sixrevisions.com/tutorials/javascript_tutorial/create_lightweight_javascript_tooltip/
var tooltip=function(){
 var id = 'tt';
 var top = 3;
 var left = 3;
 var maxw = 300;
 var speed = 10;
 var timer = 20;
 var endalpha = 95;
 var alpha = 0;
 var tt,t,c,b,h;
 var ie = document.all ? true : false;
 return{
  show:function(v,w){
   if(tt == null){
    tt = document.createElement('div');
    tt.setAttribute('id',id);
    t = document.createElement('div');
    t.setAttribute('id',id + 'top');
    c = document.createElement('div');
    c.setAttribute('id',id + 'cont');
    b = document.createElement('div');
    b.setAttribute('id',id + 'bot');
    tt.appendChild(t);
    tt.appendChild(c);
    tt.appendChild(b);
    document.body.appendChild(tt);
    tt.style.opacity = 0;
    tt.style.filter = 'alpha(opacity=0)';
    document.onmousemove = this.pos;
   }
   tt.style.display = 'block';
   c.innerHTML = v;
   tt.style.width = w ? w + 'px' : 'auto';
   if(!w && ie){
    t.style.display = 'none';
    b.style.display = 'none';
    tt.style.width = tt.offsetWidth;
    t.style.display = 'block';
    b.style.display = 'block';
   }
  if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
  h = parseInt(tt.offsetHeight) + top;
  clearInterval(tt.timer);
  tt.timer = setInterval(function(){tooltip.fade(1)},timer);
  },
  pos:function(e){
   var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
   var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
   tt.style.top = (u - h) + 'px';
   tt.style.left = (l + left) + 'px';
  },
  fade:function(d){
   var a = alpha;
   if((a != endalpha && d == 1) || (a != 0 && d == -1)){
    var i = speed;
   if(endalpha - a < speed && d == 1){
    i = endalpha - a;
   }else if(alpha < speed && d == -1){
     i = a;
   }
   alpha = a + (i * d);
   tt.style.opacity = alpha * .01;
   tt.style.filter = 'alpha(opacity=' + alpha + ')';
  }else{
    clearInterval(tt.timer);
     if(d == -1){tt.style.display = 'none'}
  }
 },
 hide:function(){
  clearInterval(tt.timer);
   tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
  }
 };
}();


// This is the event which is called when you mo
function onMouseOverRole(e)
{
	if (e.target.nodeName == 'TD') {
		tooltip.show('Name: ' + getGetUserGroupName(e) + '<br />Role: ' + getGetRoleName(e) + '<br />Enabled: ' + getEnabledTextBoxesForTR(e), 200);

	}

	return true;
}

// This is the event which is called when you mo
function onMouseOutOfRole()
{
	tooltip.hide();

	return true;
}



// Returns the Role name from the header (conveniently duplicated on the element)
function getGetRoleName(elemTR)
{
	return elemTR.target.firstChild.name;
}

// Returns the User group (row title)
function getGetUserGroupName(elemTR)
{
	return elemTR.target.parentNode.textContent;
}

// Iterate through all of the check boxes in a row and work return the names of the checked ones.
function getEnabledTextBoxesForTR(elemTR)
{
	result = '';
	child_td = elemTR.target.parentNode.childNodes;
	for (var key in child_td) {
		if (child_td[key].childElementCount > 0)  {
			if ((child_td[key].firstChild.nodeName == 'INPUT') && (child_td[key].firstChild.checked)) {
				result = result + ' ' + child_td[key].firstChild.name + ' -';
			}
		}
	}
	return result;
}


// This is suggested by Apple for Safari extensions
if(window.top === window) {
	// This is the entry/initialisation point for the code.
	(function() {

		// First check to even see if we are needed or not
		// If the table isn't present then we're not required.
		var roles_table = document.getElementById('projectRoles');
		if(!roles_table) {
			console.log("No roles table found on this page!");
			return;
		}

		// Find the Permissions rows and assign the mouseover event
		var roles_rows = document.getElementsByClassName("permission-row");
		for (i=0; (roles_rows.length - 1); i++) {
			roles_rows[i].onmouseover = onMouseOverRole;
			roles_rows[i].onmouseout = onMouseOutOfRole;
		}
	})();
}