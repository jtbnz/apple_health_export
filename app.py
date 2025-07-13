from flask import Flask, render_template, jsonify
import xml.etree.ElementTree as ET
import os
from datetime import datetime
import pandas as pd

app = Flask(__name__)

class HealthDataParser:
    def __init__(self, data_path):
        self.data_path = data_path
        self.weight_data = []
        
    def load_data(self):
        try:
            xml_file = os.path.join(self.data_path, 'export.xml')
            if not os.path.exists(xml_file):
                print(f"Export file not found at {xml_file}")
                return False
                
            tree = ET.parse(xml_file)
            root = tree.getroot()
            
            # Find all body mass records
            for record in root.findall('.//Record[@type="HKQuantityTypeIdentifierBodyMass"]'):
                date_str = record.get('startDate')
                value = record.get('value')
                
                if date_str and value:
                    # Parse the date (format: 2023-01-15 08:30:00 -0800)
                    date = datetime.strptime(date_str[:19], '%Y-%m-%d %H:%M:%S')
                    self.weight_data.append({
                        'date': date.isoformat(),
                        'value': float(value)
                    })
            
            self.weight_data.sort(key=lambda x: x['date'])
            print(f"Loaded {len(self.weight_data)} weight records")
            return True
        except Exception as e:
            print(f"Error loading data: {e}")
            return False
    
    def get_weight_data(self):
        return self.weight_data

parser = HealthDataParser('data')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/weight-data')
def get_weight_data():
    if not parser.weight_data:
        parser.load_data()
    
    return jsonify({
        'success': True,
        'data': parser.weight_data
    })

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5001)