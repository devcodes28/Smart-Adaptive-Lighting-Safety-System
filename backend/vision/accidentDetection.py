from utils.decisionLogic import evaluate_and_alert

import cv2
import time

# ----------------------------
# Tuned parameters (IMPORTANT)
# ----------------------------
BIG_MOTION_THRESHOLD = 120000   # Only large motion (fall/crash)
SMALL_MOTION_IGNORE = 30000     # Ignore head/hand movement
INACTIVITY_TIME = 4             # Seconds of no motion after big motion

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Camera not accessible")
    exit()

ret, prev_frame = cap.read()
prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)
prev_gray = cv2.GaussianBlur(prev_gray, (21, 21), 0)

last_big_motion_time = None
accident_detected = False

print("Accident detection running. Press 'q' to quit.")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.resize(frame, (640, 480))
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (21, 21), 0)

    diff = cv2.absdiff(prev_gray, gray)
    thresh = cv2.threshold(diff, 25, 255, cv2.THRESH_BINARY)[1]
    motion_pixels = cv2.countNonZero(thresh)

    current_time = time.time()

    # ----------------------------
    # IGNORE small motion
    # ----------------------------
    if motion_pixels < SMALL_MOTION_IGNORE:
        pass  # ignore head/hand movement

    # ----------------------------
    # Detect BIG motion only
    # ----------------------------
    elif motion_pixels > BIG_MOTION_THRESHOLD:
        last_big_motion_time = current_time
        accident_detected = False

    # ----------------------------
    # Inactivity check AFTER big motion
    # ----------------------------
    if last_big_motion_time:
        if current_time - last_big_motion_time > INACTIVITY_TIME:
            accident_detected = True

    # ----------------------------
    # Display
    # ----------------------------
    if accident_detected:
        status = "ACCIDENT DETECTED!"
        color = (0, 0, 255)
        evaluate_and_alert(people_count=0, accident_detected=True)
    else:
        status = "Normal Activity"
        color = (0, 255, 0)

    cv2.putText(frame, status, (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)

    cv2.putText(frame, f"Motion Level: {motion_pixels}", (10, 60),
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

    cv2.imshow("Accident Detection", frame)

    prev_gray = gray

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
