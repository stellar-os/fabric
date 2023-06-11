importScripts('./webm-writer2.js')

let webmWriter = null;
let fileWritableStream = null;

const fps = 25;

let ctx = null;
let width = null;
let height = null;

function render(canvas) {
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;

    ctx.fillStyle = 'red';

    update(0);
}

function draw(rotation = 0) {
    ctx.clearRect(0, 0, 1000, 1000);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(rotation);
    ctx.translate(-width / 2, -height / 2);
    ctx.beginPath();
    ctx.rect(200, 200, 200, 200);

    ctx.fill();

    ctx.restore();
}

function update(t) {
    draw(t / 500);
    requestAnimationFrame(update);
}

async function startRecording(fileHandle, canvas, trackSettings) {
    fileWritableStream = await fileHandle.createWritable();
    webmWriter = new WebMWriter({
        fileWriter: fileWritableStream,
        codec: 'VP9',
        width: trackSettings.width,
        height: trackSettings.height});

    const init = {
        output: (chunk) => {
            webmWriter.addFrame(chunk);
        },
        error: (e) => {
            console.log(e.message);
            stopRecording();
        }
    };

    const config = {
        codec: "vp09.00.10.08",
        width: trackSettings.width,
        height: trackSettings.height,
        bitrate: 10e6,
    };

    let encoder = new VideoEncoder(init);
    let support = await VideoEncoder.isConfigSupported(config);
    console.assert(support.supported);
    encoder.configure(config);

    for(frameIndex=0;frameIndex< 300;frameIndex++){
        update(frameIndex);

        const videoFrame = new VideoFrame(canvas, { timestamp: (1e6 / fps) * frameIndex });
        encoder.encode(videoFrame);
        videoFrame.close();
    }
} 

async function stopRecording(){
    await webmWriter.complete();
    fileWritableStream.close();
    fileWritableStream = null;
}

self.addEventListener('message', function (e) {
    switch (e.data.type) {
        case "start":
            render(e.data.canvas);

            startRecording(e.data.fileHandle, e.data.canvas, e.data.trackSettings);
            break;
        case "stop":
            stopRecording();
            break;
    }
});