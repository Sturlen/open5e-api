import os
import requests
from inspect import FrameInfo
from typing import List, Optional

from approvaltests import verify_as_json, Options, StackFrameNamer, verify


APPROVAL_TEST_DIR = "api/tests/approval"


class CustomNamer(StackFrameNamer):
    """Decides output of recieved and approved test data"""

    def __init__(self, extension: Optional[str] = None) -> None:
        StackFrameNamer.__init__(self, extension)

    def set_for_stack(self, caller: List[FrameInfo]) -> None:
        super().set_for_stack(caller)
        self.directory = os.path.join(os.getcwd(), APPROVAL_TEST_DIR)
        self.class_name = "api"
        # https://docs.pytest.org/en/latest/example/simple.html#pytest-current-test-environment-variable
        current_test = os.environ.get("PYTEST_CURRENT_TEST").split(":")[-1].split(" ")[0]
        self.method_name = current_test


class TestAPIRoot:
    """Test cases for testing the / root of the API."""

    def _verify(self, endpoint: str):
        response = requests.get(endpoint).json()

        verify_as_json(response, options=Options().with_namer(CustomNamer(".json")))

    def test_headers(self):
        """Server response headers from the API root."""
        headers = requests.get(f"http://localhost:8000/?format=json").headers

        headers.pop("Date")
        headers.pop("Content-Length")
        verify_as_json(
            headers, options=Options().with_namer(CustomNamer(".json"))
        )

    def test_root(self):
        self._verify(f"http://localhost:8000/?format=json")
    


