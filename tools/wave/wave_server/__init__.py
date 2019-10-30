import sys
from . import configuration_loader


class WaveServer:
    def initialize(self, configuration_file_path, application_directory_path=""):
        sys.stdout.write("Loading configuration ...")
        sys.stdout.flush()

        configuration = configuration_loader.load(configuration_file_path)

        print(" done.")
