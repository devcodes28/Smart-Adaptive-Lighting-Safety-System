from utils.decisionLogic import evaluate_and_alert

import cv2

SAFE_LIMIT = 2
WARNING_LIMIT = 5

hog = cv2.HOGDescriptor()
hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Camera not accessible")
    exit()

print("Crowd detection started. Press 'q' to quit.")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Resize (very important)
    frame = cv2.resize(frame, (640, 480))

    # Convert to grayscale (KEY FIX)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect people (TUNED PARAMETERS)
    boxes, weights = hog.detectMultiScale(
        gray,
        winStride=(4, 4),
        padding=(8, 8),
        scale=1.03
    )

    people_count = len(boxes)
    # Call decision logic (no accident here)
    evaluate_and_alert(people_count, accident_detected=False)


    # Decide status
    if people_count <= SAFE_LIMIT:
        status = "SAFE"
        color = (0, 255, 0)
    elif people_count <= WARNING_LIMIT:
        status = "WARNING"
        color = (0, 255, 255)
    else:
        status = "DANGER"
        color = (0, 0, 255)

    for (x, y, w, h) in boxes:
        cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)

    cv2.putText(frame, f"People: {people_count}", (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)

    cv2.putText(frame, f"Status: {status}", (10, 60),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)

    cv2.imshow("Crowd Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
