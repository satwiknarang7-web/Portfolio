import time
from collections import defaultdict, deque
from threading import Lock


class SlidingWindowRateLimiter:
    """In-memory sliding-window limiter keyed by client identifier.

    Fine for a single-process portfolio API; swap for Redis if you run several workers.
    """

    def __init__(self, max_requests: int, window_seconds: int) -> None:
        self._max_requests = max_requests
        self._window = window_seconds
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._lock = Lock()

    def allow(self, key: str) -> bool:
        now = time.monotonic()
        with self._lock:
            hits = self._hits[key]
            while hits and now - hits[0] > self._window:
                hits.popleft()
            if len(hits) >= self._max_requests:
                return False
            hits.append(now)
            return True
