import { LiteGraph } from "litegraph.js/build/litegraph.core";

function WidgetText() {
    this.addInput("", 0);
    this.addOutput("", 0);
    this.horizontal = true;

    // the default mode is `LiteGraph.ALWAYS`, I'm not sure what it does
    // but if it's set to `LiteGraph.ALWAYS`, the method `onExecute` will be called every frame
    // because I only want to execute the node manually, I set the mode to `LiteGraph.NEVER`
    // the relevant code is here:
    // https://github.com/jagenjo/litegraph.js/blob/551643839a2cb6c68a0fbccc4209303fe4f45f02/src/litegraph.js#L1012
    this.mode = LiteGraph.NEVER;

    this.properties = {
        value: "",
    };
    this.font = "Arial";
    this.fontSize = 18;
    this.fontColor = "#AAA";
}

WidgetText.title = "Text";
WidgetText.desc = "Shows the input value";

WidgetText.prototype.onDrawForeground = function (ctx) {
    ctx.fillStyle = this.fontColor;
    const value = this.properties["value"];

    ctx.font = this.fontSize.toString() + "px " + this.font;
    // NOTE: resize must be called after setting the font, as it uses the font size
    this.resize(ctx);

    const lines = value.split("\n");
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(
            lines[i],
            15,
            this.fontSize * 0.2 + this.fontSize * (parseInt(i) + 1),
        );
    }
};

WidgetText.prototype.resize = function (ctx) {
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

    this.size[0] = Math.max(maxWidth + 30, 100);
    this.size[1] = this.fontSize * lines.length + 20;
};

WidgetText.prototype.onExecute = function () {
    console.log("WidgetText.onExecute");
};

LiteGraph.registerNodeType("widget/text", WidgetText);
