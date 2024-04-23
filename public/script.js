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
            document.getElementById("toastData").innerHTML = `Sent Command ${d}`;
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(document.getElementById("toasty"));
            toastBootstrap.show();
		}
	})

}