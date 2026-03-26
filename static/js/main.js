let params = {};
let csvData = null;
let showGrid = true;
let debounceTimer;
let globalSettings = {
    lineWidth: 2.5,
    points: 400,
    showLegend: true
};

// ---------------- MODALS & STATUS ----------------
function toggleModal(id) {
    document.getElementById(id).classList.toggle("visible");
}

function updateSettings() {
    globalSettings.lineWidth = parseFloat(document.getElementById("lineWidthSetting").value);
    globalSettings.points = parseInt(document.getElementById("pointsSetting").value);
    globalSettings.showLegend = document.getElementById("showLegendSetting").checked;
    plotAll();
    saveSession();
}

async function checkStatus() {
    let start = Date.now();
    let statusText = document.getElementById("statusText");
    statusText.innerText = "Checking...";
    
    try {
        await fetch('/');
        let latency = Date.now() - start;
        statusText.innerText = `Latency: ${latency}ms`;
        setTimeout(() => statusText.innerText = "System Ready", 3000);
    } catch (e) {
        statusText.innerText = "Offline";
    }
}

// ---------------- UTILS ----------------
function preprocessEquation(eq) {
    eq = eq.replace(/\^/g, "**");
    eq = eq.replace(/(\d)([a-zA-Z])/g, "$1*$2");
    eq = eq.replace(/cosec/g, "csc");
    eq = eq.replace(/cotan/g, "cot");
    return eq;
}

function debouncedPlot() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        detectParameters();
        plotAll();
        saveSession();
    }, 300);
}

// ---------------- UI ACTIONS ----------------
function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");
    setTimeout(() => Plotly.Plots.resize('graph'), 450);
}

function resetRange() {
    document.getElementById("xMin").value = -10;
    document.getElementById("xMax").value = 10;
    Plotly.relayout('graph', {
        'xaxis.autorange': true,
        'yaxis.autorange': true
    });
    plotAll();
}

function resetYRange() {
    document.getElementById("yMin").value = "";
    document.getElementById("yMax").value = "";
    plotAll();
}

function addEquation(val = "", isVisible = true) {
    let container = document.getElementById("equations-container");
    let group = document.createElement("div");
    group.className = "input-group";

    let visibleBtn = document.createElement("button");
    visibleBtn.className = "toggle-trace " + (isVisible ? "active" : "");
    visibleBtn.innerHTML = isVisible ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    visibleBtn.onclick = () => {
        let active = visibleBtn.classList.toggle("active");
        visibleBtn.innerHTML = active ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        debouncedPlot();
    };

    let input = document.createElement("input");
    input.type = "text";
    input.value = val;
    input.placeholder = "e.g. sin(x), a*x^2";
    input.oninput = debouncedPlot;

    let delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.innerHTML = "×";
    delBtn.onclick = () => {
        group.remove();
        debouncedPlot();
    };

    group.appendChild(visibleBtn);
    group.appendChild(input);
    group.appendChild(delBtn);
    container.appendChild(group);
    return input;
}

// ---------------- PARAM DETECTION ----------------
function detectParameters() {
    let inputs = document.querySelectorAll("#equations-container input");
    let slidersContainer = document.getElementById("sliders-container");
    let foundParams = new Set();
    const reserved = ['x','sin','cos','tan','log','ln','log10','sqrt','exp','abs','csc','sec','cot','asin','acos','atan','sinh','cosh','tanh','pi','e'];

    inputs.forEach(input => {
        let matches = input.value.match(/[a-zA-Z_][a-zA-Z0-9_]*/g);
        if (matches) matches.forEach(m => { if (!reserved.includes(m.toLowerCase())) foundParams.add(m); });
    });

    Object.keys(params).forEach(p => { if (!foundParams.has(p)) delete params[p]; });

    slidersContainer.innerHTML = "";
    foundParams.forEach(param => {
        if (!(param in params)) params[param] = 1;

        let label = document.createElement("label");
        label.innerText = `${param}: ${params[param]}`;

        let slider = document.createElement("input");
        slider.type = "range";
        slider.min = -10;
        slider.max = 10;
        slider.step = 0.1;
        slider.value = params[param];

        slider.oninput = (e) => {
            params[param] = parseFloat(e.target.value);
            label.innerText = `${param}: ${params[param]}`;
            plotAll();
            saveSession();
        };

        slidersContainer.appendChild(label);
        slidersContainer.appendChild(slider);
    });
}

