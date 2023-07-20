import { LGraph, LGraphCanvas } from "litegraph.js";
import 'litegraph.js/css/litegraph.css'


const canvasElement = document.createElement("canvas");
canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;
document.body.appendChild(canvasElement);

const graph = new LGraph();
const canvas = new LGraphCanvas(canvasElement, graph);
graph.start();

