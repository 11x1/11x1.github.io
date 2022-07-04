const html_elems = {
    canvas: document.getElementById('gifcontainer'),
    gif_text: document.getElementById('gif-text'),
    status: document.getElementById('loaded-frame-fount'),
    img_preview: document.getElementById('image-preview-img'),
    help_text: document.getElementById('help-text'),
}

const data = {
    frames: 0,
    text: '',
    max_frames: 34,
    frames_arr: [],
    width: 300,
    init: false,
}

const load_gif = (canvas) => {
    data.frames_arr = [];
    data.frames = 0;
    data.init = false;
    html_elems.help_text.style.display = 'none';

    const ctx = canvas.getContext('2d');
    // Clear the canvas	
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Initialize font
    ctx.font = "100px rounded";
    const text = data.text;
    const width = ctx.measureText(text).width

    // Set canvas width
    ctx.canvas.width = width + 173;
    data.width = width + 173;

    // Draw background
    ctx.fillStyle = `rgb(51, 51, 51)`;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw text
    // First letter is accent color
    ctx.font = "100px rounded";
    ctx.fillStyle = `rgb(255, 168, 168)`;
    ctx.fillText(text.substring(0, 1), 153, 110);
    // Rest of the text is regular color
    ctx.fillStyle = `rgb(233, 233, 233)`;
    ctx.fillText(text.substring(1, text.length), 153 + ctx.measureText(text.substring(0, 1)).width, 110);

}


const onDrawFrame = (ctx, frame) => {
    ctx.drawImage(frame.buffer, frame.x, frame.y);
    data.frames++;
    if (data.frames_arr.length < data.max_frames) {
        html_elems.status.innerHTML = `Initializing GIF: ${parseInt(data.frames / data.max_frames * 100)}%`;
        if (data.frames === data.max_frames) {
            html_elems.status.innerHTML = `Preparing gif: 100%`;

            if (!data.init) {
                data.init = true;

                gifshot.createGIF({
                    'images': data.frames_arr,
                    'gifWidth': data.width,
                    'gifHeight': 153,
                    'numFrames': data.max_frames + 1,
                    'interval': 1.5 / data.max_frames,
            
                }, function (obj) {
                    if (!obj.error) {
                        var image = obj.image
                        html_elems.img_preview.src = image;
                        html_elems.status.innerHTML = `GIF ready! (if the font is not loaded, try again)`;
                        html_elems.help_text.style.display = 'block';
                    }
                });
            }
        }
        data.frames_arr.push(ctx.canvas.toDataURL('image/png'));
    }

    if (data.frames >= data.max_frames) data.frames = 0;
}

html_elems.gif_text.onchange = (e) => {
    if (e.type !== 'change') return;
    data.text = e.target.value;
    load_gif(html_elems.canvas);
}

load_gif(html_elems.canvas);
html_elems.gif_text.dispatchEvent(new Event('change'));

// Load the GIF, set custom frame render function
gifler('./assets/img/animated-clock.gif').frames('canvas#gifcontainer', onDrawFrame);

