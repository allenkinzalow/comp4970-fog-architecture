from flask import Flask, jsonify, request, make_response, abort
from classify_image import maybe_download_and_extract, classify
import os

UPLOAD_FOLDER = './'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

VALID_RESULTS = ['bycicle', 'bike', 'van', 'minivan', 'wheel', 'car', 'railcar', 'handcart', 'go-cart', 'cart', 'vehicle', 'scooter', 'trailer', 'wagon',
    'waggon', 'carriage', 'cab', 'taxi', 'tractor', 'taxicab', 'racer', 'rif', 'trucking', 'semi', 'wrecker', 'automated']

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def submit_traffic():
    # check if the post request has the file part
    if 'file' not in request.files:
        jsonify({'status': 'error: No file sent.'})
    file = request.files['file']
    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
        jsonify({'status': 'error: Invalid file sent.'})
    print(file.filename)
    if file and allowed_file(file.filename):
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], 'traffic.png'))
        results = classify()
        print(results)
        status = False
        for result in results:
            for check in VALID_RESULTS:
                check_singles = check.split(" ")
                if result in check_singles:
                    status = True
                    print(check + ' ' + result)
                    break
            else:
                continue
            break
        return make_response(jsonify({"status": "true" if status == True else "false"}), 200)
    return jsonify({"status": "error: invalid method. POST required."})

if __name__ == '__main__':
    app.run(port=80,host='0.0.0.0')