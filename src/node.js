import { LiteGraph } from "litegraph.js/build/litegraph.core";
import * as openai from "openai"
import * as dedent from "dedent-js"


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
    this.maxWidth = 400;
    this.minWidth = 150;
}

WidgetText.title = "Text";
WidgetText.desc = "Shows the input value";

WidgetText.prototype.onDrawForeground = function (ctx) {
    // flags.collapsed is set or unset in LiteGraphNode.prototype.collapse
    // https://github.com/jagenjo/litegraph.js/blob/551643839a2cb6c68a0fbccc4209303fe4f45f02/src/litegraph.js#L4831-L4842
    // if the node is collapsed, don't draw the text
    if (this.flags.collapsed) {
        return;
    }

    ctx.fillStyle = this.fontColor;
    const value = this.properties["value"];

    ctx.font = this.fontSize.toString() + "px " + this.font;
    // NOTE: resize must be called after setting the font, as it uses the font size

    const lines = this.text2lines(ctx, value, this.maxWidth);
    this.resize(ctx, lines);
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(
            lines[i],
            15,
            this.fontSize * 0.2 + this.fontSize * (parseInt(i) + 1),
        );
    }
};

// convert a string to an array of lines based on the max width
// if a line is too long, it will be split into multiple lines
WidgetText.prototype.text2lines = function (ctx, text, maxWidth) {
    const lines = text.split("\n");
    const result = [];
    for (let i = 0; i < lines.length; ++i) {
        const words = lines[i].split(" ");
        let line = "";
        for (let j = 0; j < words.length; ++j) {
            const testLine = line + words[j] + " ";
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && j > 0) {
                result.push(line);
                line = words[j] + " ";
            } else {
                line = testLine;
            }
        }
        result.push(line);
    }
    return result;
}

WidgetText.prototype.resize = function (ctx, lines) {
    // measure the max width of the lines
    let maxWidth = 0;
    for (const line of lines) {
        const lineWidth = ctx.measureText(line).width;
        if (lineWidth > maxWidth) {
            maxWidth = lineWidth;
        }
    }

    this.size[0] = Math.max(this.minWidth, maxWidth + 30);
    this.size[1] = this.fontSize * lines.length + 20;
};

WidgetText.prototype.onExecute = function () {
    // get all the values from ancestors
    let parent_node = this.getInputNode(0);
    const values = [];
    while (parent_node) {
        values.push(parent_node.properties.value);
        parent_node = parent_node.getInputNode(0);
    }
    values.reverse();
    // NOTE: values does not include the current node's value

    if (values.length == 0) {
        const alertString = `
        The text node only utilizes its ancestors' content as messages to chat with ChatGPT and does not include its own content.

        Please make sure to add at least one node as input
        `;
        alert(dedent(alertString));
        return;
    }

    const messages = values.map((value) => {
        return {
            role: "system",
            content: value,
        };
    });

    const apiKey = localStorage.getItem("api-key");
    if (apiKey == null) {
        alert("Please enter your OpenAI API key in the settings menu.");
        return;
    }

    const configuration = new openai.Configuration({
        apiKey: apiKey,
    });
    const openaiClient = new openai.OpenAIApi(configuration);
    this.title = "Text (generating...)"
    openaiClient.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
    }).then((response) => {
        this.properties.value = response.data.choices[0].message.content;
        this.setDirtyCanvas(true, true);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        this.title = "Text";
    });
};

// add a clear option to the context menu to clear the text
// the relevant litegraph code is here:
// https://github.com/jagenjo/litegraph.js/blob/551643839a2cb6c68a0fbccc4209303fe4f45f02/src/litegraph.js#L13157-L13163
WidgetText.prototype.getExtraMenuOptions = function (lgraphCanvas, options) {
    return [{
        content: "Clear",
        callback: () => {
            this.properties.value = "";
        }
    }]
}

LiteGraph.registerNodeType("widget/text", WidgetText);
