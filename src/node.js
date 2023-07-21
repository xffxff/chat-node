import { LiteGraph } from "litegraph.js/build/litegraph.core";

function WidgetText() {
    this.addInputs("", 0);
    this.properties = {
        value: "...",
    };
    this.font = "Arial";
    this.fontSize = 18;
    this.fontColor = "#AAA";
}

WidgetText.title = "Text";
WidgetText.desc = "Shows the input value";

WidgetText.prototype.onDrawForeground = function(ctx) {
    ctx.fillStyle = this.fontColor;
    var v = this.properties["value"];

    ctx.font = this.fontSize.toString() + "px " + this.font;

    var lines = v.replace(/[\r\n]/g, "\\n").split("\\n");
    for (var i=0; i < lines.length; i++) {
        ctx.fillText(
            lines[i],
            15,
            this.fontSize * -0.15 + this.fontSize * (parseInt(i) + 1)
        );
    }
};

LiteGraph.registerNodeType("widget/text", WidgetText);