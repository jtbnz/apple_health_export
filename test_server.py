from flask import Flask

app = Flask(__name__)

@app.route('/')
def test():
    return '<h1>Flask is working!</h1>'

if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1', port=8888)