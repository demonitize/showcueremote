let updateShown = false;

$("body").on("keyup", (d) => {
    switch (d.keyCode) {
        case 32:
	        weHaveSumbitAtHome("go");
            break;
        case 27:
        	weHaveSumbitAtHome("stopall");
            break;
        case 19:
        	weHaveSumbitAtHome("pauseresume");
            break;
    }
})

document.getElementById("go").addEventListener('click', function (e) {
	weHaveSumbitAtHome("go");
});
document.getElementById("stopall").addEventListener('click', function (e) {
	weHaveSumbitAtHome("stopall");
});
document.getElementById("pauseresume").addEventListener('click', function (e) {
	weHaveSumbitAtHome("pauseresume");
});
document.getElementById("gotop").addEventListener('click', function (e) {
	weHaveSumbitAtHome("gotop");
});
document.getElementById("goback").addEventListener('click', function (e) {
	weHaveSumbitAtHome("goback");
});
document.getElementById("gonext").addEventListener('click', function (e) {
	weHaveSumbitAtHome("gonext");
});
document.getElementById("goend").addEventListener('click', function (e) {
	weHaveSumbitAtHome("goend");
});

function weHaveSumbitAtHome(cmd = "null") {
	$.ajax({
		type: 'get',
		url: '/scs',
		data: `command=${cmd}`,
		success: (d) => {
            document.getElementById("toastData").innerHTML = `Sent Command ${d.command}`;
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(document.getElementById("toasty"));
            toastBootstrap.show();

        if (updateShown) return;
            let updateElem = document.getElementById("outdatedPlaceholder");
            const appendAlert = (message, type) => {
                const wrapper = document.createElement('div')
                wrapper.innerHTML = [
                  `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                  `   <div>${message}</div>`,
                  '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                  '</div>'
                ].join('')
                updateElem.append(wrapper)
              }
              if (d.outdated) {
                  appendAlert(`Hey! There is a new version of SCS Remote available, you should probably upgrade...<br>Current version: ${d.curv} <br>New version: ${d.newv} <br>Grab it here: <a href="https://github.com/demonitize/showcueremote">github.com/demonitize/showcueremote</a>`, 'danger')
              }
              updateShown = true;

		}
	})
}
