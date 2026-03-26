# 📈 Interactive Graph Visualizer

A modern, high-performance web application for **real-time mathematical visualization and data analysis**.

Built using **Flask**, **SymPy**, and **Plotly.js**, this tool enables users to plot complex equations, manipulate parameters dynamically, and overlay real-world datasets — all in an intuitive interactive interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/flask-2.0+-green.svg)

---

## 🚀 Live Demo

👉 https://your-render-link.onrender.com
*(Add your deployed link here)*

---

## ✨ Features

* 📈 **Real-time Function Plotting**
  Supports a wide range of mathematical functions (`sin`, `cos`, `log`, `exp`, etc.) with instant visualization.

* 🎛️ **Dynamic Parameter Sliders**
  Automatically detects variables (e.g., `a*x^2 + b`) and generates sliders for real-time manipulation.

* 📐 **Calculus Integration**
  Computes derivatives automatically and displays slope values on hover.

* 📂 **CSV Data Overlay**
  Upload `.csv` files to visualize and compare real-world data with mathematical models.

* 🎨 **Customizable UI**

  * Dark theme interface
  * Adjustable axis ranges
  * Multiple graph types (Line, Scatter, Bar)

* 💾 **Session Persistence**
  Automatically saves equations and settings using browser storage.

* 📥 **Export Functionality**
  Download graphs as high-quality PNG images.

---

## 🛠️ Tech Stack

* **Backend:** Flask (Python)
* **Mathematical Engine:** SymPy, NumPy
* **Frontend:** HTML5, CSS3, JavaScript
* **Visualization:** Plotly.js
* **UI Enhancements:** Font Awesome, Google Fonts (Inter)

---

## ⚙️ Installation & Setup

### 📌 Prerequisites

* Python 3.8+
* pip (Python package manager)

---

### 🔧 Setup Steps

```bash
git clone https://github.com/your-username/interactive-visualizer.git
cd interactive-visualizer

pip install -r requirements.txt
python app.py
```

👉 Open in browser:
http://127.0.0.1:5000

---

## 📖 How to Use

1. **Add Functions**
   Enter expressions like:

   ```
   sin(x) * exp(-0.1*x)
   ```

2. **Use Parameters**
   Example:

   ```
   a * sin(b * x)
   ```

   → Sl
