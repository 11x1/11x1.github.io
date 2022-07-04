let sayings_iter = 0
function typewrite (text, speed) {
    var i = 0;
    var speed = speed;
    let hit_limit = false;
    let hit_static_limit = false;
    var timer = setInterval(function() {
    if (text[i] == ' ' && !hit_static_limit) {
        i++;
    } else if (text[i] == ' ' && hit_static_limit) {
        i--;
    }
    if (i <= text.length && !hit_limit) {
        document.title = base + text.substring(0, i);
        i++;
        if (i == text.length) {
        hit_limit = true;
        }
    } else if (hit_limit && !hit_static_limit) {
        document.title = base + text;
        i++;
        if (i == text.length + 3) {
        hit_static_limit = true;
        }
    } else if (hit_static_limit && i > 0) {
        document.title = base + text.substring(0, i);
        i--;
    } else {
        clearInterval(timer);
        sayings_iter = sayings_iter >= sayings.length - 1 ? 0 : sayings_iter + 1;
        let new_saying = sayings[sayings_iter]
        typewrite(new_saying, speed);
        
        hit_static_limit = false;
        hit_limit = false;
    }
    }, speed);
}

const base = 'eclipse.lua | ';
const sayings = [
    'top performing primordial lua',
    'Justin Technologies LLC',
    'one of the best',
    'the best',
    'donate 2000 credits to uid 573',
    'khey can\'t code',
]

typewrite(sayings[sayings_iter], 350);