// ---------------- PLOT ----------------
async function plotAll() {
    let loader = document.getElementById("loading-overlay");
    loader.classList.add("visible");

    let inputs = document.querySelectorAll("#equations-container .input-group");
    let xMin = parseFloat(document.getElementById("xMin").value) || -10;
    let xMax = parseFloat(document.getElementById("xMax").value) || 10;
    let selectedType = document.getElementById("graphType").value;

    let colors = ['#38bdf8', '#f43f5e', '#22c55e', '#eab308', '#a855f7'];

    const fetchPromises = Array.from(inputs).map(async (group, index) => {
        let input = group.querySelector("input");
        let visible = group.querySelector(".toggle-trace").classList.contains("active");
        let equation = input.value.trim();
        if (!equation || !visible) return null;

        try {
            let response = await fetch('/plot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    equation: preprocessEquation(equation),
                    params,
                    x_min: xMin,
                    x_max: xMax,
                    points: globalSettings.points
                })
            });

            let result = await response.json();
            if (result.error) return null;

            let trace = {
                x: result.x,
                y: result.y,
                customdata: result.slope,
                name: equation,

                type: 'scatter',
                mode: selectedType === 'markers' ? 'markers' : 'lines',

                fill: 'none',
                connectgaps: false,
                simplify: true,

                line: {
                    color: colors[index % colors.length],
                    width: globalSettings.lineWidth,
                    shape: 'linear'
                },

                hovertemplate:
                    '<b>%{name}</b><br>x: %{x:.2f}<br>y: %{y:.2f}<br>Slope: %{customdata:.4f}<extra></extra>'
            };

            if (selectedType === 'markers') {
                trace.marker = {
                    color: colors[index % colors.length],
                    size: 6
                };
            }

            return trace;
        } catch (err) {
            return null;
        }
    });

    let traces = (await Promise.all(fetchPromises)).filter(t => t !== null);

    // ✅ CSV FIXED
    if (csvData) {
        traces.push({
            x: csvData.x,
            y: csvData.y,
            name: 'CSV Data',
            type: selectedType === 'bar' ? 'bar' : 'scatter',

            fill: 'none',
            mode: selectedType === 'markers' ? 'markers' : 'lines',
            connectgaps: false,

            marker: { color: '#ffffff', size: 6 },

            hovertemplate: 'x: %{x}<br>y: %{y}<extra></extra>'
        });
    }

    let layout = {
        title: {
            text: document.getElementById("chartTitle").value,
            font: { color: 'white' }
        },
        showlegend: globalSettings.showLegend,
        paper_bgcolor: '#0f172a',
        plot_bgcolor: '#0f172a',
        font: { color: 'white', family: 'Inter' },

        hoverlabel: {
            bgcolor: '#1e293b',
            font: { color: '#ffffff' }
        },

        xaxis: {
            title: document.getElementById("xAxisLabel").value,
            showgrid: showGrid,
            gridcolor: '#1e293b',
            zeroline: true,
            zerolinecolor: '#94a3b8',
            zerolinewidth: 2
        },

        yaxis: {
            title: document.getElementById("yAxisLabel").value,
            showgrid: showGrid,
            gridcolor: '#1e293b',
            zeroline: true,
            zerolinecolor: '#94a3b8',
            zerolinewidth: 2,
            autorange: !document.getElementById("yMin").value && !document.getElementById("yMax").value,
            range: [
                parseFloat(document.getElementById("yMin").value) || null,
                parseFloat(document.getElementById("yMax").value) || null
            ]
        },

        margin: { t: 60, b: 60, l: 80, r: 40 }
    };

    Plotly.newPlot('graph', traces, layout, {
        responsive: true,
        displaylogo: false
    });

    loader.classList.remove("visible");
}

// ---------------- SESSION ----------------
function saveSession() {
    let eqs = [];
    document.querySelectorAll("#equations-container .input-group").forEach(group => {
        eqs.push({
            val: group.querySelector("input").value,
            visible: group.querySelector(".toggle-trace").classList.contains("active")
        });
    });

    let data = {
        eqs,
        xMin: document.getElementById("xMin").value,
        xMax: document.getElementById("xMax").value,
        yMin: document.getElementById("yMin").value,
        yMax: document.getElementById("yMax").value,
        title: document.getElementById("chartTitle").value,
        xLabel: document.getElementById("xAxisLabel").value,
        yLabel: document.getElementById("yAxisLabel").value,
        graphType: document.getElementById("graphType").value,
        params
    };

    localStorage.setItem("viz_session", JSON.stringify(data));
}

function loadSession() {
    let stored = localStorage.getItem("viz_session");
    if (!stored) return;

    let data = JSON.parse(stored);

    document.getElementById("equations-container").innerHTML = "";
    data.eqs.forEach(e => addEquation(e.val, e.visible));
    if (data.eqs.length === 0) addEquation();

    document.getElementById("xMin").value = data.xMin;
    document.getElementById("xMax").value = data.xMax;
    document.getElementById("yMin").value = data.yMin;
    document.getElementById("yMax").value = data.yMax;
    document.getElementById("chartTitle").value = data.title;
    document.getElementById("xAxisLabel").value = data.xLabel;
    document.getElementById("yAxisLabel").value = data.yLabel;
    document.getElementById("graphType").value = data.graphType;
    params = data.params || {};

    plotAll();
}

// ---------------- GRID & DOWNLOAD ----------------
function toggleGrid() {
    showGrid = !showGrid;
    plotAll();
}

function downloadGraph() {
    Plotly.downloadImage('graph', {
        format: 'png',
        width: 1200,
        height: 800,
        filename: 'visualizer_plot'
    });
}

// ---------------- CSV ----------------
async function uploadCSV() {
    let file = document.getElementById("csvFile").files[0];
    if (!file) return;

    let formData = new FormData();
    formData.append("file", file);

    try {
        let resp = await fetch('/upload_csv', {
            method: 'POST',
            body: formData
        });

        let res = await resp.json();

        if (res.error) {
            alert(res.error);
        } else {
            csvData = res;
            plotAll();
        }
    } catch (err) {
        console.error(err);
    }
}

function clearCSV() {
    csvData = null;
    document.getElementById("csvFile").value = "";
    plotAll();
}

// ---------------- INIT ----------------
window.onload = () => {
    loadSession();

    if (document.querySelectorAll("#equations-container input").length === 0) {
        addEquation();
    }

    detectParameters();
};