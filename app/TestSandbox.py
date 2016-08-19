from flask import Blueprint, render_template

test = Blueprint('test', __name__)

@test.route('/sandbox')
def js_sandbox(): 
    return render_template('js-sandbox.html')
