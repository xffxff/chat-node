import {
    LGraph,
    LGraphCanvas,
    LiteGraph,
} from "litegraph.js/build/litegraph.core.js";
import "./node";
import "litegraph.js/css/litegraph.css";
import "./style.css";

function createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";

    // the following code is for high resolution displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    return canvas;
}

function header() {
    const html = `
        <div class="header">
            <button class='btn'>Execute</button>
        </div>
    `
    return html;
}

function component() {
    const root = document.createElement("div");
    // add 'litegraph' class to root element is required for some components of litegraph.js to work
    root.classList.add("litegraph");

    const headerHTML = header();
    root.innerHTML = headerHTML;

    const canvas = createCanvas();
    root.appendChild(canvas);

    return root;
}

document.body.appendChild(component());

const graph = new LGraph();
const canvas = new LGraphCanvas("#canvas", graph);
graph.start();
