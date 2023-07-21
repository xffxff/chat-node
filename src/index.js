import { LGraph, LGraphCanvas } from "litegraph.js/build/litegraph.core.js";
import './node'
import 'litegraph.js/css/litegraph.css'


function component() {
    const root = document.createElement("div");
    // add 'litegraph' class to root element is required for some components of litegraph.js to work
    root.classList.add("litegraph")

    const canvasElement = document.createElement("canvas");
    canvasElement.id = "canvas";
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
    root.appendChild(canvasElement);

    return root;
}

document.body.appendChild(component());

const graph = new LGraph();
const canvas = new LGraphCanvas("#canvas", graph);
graph.start();

