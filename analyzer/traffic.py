from flask import Flask, jsonify, request, make_response, abort
from classify_image import maybe_download_and_extract, run_inference_on_image
import os

app = Flask(__name__)
maybe_download_and_extract()

UPLOAD_FOLDER = '/'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/traffic', methods=['POST'])
def submit_traffic():
    # check if the post request has the file part
    if 'file' not in request.files:
        abort(400, {'message': 'No file sent.'})
    file = request.files['file']
    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
        abort(400, {'message': 'Invalid file sent.'})
    if file and allowed_file(file.filename):
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], 'traffic.png'))
        run_inference_on_image('./traffic.png')
        return make_response(jsonify({"status": "success"}), 200)
    return make_response(jsonify({"status": "error: invalid method. POST required."}), 400)

if __name__ == '__main__':
    app.run(port=43594)