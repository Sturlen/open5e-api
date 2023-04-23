"""Helper command to load all data sources."""

import subprocess
from os import listdir, path, getcwd
from pathlib import Path

from django.core.management import call_command
from django.core.management.base import BaseCommand

data_folder_path = "./data/"

SOURCES = listdir(data_folder_path)

# SOURCE_DIRS contains every data directory full of JSON to import.
SOURCE_DIRS = [ path.join(data_folder_path,data_dir)  for data_dir in SOURCES ]

class Command(BaseCommand):
    """Implementation for the `manage.py quickload` subcommand."""

    help = 'Load all data sources by running `populatedb` for each source dir.'

    def handle(self, *args, **options) -> None:
        """Main logic."""
        self.stdout.write('Loading data from all sources...')
        populate_db()
        self.stdout.write(self.style.SUCCESS('Data loading complete.'))


def populate_db() -> None:
    """Run `manage.py populatedb` for all data sources."""
    call_command('populatedb', '--flush', *SOURCE_DIRS)
