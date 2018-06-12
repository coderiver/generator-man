function is_touch_device() {
    return 'ontouchstart' in window       
        || navigator.maxTouchPoints;
  };