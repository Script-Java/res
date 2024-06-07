from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os
import json

app = Flask(__name__)
CORS(app)

# Paths to the CSV directories
w_security_path = 'dataproj/backend/assets/opt_w_security'
wo_security_path = 'dataproj/backend/assets/opt_wo_security'

class StaticData:
    def __init__(self, path):
        self.path = path
    
    def get_chart_data(self):
        pass
        
    def get_all_csv(self):
        csv_files = [
            'buses_injection_timeseries',
            'generation_production_timeseries',
            'lines_from_timeseries',
            'lines_to_timeseries',
            'loads_timeseries',
            'post_ctg_flow',
            'static_buses',
            'static_generators',
            'static_lines',
            'static_loads',
            'static_transformers',
            'transformers_from_timeseries',
            'transformers_to_timeseries'
        ]

        # Dictionary to hold the final JSON structure
        combined_json = {}

        for csv in csv_files:
            path_url = os.path.join(self.path, f'{csv}.csv')
            csv_pd = pd.read_csv(path_url)
            csv_json = csv_pd.to_json(orient='records')

            # Add the CSV JSON to the combined JSON dictionary
            combined_json[csv] = json.loads(csv_json)

        # Convert the combined dictionary to a JSON string
        final_json = json.dumps(combined_json, indent=4)
        return final_json
    
    def get_default(self):
        csv_files = [
            'static_buses',
            'static_generators',
            'static_lines',
            'static_loads',
            'static_transformers',
            
        ]
        
        combined_json = {}

        for csv in csv_files:
            path_url = os.path.join(self.path, f'{csv}.csv')
            csv_pd = pd.read_csv(path_url)
            csv_json = csv_pd.to_json(orient='records')

            # Add the CSV JSON to the combined JSON dictionary
            combined_json[csv] = json.loads(csv_json)

        # Convert the combined dictionary to a JSON string
        final_json = json.dumps(combined_json, indent=4)
        return final_json

    def graph_data(self):
        csv_files = [
            'buses_injection_timeseries',
            'generation_production_timeseries',
            'lines_from_timeseries',
            'lines_to_timeseries',
            'loads_timeseries',
            'post_ctg_flow',
            'transformers_from_timeseries',
            'transformers_to_timeseries'
        ]
        
        combined_json = {}

        for csv in csv_files:
            path_url = os.path.join(self.path, f'{csv}.csv')
            csv_pd = pd.read_csv(path_url)
            csv_json = csv_pd.to_json(orient='records')

            # Add the CSV JSON to the combined JSON dictionary
            combined_json[csv] = json.loads(csv_json)

        # Convert the combined dictionary to a JSON string
        final_json = json.dumps(combined_json, indent=4)
        return final_json

        
@app.route('/')
def index():
    return {
        'id': '1',
        'content': 'test'
    }

@app.route('/data', methods=['POST', 'GET'])
def data():
    data = request.json
    optimization = data.get('optimization')
    
    if optimization == 'wo-security':
        staticdata = StaticData(wo_security_path)
    else:
        staticdata = StaticData(w_security_path)
    
    return jsonify(json.loads(staticdata.graph_data()))

if __name__ == '__main__':
    app.run(debug=True)