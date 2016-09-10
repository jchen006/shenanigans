import os
from app import shenanigans
shenanigans.secret_key = "yoloswag420blazeit"
port = int(os.environ.get('PORT', 5000))
shenanigans.run(host='0.0.0.0', port=port, debug=True)
