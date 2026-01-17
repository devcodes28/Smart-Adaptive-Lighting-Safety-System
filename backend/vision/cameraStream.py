import cv2
import time

URL = "http://172.28.250.155:8080"  # change IP

cap = cv2.VideoCapture(URL)

if not cap.isOpened():
    print("❌ Cannot open phone camera stream")
    exit()

print("✅ Phone camera connected")

while True:
    ret, frame = cap.read()

    if not ret:
        print("⚠️ Frame dropped, retrying...")
        time.sleep(0.1)
        continue

    cv2.imshow("Phone Camera Stream", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
