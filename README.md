# 📈 Interactive Graph Visualizer
    2
    3 A modern, high-performance web application for real-time mathematical function visualization
      and data analysis. Built with **Flask**, **SymPy**, and **Plotly.js**, this tool allows users
      to plot complex equations, manipulate parameters with live sliders, and overlay CSV data.
    4
    5 ![License](https://img.shields.io/badge/license-MIT-blue.svg)
    6 ![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
    7 ![Flask](https://img.shields.io/badge/flask-2.0+-green.svg)
    8
    9 ## ✨ Features
   10
   11 - **Real-time Function Plotting**: Supports standard mathematical functions (`sin`, `cos`,
      `log`, `exp`, etc.) with instant rendering.
   12 - **Dynamic Parameter Sliders**: Automatically detects variables in your equations (e.g.,
      `a*x^2 + b`) and generates interactive sliders to manipulate them.
   13 - **Calculus Integration**: Automatically computes derivatives and displays the slope at any
      point on the curve via hover tooltips.
   14 - **CSV Data Overlay**: Upload `.csv` files to visualize raw data alongside mathematical
      models.
   15 - **Customizable UI**:
   16     - Toggleable dark theme aesthetics.
   17     - Adjustable X/Y ranges and line precision.
   18     - Multiple graph modes (Lines, Scatter, Bar).
   19 - **Session Persistence**: Saves your equations and settings automatically to your browser's
      local storage.
   20 - **Export**: Download your visualizations as high-quality PNG images.
   21
   22 ## 🚀 Tech Stack
   23
   24 - **Backend**: Python (Flask)
   25 - **Mathematical Engine**: SymPy (Symbolic Math), NumPy (Numerical Computing)
   26 - **Frontend**: JavaScript (Vanilla), HTML5, CSS3
   27 - **Visualization**: Plotly.js
   28 - **Icons & Fonts**: Font Awesome 6, Google Fonts (Inter)
   29
   30 ## 🛠️ Installation & Setup
   31
   32 ### Prerequisites
   33 - Python 3.8 or higher
   34 - `pip` (Python package manager)
   35
   36 ### Step-by-Step Guide
   37
   38 1. **Clone the Repository**
     git clone https://github.com/your-username/interactive-visualizer.git
     cd interactive-visualizer
   1
   2 2. **Install Dependencies**
     pip install -r requirements.txt
   1
   2 3. **Run the Application**
     python app.py


    1
    2 4. **Access the App**
    3    Open your browser and navigate to `http://127.0.0.1:5000`.
    4
    5 ## 📖 How to Use
    6
    7 1. **Adding Functions**: Type any expression in the sidebar (e.g., `sin(x) * exp(-0.1*x)`).
    8 2. **Parameters**: Use letters like `a`, `b`, or `k` to create sliders. For example: `a *
      sin(b * x)`.
    9 3. **Templates**: Use the "Quick Templates" dropdown to quickly load common curves like
      Sigmoids or Bell Curves.
   10 4. **Data Analysis**: Click "Upload CSV" to plot your own datasets. Ensure the CSV has two
      columns (typically `x` and `y`).
   11 5. **Settings**: Use the ⚙️ icon to adjust line thickness or point density for smoother
      curves.
   12
   13 ## 📂 Project Structure
  ├── app.py              # Main Flask server & SymPy logic
  ├── static/
  │   ├── css/style.css   # Modern dark-theme styling
  │   └── js/main.js      # Frontend logic & Plotly orchestration
  ├── templates/
  │   └── index.html      # Main application interface
  ├── utils/
  │   └── parser.py       # (Placeholder) Symbolic parsing utilities
  ├── uploads/            # Directory for uploaded data
  └── requirements.txt    # Project dependencies



   📊 Example Inputs

Try these functions:

sin(x)
x^2 + 3*x + 2
exp(-x^2)
a*sin(x)

🎯 Future Improvements
📈 3D graph plotting
🤖 AI-based equation suggestions
📱 Fully responsive mobile UI
📊 Advanced statistical visualizations
🔗 Shareable graph links


1
   2 ## 🤝 Contributing
   3
   4 Contributions are welcome! Please feel free to submit a Pull Request.
   
👨‍💻 Author

Ayush Kumar
B.Tech (Data Science) Student
