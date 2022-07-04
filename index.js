// Index.js
// Main function is to move containers around responsively

const main_page_div = document.getElementsByClassName('page-body')[0];
const containers_html = main_page_div.getElementsByClassName('container');

let current_selected = null;
let mousedown = false;

// Initialise new array for each container
let containers = [ ];

for (let i = 0; i < containers_html.length; i++) {
    let data = { };
    data.elem = containers_html.item(i);
    data.index = i;
    data.cached_mouse = { x: window.innerWidth/2, y: window.innerHeight/2 + ( -1 + i )*150 }; // Values in px
    data.init = false;
    containers[i] = data;
}

let mouse_pos = { // values in px
    x: 10,
    y: 10
}

// Lerp function
const lerp = (a, b, n) => a + (b - a) * n;

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

const handle_dragging = (index) => {
    current_selected = index;
}


let center_window_x = window.innerWidth/2;
let center_window_y = window.innerHeight/2;

const render = () => {
    // On mousedown
    if ( mousedown && current_selected != null ) {
        let data = containers[current_selected];

        let x = parseFloat(data.elem.style.left.replace('px', ''));
        let y = parseFloat(data.elem.style.top.replace('px', ''));

        // Lerp cached mouse pos to mouse position
        x = lerp(x, mouse_pos.x - data.elem.offsetWidth/2, 0.1);
        y = lerp(y, mouse_pos.y - data.elem.offsetHeight/2, 0.1);

        x = clamp(x, 0, window.innerWidth - data.elem.offsetWidth);
        y = clamp(y, 0, window.innerHeight - data.elem.offsetHeight);

        // Update element position
        data.elem.style.left = x + 'px';
        data.elem.style.top = y + 'px';

        data.cached_mouse.x = mouse_pos.x;
        data.cached_mouse.y = mouse_pos.y;
    }

    // Lerp every container pos to their respective cached mouse pos when they are idle
    for (let i = 0; i < containers.length; i++) {
        let data = containers[i];
        let elem = data.elem;

        // Move current element to be under others
        elem.style.zIndex = i;

        if ( !data.init ) {
            elem.style.left = data.cached_mouse.x - elem.offsetWidth/2 + 'px';
            elem.style.top = data.cached_mouse.y - elem.offsetHeight/2 + 'px';
            data.init = true;
        }

        let x = parseFloat(elem.style.left.replace('px', ''));
        let y = parseFloat(elem.style.top.replace('px', ''));

        x = clamp(x, 0, window.innerWidth - data.elem.offsetWidth);
        y = clamp(y, 0, window.innerHeight - data.elem.offsetHeight);

        // Check if x is about equal to the cached mouse pos
        if ( Math.abs(x - data.cached_mouse.x) > 1 ) { 
            x = lerp(x, data.cached_mouse.x - elem.offsetWidth/2, 0.1) 
            elem.style.left = x + 'px';
        }

        // Check if y is about equal to the cached mouse pos
        if ( Math.abs(y - data.cached_mouse.y) > 1 ) {
            y = lerp(y, data.cached_mouse.y - elem.offsetHeight/2, 0.1) 
            elem.style.top = y + 'px';
        }
    }

    if ( current_selected != null ) {
        containers[current_selected].elem.style.zIndex = containers.length;
    }
}

setInterval(render, 1000 / 60);

// Registering mousedown callback for each container
for (let i = 0; i < containers.length; i++) {
    let data = containers[i];


    data.elem.addEventListener('mousedown', (_) => {
        handle_dragging(i);
    })
}

onmousemove = (e) => { mouse_pos.x = e.clientX; mouse_pos.y = e.clientY};
onmouseup = (_) => { mousedown = false; }
onmousedown = (event) => {
    // check if we are hovering over an a tag
    let target = event.target;
    if ( target.tagName == 'A' ) {
        window.location.href = target.href;
        return
    }

    mousedown = true; 
}