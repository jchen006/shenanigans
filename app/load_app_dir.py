import inspect
import os

def add_app_dir():
    currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
    app_dir = os.path.dirname(currentdir)
    os.sys.path.insert(0, app_dir)

    print "CALLED INSERT APP FROM", currentdir, "ADDING APP DIR:", app_dir
