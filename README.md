# Apple Health Data Visualizer

A Python web application that visualizes data from Apple Health exports, starting with weight tracking. The app provides interactive charts with zoom and pan capabilities to explore patterns in your health data over days, weeks, months, and years.

## Features

- **Interactive Visualization**: Zoom and pan through your weight data
- **Time Range Selection**: View data by day, week, month, year, or all time
- **Privacy First**: Your health data stays local - the `.gitignore` ensures your private data never gets committed to Git
- **Responsive Design**: Works on desktop and mobile browsers

## Setup Instructions

### 1. Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### 2. Installation

Clone the repository:
```bash
git clone <your-repo-url>
cd apple_health_export
```

Install dependencies:
```bash
pip install -r requirements.txt
```

### 3. Export Your Apple Health Data

1. Open the Health app on your iPhone
2. Tap your profile picture in the top right
3. Scroll down and tap "Export All Health Data"
4. Choose to export and save the file
5. Extract the exported ZIP file
6. Copy the JSON export file to the `data/` directory in this project

### 4. Run the Application

Start the Flask server:
```bash
python app.py
```

Open your browser and navigate to:
```
http://localhost:5000
```

## Usage

- **Mouse Wheel**: Zoom in/out on the chart
- **Click and Drag**: Pan across the timeline
- **Time Range Buttons**: Quickly jump to view the last day, week, month, year, or all data
- **Reset Zoom**: Return to the default view

## Project Structure

```
apple_health_export/
├── app.py              # Flask application and data parser
├── requirements.txt    # Python dependencies
├── .gitignore         # Ensures data/ directory is not committed
├── data/              # Place your Apple Health export here (ignored by git)
├── templates/         # HTML templates
│   └── index.html
└── static/           # Static assets
    ├── js/
    │   └── app.js    # Chart visualization logic
    └── css/
        └── style.css  # Styling
```

## Privacy

Your health data is private. The `data/` directory is included in `.gitignore` to ensure your personal health information is never accidentally committed to version control.

## Future Enhancements

This app currently visualizes weight data, but can be extended to include:
- Heart rate data
- Activity and workout data
- Sleep analysis
- Blood pressure
- And more health metrics available in Apple Health exports

## Contributing

Feel free to fork this project and add support for additional health metrics!