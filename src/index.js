import Editor from "./editor/main";
import "./style.css";
import "./node";
import { LiteGraph } from "litegraph.js/build/litegraph.core";

const editor = new Editor();

const node = LiteGraph.createNode("widget/text");
node.pos = [600, 500];
node.properties.value = "Hello World!";
editor.graph.add(node);
editor.graph.start();
