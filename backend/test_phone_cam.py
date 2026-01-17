import cv2

cap = cv2.VideoCapture("http://172.28.250.155:8080")

while True:
    ret, frame = cap.read()
    if not ret:
        print(" Failed to read frame")
        break

    cv2.imshow("Phone Camera Test", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
