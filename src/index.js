import {
    LGraph,
    LGraphCanvas,
    LiteGraph,
} from "litegraph.js/build/litegraph.core.js";
import "./node";
import "litegraph.js/css/litegraph.css";
import "./style.css";

function createCanvas(parent) {
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

    parent.appendChild(canvas);
}

function createHeader(parent) {
    const html = `
        <div class="header">
            <button class='btn execute'>Execute</button>
            <button class='btn settings'>Settings</button>
        </div>
    `
    parent.innerHTML = html;
}

const root = document.createElement("div");
root.classList.add("litegraph");
document.body.appendChild(root);

createHeader(root);
createCanvas(root);

const graph = new LGraph();
const canvas = new LGraphCanvas("#canvas", graph);
const node = LiteGraph.createNode("widget/text");
node.pos = [600, 500];
node.properties.value = "Hello World!";
graph.add(node);
graph.start();

// add a event listener to the execute button
const btn = document.querySelector(".btn.execute");
btn.addEventListener("click", () => {
    for (const id in canvas.selected_nodes) {
        const node = canvas.selected_nodes[id];
        node.doExecute();
    }
})

// add a event listener to the settings button
const settingsBtn = document.querySelector(".btn.settings");
settingsBtn.addEventListener("click", () => {
    console.log("settingsBtn clicked");
});