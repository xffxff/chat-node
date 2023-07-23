// When you double click on a node, a panel will be shown, 
// you have the ability to modify certain settings of the node, such as the title.

import { LGraphCanvas } from "litegraph.js/build/litegraph.core.js";
import * as Quill from "quill";
import "quill/dist/quill.snow.css";

// Override the default showShowNodePanel function of LGraphCanvas.
// The original function is defined here:
// https://github.com/jagenjo/litegraph.js/blob/551643839a2cb6c68a0fbccc4209303fe4f45f02/src/litegraph.js#L12488-L12638
LGraphCanvas.prototype.showShowNodePanel = function (node) {
    const ref_window = this.getCanvasWindow();
    const panel = this.createPanel(node.title || "", {
        closable: true,
        window: ref_window,
        onOpen: () => {
            this.NODEPANEL_IS_OPEN = true;
        },
        onClose: () => {
            this.NODEPANEL_IS_OPEN = false;
            this.node_panel = null;
        }
    });
    this.node_panel = panel;
    panel.id = "node-panel";
    panel.node = node;
    panel.classList.add("settings");

    function inner_refresh() {
        panel.content.innerHTML = ""; // clear
        panel.addHTML(
            `
            <div id="editor">
            <p>Hello World!</p>
            <p>Some initial <strong>bold</strong> text</p>
            <p><br></p>
            </div>
            `
        );

        panel.addButton("Save", () => {
            node.properties.value = quill.getText();
        });
    }
    inner_refresh();

    this.canvas.parentNode.appendChild(panel);

    // auto saving when closing
    const closeBtn = panel.querySelector(".close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            node.properties.value = quill.getText();
        });
    }
    
    // create the quill editor
    const quill = new Quill('#editor', {
        theme: 'snow'
    });
    quill.setText(node.properties.value);
};
