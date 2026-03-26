# 📈 Interactive Graph Visualizer

A modern, high-performance web application for **real-time mathematical visualization and data analysis**.

Built using **Flask**, **SymPy**, and **Plotly.js**, this tool enables users to plot complex equations, manipulate parameters dynamically, and overlay real-world datasets — all in an intuitive interactive interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/flask-2.0+-green.svg)

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

   → Sliders will appear automatically

3. **Quick Templates**
   Load common graphs like:

   * Bell Curve
   * Sigmoid
   * Circle

4. **Upload CSV Data**

   * Upload 2-column CSV (x, y)
   * Visualize alongside functions

5. **Adjust Settings**

   * Modify ranges
   * Toggle grid
   * Change graph type

---

## 📂 Project Structure

```
Interactive-Graph-Visualizer/
│
├── app.py                  # Flask backend & API
├── requirements.txt        # Dependencies
├── Procfile                # Deployment config
│
├── templates/
│   └── index.html          # Main UI
│
└── static/
    ├── css/style.css       # Styling
    └── js/main.js          # Frontend logic
```

---

## 🎯 Future Improvements

* 📊 3D graph plotting
* 🤖 AI-based equation suggestions
* 📱 Fully responsive mobile UI
* 🔗 Shareable graph links
* 📈 Advanced analytics tools

---

## 🤝 Contributing

Contributions are welcome!

If you'd like to improve this project:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 👨‍💻 Author

**Ayush Kumar**
B.Tech Student

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
