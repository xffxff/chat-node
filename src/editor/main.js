import { LGraph, LGraphCanvas } from "litegraph.js/build/litegraph.core";
import "litegraph.js/css/litegraph.css";
import "./main.css";

class Editor {
    constructor() {
        const html = `
            <div class="litegraph">
                <div class="header"></div>
                <div class="content">
                    <canvas id="canvas"></canvas>
                </div>
            </div>
            <div></div>
        `;
        document.body.innerHTML = html;

        this.graph = new LGraph();
        this.canvas = new LGraphCanvas("#canvas", this.graph);

        this.#resizeCanvas();
        this.#configurateHeader();
    }

    #resizeCanvas() {
        const canvasElement = document.querySelector("#canvas");
        const dpr = window.devicePixelRatio || 1;
        const { width, height } =
            canvasElement.parentNode.getBoundingClientRect();
        console.log(width, height);
        canvasElement.width = width * dpr;
        canvasElement.height = height * dpr;
        canvasElement.style.width = width + "px";
        canvasElement.style.height = height + "px";
        const ctx = canvasElement.getContext("2d");
        ctx.scale(dpr, dpr);
    }

    #configurateHeader() {
        const headerElement = document.querySelector(".header");
        const html = `
            <button class='btn execute'>Execute</button>
            <button class='btn settings'>Settings</button>
        `;
        headerElement.innerHTML = html;

        const executeBtn = document.querySelector(".btn.execute");
        executeBtn.addEventListener("click", () => {
            for (const id in this.canvas.selected_nodes) {
                const node = this.canvas.selected_nodes[id];
                node.doExecute();
            }
        });

        this.#settingsModal();
    }

    #settingsModal() {
        const html = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <form class="form">
                    <div class="api-key">
                        <label for="api-key">OpenAI API Key</label>
                        <input type="text" id="api-key" name="api-key" placeholder="Enter your API key">
                    </div>
                    <div class="save">
                        <input type="submit" value="Save">
                    </div>
                </form>
            </div>
        `;
        const modal = document.createElement("div");
        modal.classList.add("settings-modal");
        modal.innerHTML = html;
        document.body.appendChild(modal);

        // if the api key is already saved, show it in the input field
        const apiKey = localStorage.getItem("api-key");
        if (apiKey) {
            const apiKeyInput = document.querySelector("#api-key");
            apiKeyInput.value = apiKey;
        }

        // when the user clicks the settings button, open the modal
        const settingsBtn = document.querySelector(".btn.settings");
        settingsBtn.addEventListener("click", () => {
            modal.style.display = "block";
        });

        // when the user clicks on the close button, close the modal
        const closeSpan = document.querySelector(".close");
        closeSpan.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // when the user clicks anywhere outside of the modal, close it
        window.addEventListener("click", (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });

        // when the user clicks the save button, save the api key and close the modal
        const form = document.querySelector(".form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const apiKey = document.querySelector("#api-key").value;
            localStorage.setItem("api-key", apiKey);
            modal.style.display = "none";
        });
    }
}

export default Editor;
