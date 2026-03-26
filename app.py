from flask import Flask, render_template, request, jsonify
import numpy as np
import sympy as sp
from sympy.parsing.sympy_parser import parse_expr
import pandas as pd



app = Flask(__name__)

x = sp.symbols('x')

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/plot', methods=['POST'])
def plot():
    data = request.json
    equation = data.get('equation')
    params = data.get('params', {})
    x_min = data.get('x_min', -10)
    x_max = data.get('x_max', 10)
    points = data.get('points', 400)

    if not equation:
        return jsonify({'error': 'No equation provided'})

    try:
        expr = parse_expr(equation, local_dict={
            'x': x,
            'sin': sp.sin, 'cos': sp.cos, 'tan': sp.tan,
            'asin': sp.asin, 'acos': sp.acos, 'atan': sp.atan,
            'sinh': sp.sinh, 'cosh': sp.cosh, 'tanh': sp.tanh,
            'log': sp.log, 'ln': sp.log, 'log10': lambda arg: sp.log(arg, 10),
            'sqrt': sp.sqrt, 'exp': sp.exp, 'abs': sp.Abs,
            'pi': sp.pi, 'e': sp.E
        })

        # Replace parameters
        for key, value in params.items():
            expr = expr.subs(sp.symbols(key), value)

        f = sp.lambdify(x, expr, "numpy")
        
        # Calculate derivative for slope hover info
        diff_expr = sp.diff(expr, x)
        f_prime = sp.lambdify(x, diff_expr, "numpy")

        x_vals = np.linspace(float(x_min), float(x_max), int(points))
        
        # Use a context manager to handle division by zero or log of negative
        with np.errstate(divide='ignore', invalid='ignore'):
            y_vals = f(x_vals)
            slope_vals = f_prime(x_vals)

        # Ensure we only have real numbers for plotting
        if np.iscomplexobj(y_vals):
            y_vals = np.real(y_vals)
        if np.iscomplexobj(slope_vals):
            slope_vals = np.real(slope_vals)

        # Convert to list and handle NaN/Inf for JSON compatibility
        y_plot = np.where(np.isfinite(y_vals), y_vals, None).tolist()
        slope_plot = np.where(np.isfinite(slope_vals), slope_vals, None).tolist()

        return jsonify({
            'x': x_vals.tolist(),
            'y': y_plot,
            'slope': slope_plot
        })

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/upload_csv', methods=['POST'])
def upload_csv():
    file = request.files['file']

    try:
        df = pd.read_csv(file)

        x = df.iloc[:, 0].tolist()
        y = df.iloc[:, 1].tolist()

        return jsonify({
            'x': x,
            'y': y
        })

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)