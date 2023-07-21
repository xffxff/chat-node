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
    // NOTE: resize must be called after setting the font, as it uses the font size
    this.resize(ctx);

    var lines = v.replace(/[\r\n]/g, "\\n").split("\\n");
    for (var i=0; i < lines.length; i++) {
        ctx.fillText(
            lines[i],
            15,
            this.fontSize * -0.15 + this.fontSize * (parseInt(i) + 1)
        );
    }
};

WidgetText.prototype.resize = function(ctx) {
    // resize the node to fit the text
    const value = this.properties["value"];
    const lines = value.split("\n");

    // measure the max width of the lines
    let maxWidth = 0;
    for (const line of lines) {
        const lineWidth = ctx.measureText(line).width;
        if (lineWidth > maxWidth) {
            maxWidth = lineWidth;
        }
    }

    this.size[0] = maxWidth + 30;
    this.size[1] = this.fontSize * lines.length + 20;
}


LiteGraph.registerNodeType("widget/text", WidgetText);