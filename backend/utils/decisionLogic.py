from gpio.alertControl import trigger_alert

CROWD_DANGER_LIMIT = 5

def evaluate_and_alert(people_count, accident_detected):
    if accident_detected:
        print("🚨 Accident detected → Triggering alert")
        trigger_alert()
    elif people_count > CROWD_DANGER_LIMIT:
        print("🚨 Crowd danger detected → Triggering alert")
        trigger_alert()
