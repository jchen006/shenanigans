from flask import Flask, render_template

app = Flask(__name__)

#There was a bug when I deleted all the folders no error
@app.route('/')
def main():
    return render_template('index.html')


@app.route('/info')
def info():
    return render_template('info.html')


if __name__ == "__main__":
    app.run()













